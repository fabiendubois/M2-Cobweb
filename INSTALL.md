## Installation
Technologies requises :
- Docker version 18.09.0
- docker-compose version 1.23.2
- npm 6.4.1
- node v10.13.0
- angular 7

### Base de données PostgreSQL
**/!\ Avec la configuration actuelle, les données ne sont pas sauvegardées à l'extinction du conteneur.**

- Se placer dans le dossier Cobweb/bdd/ : `cd Cobweb/bdd/`
- Exécuter la commande : `docker-compose up -d`
- Vérifier le bon lancement du docker avec `docker ps`, vérifier le statut 'up' du docker.

**Les informations par défaut de connexion à la base de données :** 
- host: 127.0.0.1,
- user: cobweb,
- database: cobweb,
- password: password,
- port: 5432

### Serveur Node.JS (back)
- Se placer dans le dossier Cobweb/back/ : `cd Cobweb/back/`
- Exécuter la commande : `docker build .`
- Exéctuer ensuite la commande suivante : `docker run --name cobweb-api -d [NUMERO IMAGE]` l'option -e n'est pas obligatoire pour un lancement en local.


### Application Angular (front)
- Se placer dans le dossier Cobweb/front/ : `cd Cobweb/front/`
- Exécuter la commande : `npm install`
- Exéctuer ensuite la commande suivante : `ng serve`
- L'interface Web est accessible sur le port 4200


### Génération de la documentation de l'API  (Utilisation d'apidoc : http://apidocjs.com):
- Installer apidoc : `npm install -g apidoc`
- Se placer dans le dossier Cobweb/back/ : `cd Cobweb/back/`
- Exécuter la commande : `apidoc -i src/paths -o doc`
- La documentation est un site web static. Ouvrir le fichier /doc/index.html afin d'ouvrir la documentation.
- Exposer la documentation avec un serveur Nginx : `docker run --name cobweb-doc -e VIRTUAL_HOST=www.doc.api.cobweb.fdu.ovh,doc.api.cobweb.fdu.ovh -v /root/Cobweb/back/doc/:/usr/share/nginx/html:ro -d nginx`
