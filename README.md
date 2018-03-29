# address-finder-service

Service for finding the most likely german address for a search query.

Requires the `API_KEY` environment variable with a Google Maps Geocoding API key.

### Example

GET http://localhost:8080/address?search=sipgate%20gmbh

Response:

```json
{
  "streetNumber": "74",
  "street": "Gladbacher Straße",
  "city": "Düsseldorf",
  "country": "Germany",
  "zip": "40219"
}
```

## License

[MIT](LICENSE)
