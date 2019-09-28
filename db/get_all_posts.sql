SELECT p.author_id, p.id, p.title, hu.username, hu.profile_pic, p.img, p.content FROM helo_users hu
JOIN posts p ON hu.id = p.author_id
WHERE title like $1;