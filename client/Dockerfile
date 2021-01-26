# build stage
FROM node as build

WORKDIR /app

# Copy the package.json and the package-lock.json install the dependencies.
COPY package.json package-lock.json ./
RUN npm install

# Copy the main app
COPY . ./
RUN npm run build

FROM nginx

RUN rm -rf /usr/share/nginx/html/*
# RUN --from=build mv /app/build .
COPY --from=build /app/build /usr/share/nginx/html

# change all http://localhost:8080 to /
RUN grep -rl localhost /usr/share/nginx/html | xargs sed -i 's/http:\/\/localhost:8080//g'

COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

ENTRYPOINT ["nginx","-g","daemon off;"]