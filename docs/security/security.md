# Security & Privacy

## Authentication

- Hash passwords using a modern password hashing function.
- Never store plaintext passwords.
- Use short-lived access tokens where practical.
- Consider refresh-token rotation for production.

## API

- HTTPS only in production.
- DTO validation on every external request.
- Rate limit authentication and image-analysis endpoints.
- Restrict upload MIME types and size.
- Generate server-side object keys; never trust client filenames.
- Scan uploaded files when appropriate.
- Keep provider credentials server-side.

## Image privacy

- Private object storage by default.
- Use signed URLs with short expiration when images must be displayed.
- Define retention/deletion policy before launch.
- Strip EXIF metadata if location data is not required.

## Data minimization

Collect only account and operational data required by the product. Avoid logging raw images, passwords, authorization headers, or unnecessary personal data.

## AI security

Treat model output as untrusted input. Validate against schemas and sanitize before persistence/rendering.

## Scientific safety

Identification is not a substitute for professional medical advice. Toxicity claims require trusted sources and careful wording.
