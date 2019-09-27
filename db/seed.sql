CREATE TABLE helo_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(20),
    password VARCHAR(20),
    profile_pic TEXT
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title VARCHAR(45),
    img TEXT,
    content TEXT,
    author_id INT REFERENCES helo_users(id)
);

INSERT INTO helo_users (username, password, profile_pic)
VALUES 
    ('s', 's', 'img'),
    ('r', 'r', 'img2');

    INSERT INTO posts (title, img, content, author_id)
VALUES 
    ('title1', 'img1', 'content1', 1),
    ('title2', 'img2', 'content2', 2);


-- BASE GET ALL POSTS --

SELECT p.title, hu.username, hu.profile_pic FROM helo_users hu
JOIN posts p ON hu.id = p.author_id;