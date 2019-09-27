SELECT p.author_id, p.id, p.title, p.img, p.content, hu.username, hu.profile_pic FROM helo_users hu
JOIN posts p ON hu.id = p.author_id
WHERE p.id = $1;