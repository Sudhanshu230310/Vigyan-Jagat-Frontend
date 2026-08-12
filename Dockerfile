# --- Frontend: React + Vite (B2B_Frontend) ---
# Copy this file (and nginx.conf) into the "B2B_Frontend" project folder before building.
# Vite bakes VITE_* env vars in at BUILD time, so they're passed as --build-arg,
# not as Cloud Run runtime env vars.

FROM node:20-slim AS build
WORKDIR /app

ARG VITE_BACKEND_URL
ARG VITE_ADMIN_EMAIL
ARG VITE_ADMIN_PASSWORD
ARG VITE_IMAGE_BASE_URL
ENV VITE_BACKEND_URL=$VITE_BACKEND_URL
ENV VITE_ADMIN_EMAIL=$VITE_ADMIN_EMAIL
ENV VITE_ADMIN_PASSWORD=$VITE_ADMIN_PASSWORD
ENV VITE_IMAGE_BASE_URL=$VITE_IMAGE_BASE_URL

COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf.template

# Cloud Run injects $PORT — nginx needs it substituted at container start
ENV PORT=8080
EXPOSE 8080

CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/conf.d/default.conf.template > /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'"]
