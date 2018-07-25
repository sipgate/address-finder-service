import axios from "axios";
import qs = require("querystring");

import Address from "../address.model";
import { GoogleLocation, GooglePlaceDetail } from "./google-location.model";

const API_URL_GEOCODE: string = "https://maps.googleapis.com/maps/api/geocode/json";
const API_URL_PLACE_DETAIL: string = "https://maps.googleapis.com/maps/api/place/details/json";
const SEARCH_REGION: string = "de";
const SEARCH_LANGUAGE: string = "de";

const { API_KEY } = process.env;

const addressTypeToProp: Map<string, string> = new Map([
  ["route", "street"],
  ["street_number", "streetNumber"],
  ["postal_code", "zip"],
  ["locality", "city"],
  ["country", "country"]
]);

function getLocationByAddressSearch(address: string): Promise<GoogleLocation> {
  const query: string = qs.stringify({
    address,
    key: API_KEY,
    language: SEARCH_LANGUAGE,
    region: SEARCH_REGION
  });
  return axios(`${API_URL_GEOCODE}?${query}`).then(({ data }) => data.results[0]);
}

function getPlaceDetailsByPlaceId(placeId: string): Promise<GooglePlaceDetail> {
  const query: string = qs.stringify({
    key: API_KEY,
    language: SEARCH_LANGUAGE,
    placeid: placeId,
    region: SEARCH_REGION
  });
  return axios(`${API_URL_PLACE_DETAIL}?${query}`).then(({ data }) => data.result);
}

export default async function findAddress(query: string): Promise<Address | null> {
  try {
    const location: GoogleLocation = await getLocationByAddressSearch(query);
    if (location) {
      const details: GooglePlaceDetail = await getPlaceDetailsByPlaceId(location.place_id);
      const response: Address = {
        formatted: location.formatted_address,
        name: details.name,
        phoneNumber: details.international_phone_number
      };
      location.address_components.forEach(component => {
        const [type] = component.types.filter(entry => addressTypeToProp.get(entry));
        if (type) {
          const prop: string | null = addressTypeToProp.get(type) || null;
          switch (prop) {
            case "street":
              response.street = component.long_name;
              break;
            case "streetNumber":
              response.streetNumber = component.long_name;
              break;
            case "zip":
              response.zip = component.long_name;
              break;
            case "city":
              response.city = component.long_name;
              break;
            case "country":
              response.country = component.long_name;
              break;
            default:
              break;
          }
        }
      });
      return response;
    }
    return null;
  } catch (error) {
    console.log(error.message);
    return null;
  }
}
