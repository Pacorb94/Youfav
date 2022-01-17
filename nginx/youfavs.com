server {
        listen 80;	      
	    root /var/www/Youfavs;
        server_name localhost:8081;
        #La ruta inicial cargará index.html 
	    location / {
            try_files $uri $uri/ /index.html;
        }
        error_log /var/log/nginx/angular_error.log;
        access_log /var/log/nginx/angular_access.log;
}