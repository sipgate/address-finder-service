import axios from "axios";
import qs = require("querystring");

import Address from "../address.model";
import { GoogleLocation } from "./google-location.model";

const API_URL: string = "https://maps.googleapis.com/maps/api/geocode/json";
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
  return axios(`${API_URL}?${query}`).then(({ data }) => data.results[0]);
}

export default async function findAddress(query: string): Promise<Address> {
  try {
    const location: GoogleLocation = await getLocationByAddressSearch(query);
    if (location) {
      const response: Address = {};
      location.address_components.forEach(component => {
        const [type] = component.types.filter(entry => addressTypeToProp.get(entry));
        if (type) {
          const prop: string = addressTypeToProp.get(type);
          response[prop] = component.long_name;
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
