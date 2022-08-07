CREATE TABLE IF NOT EXISTS units
(
    id          INT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
    name        VARCHAR(30) NOT NULL UNIQUE,
    create_time TIMESTAMP   NOT NULL DEFAULT NOW(),
    update_time TIMESTAMP
);