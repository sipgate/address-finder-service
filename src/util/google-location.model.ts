export interface AddressComponent {
  short_name: string;
  long_name: string;
  types: string[];
}

export interface GoogleLocationResponse {
  results: GoogleLocation[];
}

export interface GoogleLocation {
  place_id: string;
  formatted_address: string;
  address_components: AddressComponent[];
}

export interface GooglePlaceDetailResponse {
  result: GooglePlaceDetail;
}

export interface GooglePlaceDetail {
  name: string;
  international_phone_number: string;
}
