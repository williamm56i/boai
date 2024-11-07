FROM node:18 as build-stage
WORKDIR /app
COPY package.json ./
RUN npm install
COPY . .
RUN npm run build
FROM nginx
COPY --from=build-stage /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./cert/full_chain.crt /etc/nginx/certs/full_chain.crt
COPY ./cert/private.key /etc/nginx/certs/private.key
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]