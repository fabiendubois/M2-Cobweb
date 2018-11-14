# Cobweb
## Description du projet :
Master 2 Informatique Ingénierie Innovation 2018 - 2019.  
Projet de web avancé.  
Application de gestion de flux entre applications.  

## Lancement de l'application (version local)
Docker et Docker Compose sont requis (https://www.docker.com). 

### Base de données PostgreSQL
- Se placer dans le dossier Cobweb/bdd/ : `cd Cobweb/bdd/`
- Exécuter la commande : `docker-compose up -d`
- Vérifier le bon lancement du docker avec docker ps, vérifier le statut 'up' du docker.

### API NodeJS
- Se placer dans le dossier Cobweb/back/ : `cd Cobweb/back/`
- Exécuter la commande : `docker build .`
- Exéctuer ensuite la commande suivante : `docker run --name cobweb-api -d -e VIRTUAL_HOST=api.cobweb.fdu.ovh,www.api.cobweb.fdu.ovh [NUMERO DU DOCKER]` l'option -e n'est pas obligatoire pour un lancement en local.

## Génération de la documentation de l'API  (Utilisation d'apidoc : http://apidocjs.com):
- Installer apidoc : `npm install -g apidoc`
- Se placer dans le dossier Cobweb/back/ : `cd Cobweb/back/`
- Exécuter la commande : `apidoc -i src/paths -o doc`
- La documentation est un site web static. Ouvrir le fichier /doc/index.html afin d'ouvrir la documentation.
- Exposer la documentation avec un serveur Nginx : `docker run --name cobweb-doc -e VIRTUAL_HOST=www.doc.api.cobweb.fdu.ovh,doc.api.cobweb.fdu.ovh -v /root/Cobweb/back/doc/:/usr/share/nginx/html:ro -d nginx`
