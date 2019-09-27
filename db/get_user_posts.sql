SELECT hu.id, p.title, hu.username, hu.profile_pic FROM helo_users hu
JOIN posts p ON hu.id = p.author_id
WHERE p.title LIKE $1 AND hu.id = $2;