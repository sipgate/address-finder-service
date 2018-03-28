import axios from "axios";
import qs = require("querystring");

import Address from "../address.model";

const API_URL: string = "https://maps.googleapis.com/maps/api/geocode/json";

interface AddressComponent {
  short_name: string;
  long_name: string;
  types: string[];
}

interface Location {
  address_components: AddressComponent[];
}

const apiKey: string = process.env.API_KEY;

const addressTypeToProp: Map<string, string> = new Map([
  ["route", "street"],
  ["street_number", "streetNumber"],
  ["postal_code", "zip"],
  ["locality", "city"],
  ["country", "country"]
]);

function getLocationByAddressSearch(address: string): Promise<any> {
  const query: string = qs.stringify({
    address,
    key: apiKey
  });
  return axios(`${API_URL}?${query}`).then(({ data }) => data.results[0]);
}

export default async function findAddress(query: string): Promise<Address> {
  try {
    const location: Location = await getLocationByAddressSearch(query);
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
