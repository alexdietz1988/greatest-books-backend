CREATE DATABASE greatestbooks;

CREATE TABLE auth(
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255)
);