CREATE DATABASE civil_discourse;

CREATE TABLE useraccounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(500),
    description VARCHAR(500),
    image VARCHAR(500),
    url VARCHAR(500),
    date TEXT UNIQUE,
    likes JSON[],
    dislikes JSON[],
    comments JSON[]
);