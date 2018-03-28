export interface AddressComponent {
  short_name: string;
  long_name: string;
  types: string[];
}

export interface GoogleLocation {
  address_components: AddressComponent[];
}
