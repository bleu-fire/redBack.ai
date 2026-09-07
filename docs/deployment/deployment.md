# Deployment

## Environments

- Development
- Staging
- Production

## Production components

- Mobile application distributed through the appropriate app stores.
- Express.js API behind HTTPS/reverse proxy/load balancer.
- Managed MongoDB (e.g. MongoDB Atlas) or hardened MongoDB replica set.
- Private object storage.
- Optional Redis/BullMQ for asynchronous identification jobs.

## CI/CD

Pipeline stages:

1. Install dependencies.
2. Lint.
3. Type-check.
4. Unit tests.
5. Integration tests.
6. Build API (`npm run build`).
7. Build mobile app.
8. Database index/seed validation.
9. Deploy staging.
10. Smoke tests.
11. Production approval/deploy.

## Secrets

Store secrets in the deployment platform's secret manager. Rotate AI keys, JWT secrets, and storage credentials periodically.

## Observability

Monitor:
- API availability.
- p95/p99 latency.
- AI provider failures.
- Identification completion rate.
- Database health & connection pool.
- Storage failures.
- Crash-free mobile sessions.

## Backups

Enable automated MongoDB snapshots/backups and periodically test restoration.
