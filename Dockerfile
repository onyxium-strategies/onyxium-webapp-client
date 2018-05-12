FROM ubuntu:latest

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
RUN mv -f ./build/* /var/www/html

ADD nginx.default.conf /etc/nginx/sites-available/default
EXPOSE 80
CMD nginx -g "daemon off;"
