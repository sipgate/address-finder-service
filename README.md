# address-finder-service

Service for finding the most likely address for a search query.

Requires the `API_KEY` environment variable with a Google Maps Geocoding API key.

### Example

GET http://localhost:8080/?search=sipgate%20gmbh

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
