# How to deploy
1. Create the various `.env` files (use `.env.example` as guides)
2. Create a `nginx.conf` file with the following content:

```
server {
    listen 80 default_server;

    server_name _;

    location / {
        proxy_pass http://helloworld:3000/;
    }

    location ~ /.well-known/acme-challenge/ {
        root /var/www/certbot;
    }
}

```

3. `docker compose up -d --build`
3. Replace the file `nginx.conf` by using `nginx.conf.template` as guide
4. `docker compose down && docker compose up -d --build`