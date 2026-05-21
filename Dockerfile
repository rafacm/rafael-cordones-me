# ---- build stage ----------------------------------------------------------
# Node is only needed to produce the static site; it never ships in the
# runtime image.
FROM node:22-alpine AS build

WORKDIR /app

# Install dependencies first so this layer is cached unless the lockfile
# changes.
COPY package.json package-lock.json ./
RUN npm ci

# Build: `npm run build:container` runs `astro build` and then the
# Pagefind search index over dist/. Type checking (`astro check`) is NOT
# in the container critical path — it runs as a parallel `typecheck` job
# in the GitHub workflow, so type errors still gate the PR but don't
# block the image build.
COPY . .
RUN npm run build:container

# ---- runtime stage --------------------------------------------------------
# nginx-unprivileged runs as a non-root user (uid 101) and listens on :8080,
# which is what the Kubernetes manifests should target.
#
# Base image notes:
# - The `-slim` variant drops optional modules (image_filter, xslt, etc.)
#   we don't need for static serving, removing ~60 CVEs' worth of packages
#   (libcurl, libpng, libavif, libtiff, libxml2, libexpat, fontconfig, ...).
# - `apk -U upgrade` pulls the latest patched versions of the packages
#   Alpine still ships, catching CVE fixes that landed after the base was
#   last rebuilt. Done as root, then we drop back to the unprivileged uid.
FROM nginxinc/nginx-unprivileged:1.30-alpine-slim AS runtime

USER root
RUN apk -U upgrade --no-cache
USER 101

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080
