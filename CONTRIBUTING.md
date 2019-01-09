### Base de données

1/ Les modifications du fichier init.sql doivent être reportées sur le fichier diagram_bdd_drawio.xml (ouvrir avec Draw.io). Ensuite, exporter le fichier xml en pdf dans le fichier diagram_bdd_pdf.pdf

2/ Pour ajouter une table dans le fichier init.sql
- Le nom de la table est au format snake_case, au pluriel et en anglais.
- Les mots-clés SQL sont au format UPPERCASE : NOT NULL, STRING, SERIAL, CREATE TABLE, PRIMARY KEY ...
- Les noms des colonnes sont au format snake_case et en anglais.
- La table a obligatoirement "id SERIAL PRIMARY KEY".
- Une clé étrangère respecte le formation <colonne de la table étrangère>_<nom de la table étangère> 
- Respecter le format suivante : 
    ``` SQL
    DROP TABLE IF EXISTS tables;
    CREATE TABLE tables (
        -- PRIMARY KEY --
        id SERIAL PRIMARY KEY,
        -- OTHER --
        name TEXT NOT NULL UNIQUE,
        -- FOREIGN KEY --
        id_tables_informations INTEGER NOT NULL REFERENCES tables_informations (id)
    );
    ```