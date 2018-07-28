# address-finder-service

Service for finding the most likely german address for a search query.

Requires the `API_KEY` environment variable with a Google API key. Geocoding & Places API need to be unlocked in the Google API Console.

### Example

GET http://localhost:8080/address?search=sipgate

Response:

```json
{
  "formatted": "Gladbacher Str. 74, 40219 Düsseldorf, Deutschland",
  "name": "sipgate GmbH",
  "phoneNumber": "+49 211 63553355",
  "streetNumber": "74",
  "street": "Gladbacher Straße",
  "city": "Düsseldorf",
  "country": "Deutschland",
  "zip": "40219"
}
```

## License

[MIT](LICENSE)
