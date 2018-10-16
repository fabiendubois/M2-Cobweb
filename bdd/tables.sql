DROP TABLE IF EXISTS users;
CREATE TABLE users (
    -- PRIMARY KEY --
    id SERIAL PRIMARY KEY,
    -- OTHER --
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    admin BOOLEAN DEFAULT FALSE NOT NULL     
);

DROP TABLE IF EXISTS technologies;
CREATE TABLE technologies (
    -- PRIMARY KEY --
    id SERIAL PRIMARY KEY,
    -- OTHER --
    name TEXT NOT NULL
);

DROP TABLE IF EXISTS applications;
CREATE TABLE applications (
    -- PRIMARY KEY --
    id SERIAL PRIMARY KEY,
    -- OTHER --
    name TEXT NOT NULL,
    description TEXT,
    team TEXT
);

DROP TABLE IF EXISTS flows;
CREATE TABLE flows (
    -- PRIMARY KEY --
    id SERIAL PRIMARY KEY,
    -- OTHER --
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    -- FOREIGN KEY --
    id_applications_source INTEGER NOT NULL REFERENCES applications (id),
    id_applications_target INTEGER NOT NULL REFERENCES applications (id)
);

DROP TABLE IF EXISTS flows_technologies;
CREATE TABLE flows_technologies (
    -- PRIMARY KEY --
    id SERIAL PRIMARY KEY,
    -- OTHER --
    ordering INTEGER NOT NULL,
    -- FOREIGN KEY --
    id_flows INTEGER NOT NULL REFERENCES flows (id),
    id_technologies INTEGER NOT NULL REFERENCES technologies (id)
);

DROP TABLE IF EXISTS applications_technologies;
CREATE TABLE applications_technologies (
    -- PRIMARY KEY --
    id SERIAL PRIMARY KEY,
    -- FOREIGN KEY --
    id_applications INTEGER NOT NULL REFERENCES applications (id),
    id_technologies INTEGER NOT NULL REFERENCES technologies (id)
);