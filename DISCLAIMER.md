# Disclaimer

The frontend interacts with payment gateways (Midtrans).
- **Security Check**: Do not expose sensitive API keys in the client-side code. Only `VITE_API_BASE_URL` generally needs to be exposed.
- **Data**: Inputs are validated, but the backend is the final source of truth.
