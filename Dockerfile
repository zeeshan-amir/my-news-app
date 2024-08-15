# Build stage
FROM node:18 as build-stage
WORKDIR /app
COPY package*.json ./
COPY .env /app/
RUN npm install
COPY . .
RUN npm run build
# Check build output (temporary step for debugging)
RUN ls -l /app/dist
# Production stage
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]