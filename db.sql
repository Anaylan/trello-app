CREATE TABLE `columns` (
  `id` integer PRIMARY KEY,
  `name` text,
  `description` text,
  `user_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `users` (
  `id` integer PRIMARY KEY,
  `email` varchar(255),
  `firstname` varchar(255),
  `lastname` varchar(255),
  `password` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `cards` (
  `id` integer PRIMARY KEY,
  `title` varchar(255),
  `description` text,
  `column_id` integer,
  `user_id` integer,
  `status` varchar(255),
  `created_at` timestamp,
  `updated_at` timestamp
);

CREATE TABLE `comments` (
  `id` integer PRIMARY KEY,
  `description` text,
  `card_id` integer,
  `user_id` integer,
  `created_at` timestamp,
  `updated_at` timestamp
);

ALTER TABLE `columns` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cards` ADD FOREIGN KEY (`column_id`) REFERENCES `columns` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`card_id`) REFERENCES `cards` (`id`);

ALTER TABLE `comments` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

ALTER TABLE `cards` ADD FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);
