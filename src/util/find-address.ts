import axios from "axios";
import qs = require("querystring");

import Address from "../address.model";
import GeolocationPosition from "../geolocation.model";
import { buildBounds } from "./geolocation";
import {
  GoogleLocation,
  GooglePlaceDetail,
  GoogleLocationResponse,
  GooglePlaceDetailResponse
} from "./google-location.model";
import { ParsedUrlQueryInput } from "querystring";

const API_URL_GEOCODE: string = "https://maps.googleapis.com/maps/api/geocode/json";
const API_URL_PLACE_DETAIL: string = "https://maps.googleapis.com/maps/api/place/details/json";
const SEARCH_REGION: string = "de";
const SEARCH_LANGUAGE: string = "de";

const { API_KEY } = process.env;

interface GeocodeRequestQuery {
  address: string;
  key: string;
  language: string;
  region: string;
  bounds?: string;
}

const addressTypeToProp: Map<string, string> = new Map([
  ["route", "street"],
  ["street_number", "streetNumber"],
  ["postal_code", "zip"],
  ["locality", "city"],
  ["country", "country"]
]);

async function getLocationByAddressSearch(
  address: string,
  position?: GeolocationPosition
): Promise<GoogleLocation> {

  const query: ParsedUrlQueryInput = {
    address,
    key: API_KEY || "",
    language: SEARCH_LANGUAGE,
    region: SEARCH_REGION
  };

  if (position) {
    query.bounds = buildBounds(position);
  }

  const url = `${API_URL_GEOCODE}?${qs.stringify(query)}`;

  const { data } = await axios.get<GoogleLocationResponse>(url);
  return data.results[0];
}

async function getPlaceDetailsByPlaceId(placeId: string): Promise<GooglePlaceDetail> {
  const query = qs.stringify({
    key: API_KEY,
    language: SEARCH_LANGUAGE,
    placeid: placeId,
    region: SEARCH_REGION
  });
  const { data } = await axios.get<GooglePlaceDetailResponse>(`${API_URL_PLACE_DETAIL}?${query}`);
  return data.result;
}

export default async function findAddress(
  query: string,
  position?: GeolocationPosition
): Promise<Address | null> {
  try {
    const location = await getLocationByAddressSearch(query, position);
    if (location) {
      const details = await getPlaceDetailsByPlaceId(location.place_id);
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
