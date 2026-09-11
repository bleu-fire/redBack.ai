# Network Requests (Axios vs Fetch)

## Overview
In the redBack.ai mobile application, we need to communicate with our Express.js backend API. While React Native includes the native `fetch()` API by default, we prefer using **Axios** for handling HTTP requests.

## Why Axios?

### 1. Interceptors (Crucial for JWT Authentication)
Since our backend secures routes using JSON Web Tokens (JWT), the mobile app must attach this token to the `Authorization` header of authenticated requests.
- **With `fetch()`:** You must manually attach the header to every single request across the app.
- **With Axios:** We can configure an **Interceptor** once. The interceptor will automatically intercept every outgoing request, retrieve the JWT token (e.g., from our Zustand store), and attach it seamlessly.

### 2. Automatic JSON Parsing
- **`fetch()`:** Requires a two-step process where you must call `response.json()` to parse the incoming data.
- **Axios:** Automatically transforms JSON data, allowing you to access the payload immediately via `response.data`.

### 3. Superior Error Handling
- **`fetch()`:** Only rejects a promise if there is a complete network failure. If the backend returns an error status (like `401 Unauthorized` or `404 Not Found`), `fetch()` still considers the request successful, requiring manual `response.ok` checks.
- **Axios:** Automatically rejects the promise for any HTTP error status codes (status outside the 2xx range), allowing your `try/catch` blocks to cleanly catch API errors.

## Next Steps for Implementation
1. Install the package in the mobile directory: `npm install axios`
2. Create an `api.ts` or `axiosInstance.ts` configuration file.
3. Configure the base URL (pointing to the Express backend).
4. Set up the request interceptor to automatically inject the JWT token from the Zustand store.
