FROM ubuntu:latest as app-build-dep

RUN apt-get update && \
	apt-get upgrade -y && \
	apt-get dist-upgrade -y && \
	apt-get install -y build-essential curl git && \
	apt-get autoremove -y

RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - && \
	apt-get install -y nginx nodejs

COPY . /opt/app

WORKDIR /opt/app

RUN npm install && npm run build


FROM nginx

COPY --from=app-build-dep /opt/app/build /usr/share/nginx/html
COPY nginx.default.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
