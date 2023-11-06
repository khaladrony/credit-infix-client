FROM node:16.20.2 as build

WORKDIR /usr/local/app

COPY . /usr/local/app/

RUN npm install --force

RUN npm run build




FROM nginx:latest
COPY --from=build /usr/local/app/dist/credit-infix /usr/share/nginx/html
EXPOSE 9090