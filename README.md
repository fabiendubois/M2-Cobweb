# Cobweb
Master 2 Informatique Ingénierie Innovation 2018 - 2019.  
Projet de web avancé.  
Application de gestion de flux entre applications.  

## Back
 **Repository**
 Un fichier par table, permet l'accès en base, description des requêtes, pas de code métier.

 **Service**
 Un fichier par table, permet de controller les données.


## Technologies
**Node Js**
**Npm**
**ApidocJs**
**Docker**
**Docker Compose**
**Git**
**PostgreSQL**


Doc : 
 docker run --name cobweb-doc -e VIRTUAL_HOST=www.doc.api.cobweb.fdu.ovh,doc.api.cobweb.fdu.ovh -v /root/Cobweb/back/doc/:/usr/share/nginx/html:ro -d nginx