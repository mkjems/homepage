# Deployment

The homepage is a static site served by Nginx in a Docker container on the
Hetzner VPS, at `https://mkjems.dk`.

The VPS itself, Caddy, and the general recipe for deploying an app there are
documented in the infrastructure repository:
[deploy-new-app.md](https://github.com/mkjems/infrastructure/blob/main/docs/deploy-new-app.md).
This page only covers what is specific to the homepage.

## Values

| Value         | Homepage                     |
| ------------- | ---------------------------- |
| Domain        | `mkjems.dk`                  |
| GHCR image    | `ghcr.io/mkjems/homepage`    |
| VPS directory | `/opt/homepage`              |
| Host port     | `127.0.0.1:8082`             |
| Branch        | `main`                       |

## Docker Image

`npm run build` copies `src/` to `dist/`. The [Dockerfile](../Dockerfile)
copies `dist/` into `nginxinc/nginx-unprivileged:stable-alpine`, which serves
it as an unprivileged user on port `8080`.

To try the image locally on `http://localhost:18080`:

```sh
npm run docker:run
```

## VPS Compose

`/opt/homepage/compose.yaml` on the VPS:

```yaml
services:
  homepage:
    image: ghcr.io/mkjems/homepage:latest
    ports:
      - "127.0.0.1:8082:8080"
    restart: unless-stopped
```

## GitHub Actions

[.github/workflows/deploy.yml](../.github/workflows/deploy.yml) runs on pushes
to `main` and can be started by hand:

1. Builds the site and checks that `dist/index.html` exists.
2. Builds the image and pushes it to GHCR as `:latest` and `:<commit sha>`.
3. SSHes into the VPS, runs `docker compose pull` and `docker compose up -d` in
   `/opt/homepage`, then checks `http://127.0.0.1:8082/` and
   `https://mkjems.dk/`.

It needs the repository secrets `VPS_HOST`, `VPS_USER` and `VPS_SSH_KEY`.
