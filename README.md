# Cobweb
Master 2 Informatique Ingénierie Innovation 2018 - 2019.  
Projet de web avancé.  
Application de gestion de flux entre applications.  

## Fonctionnel :
2 modes d'utilisation possible (choix possible au lancement de l'application coté serveur) :
- [x] Mode avec authentification. Compte administrateur (lecture & écriture) et compte en mode lecture.
- [ ] Mode sans authentification

- **Utilisateur**
    - S'inscrire, en administrateur ou non.
    - Se connecter.

- **Applications**
    - Ajouter une application (admin).
    - Supprimer une application (admin), impossible de supprimer une application liée à une autre ressource.
    - Modifier une application (admin).

- **Technologies**
    - Lister les technologies
    - Ajouter une technologie (admin).
    - Supprimer une technologie (admin), impossible de supprimer une technologie liée à une autre ressource.
    - Modifier une technologie (admin).

- **Flux**
    - Ajouter un flux reliant deux applications (admin).
    - Un flux est composé d'au moins un flux-technologie. Il peut y avoir plusieurs flux-technologies reliant deux applications.
    - Ajouter un flux-technologie au flux(admin). Exemple de flux-technologies entre deux applications A et B : [A] -> PHP -> JAVA -> [B] 
    - Supprimer un flux-technologie au flux (admin).
    - Modifier un flux-technologie au flux (admin).
    - Supprimer un flux (admin) n'entraine pas la suppression des applications. Pas de suppression en cascade.
    - Modifier un flux (admin).

## Objectifs techniques du projet : 
- [x] Créer une API
- [x] Documenter l'API
- [x] Documenter le code de l'API
- [ ] Tester le code de l'API
- [ ] Tester l'API


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