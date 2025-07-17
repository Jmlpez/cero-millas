FROM node:20 as build

WORKDIR /app

RUN git config --global url."https://github.com/".insteadOf git@github.com:

# Copy pnpm files
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm install -g pnpm

# Install dependencies with pnpm
RUN pnpm install --frozen-lockfile

# Copy source code
COPY . .

# Accept build arguments for Vite environment variables
ARG VITE_BACKEND_API_URL
ARG VITE_IMAGES_BASE_URL
ARG VITE_REACT_APP_ENV=production

# Set environment variables for the build process
ENV VITE_BACKEND_API_URL=$VITE_BACKEND_API_URL
ENV VITE_IMAGES_BASE_URL=$VITE_IMAGES_BASE_URL
ENV VITE_REACT_APP_ENV=$VITE_REACT_APP_ENV

# Build the app
RUN pnpm run build

# Production stage
FROM nginx:alpine

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

# Copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]