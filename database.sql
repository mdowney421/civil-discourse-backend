CREATE DATABASE civil_discourse;

CREATE TABLE useraccounts (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);

CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    description VARCHAR(255),
    image VARCHAR(255),
    url VARCHAR(255),
    date TEXT UNIQUE,
    likes INTEGER,
    dislikes INTEGER,
    comments JSON[]
);