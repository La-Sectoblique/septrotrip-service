# build stage
FROM node:16-alpine AS builder

WORKDIR /opt/package

COPY package.json yarn.lock ./

COPY . ./

RUN yarn install

RUN yarn doc

# execute stage
FROM nginx:1.21.5-alpine

COPY --from=builder /opt/package/docs /usr/share/nginx/html

EXPOSE 80
EXPOSE 443

CMD ["nginx", "-g", "daemon off;"]