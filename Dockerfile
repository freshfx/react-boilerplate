FROM nginx:alpine

COPY build /usr/share/nginx/html
COPY server/vhost.d/nginx /etc/nginx/conf.d/default.conf
