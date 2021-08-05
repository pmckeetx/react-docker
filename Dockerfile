FROM node:14.17.4-buster as base

WORKDIR /code

COPY package.json package.json
COPY package-lock.json package-lock.json

RUN npm install

COPY . .

#
# BUILD
#
FROM base as build

RUN npm run build

#
# DEV
#
FROM base as dev

CMD [ "npm", "run", "start" ]

#
# NGINX Web Server
#
FROM nginx:1.12-alpine as prod

COPY --from=build /code/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]