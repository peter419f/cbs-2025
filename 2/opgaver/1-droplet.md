# Droplet på DigitalOcean

En Droplet er en virtuel maskine.

# Node.js

Installere Node.js version 22 på Linux distribution Ubuntu version 20.04. Se link til dokumentationen for at installere andre udgaver af Node.js på Linux.

```
sudo apt-get install -y curl
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
```

[Link til dokumentation](https://nodesource.com/products/distributions)

# PM2

PM2 (står for proces manager) holder vores applikation kørende 24/7.

[Link til PM2](https://pm2.keymetrics.io/)

```
sudo npm install pm2@latest -g

pm2 start app.js

pm2 startup systemd

sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u root --hp /home/root

pm2 save

sudo systemctl start pm2-root

systemctl status pm2-root
```

[Link til dokumentation](https://pm2.keymetrics.io/docs/usage/quick-start/)

PM2 kommandoer:

``` 
pm2 list

pm2 start node_file.js

pm2 stop app_name_or_id

pm2 restart app_name_or_id

pm2 delete app_name_or_id

pm2 info app_name

pm2 save
```

[Link til dokumentation](https://pm2.keymetrics.io/docs/usage/process-management/)

# Nginx

Nginx (udtales ENGINE-X) er en open-source webserver med en reverse proxy og load balancer.

```
sudo apt update

sudo apt install nginx

sudo nginx -v

systemctl status nginx
```

NGINX kommandoer:

```
sudo ufw app list

sudo ufw allow 'Nginx HTTP'

sudo ufw allow ssh

sudo ufw enable

sudo ufw status
```

Kommandoen nano åbner en teksteditor i Linux som gør det muligt at konfigurere vores endpoint for / til at pege på localhost:3000 og /vejr til at pege på localhost:4000.

```
sudo nano /etc/nginx/sites-available/default
```

Inde i teksteditoren skal vi tilføje følgende under server.

```
server { 
... 
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
... 
}
```

Tilføj en server lokation mere for vores Vejr app fra sidste uge. Bemærk location er /vejr og porten er 4000.

```
server { 
... 
    location /vejr {
        proxy_pass http://localhost:4000/;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection upgrade;
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
... 
}
```

[Link til dokumentation](https://nginx.org/en/docs/beginners_guide.html)

Gem ændringerne i konfigurationen med CTRL+X og Y for Yes og Enter. Derefter genstart NGINX på den virtuelle maskine. Vi checker derefter om syntaksen er korrekt og genstarter webserveren.

```
sudo nginx -t

sudo systemctl restart nginx
```

Kommandoer for at styre NGINX:

```
sudo systemctl start nginx

sudo systemctl stop nginx

sudo systemctl restart nginx

sudo systemctl reload nginx

sudo systemctl disable nginx

sudo systemctl enable nginx
````

# Linux

Når vi åbner vores virtuelle maskine skal vi interagere gennem Linux kommandoer:

ls – liste filer og mapper

cd – skifte mappe

pwd – vis nuværende filsti

mkdir – lav en ny mappe

rm – slette fil eller mappe

touch – opret en ny fil 

cat – vis indholdet af en fil

history – vis seneste kommandoer

[Link til Linux kommandoer](https://www.geeksforgeeks.org/linux-unix/linux-commands-cheat-sheet/)

# Fuld Nginx konfiguration

Kan tilgås på Droplet via:

```
sudo nano /etc/nginx/sites-available/default
```

Lav ændringer og tryk CTRL+X og Y for Yes og tryk ENTER for at gemme.

```
server {
	listen 80 default_server;
	listen [::]:80 default_server;

	root /var/www/html;

	index index.html index.htm index.nginx-debian.html;

	server_name _;

	location / {
		proxy_pass http://localhost:3000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection upgrade;
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}

	location /vejr {	
		proxy_pass http://localhost:4000;
		proxy_http_version 1.1;
		proxy_set_header Upgrade $http_upgrade;
		proxy_set_header Connection upgrade;
		proxy_set_header Host $host;
		proxy_cache_bypass $http_upgrade;
	}
}
```