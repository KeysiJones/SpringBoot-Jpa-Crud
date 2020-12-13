# SpringBoot-Jpa-Crud

This is a simple SpringBoot Jpa Crud System than can Create, Retrieve, Update and Delete data from a MySql database.

You must have a mysql database named "java" and a table named "user" with the columns id, name and email.

Once you've created the "java" database you can run the SQL command bellow

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=55 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `user` (`id`, `name`, `email`) VALUES
(49, 'Dummy Friend', 'Dummy@gmail.com'),
(54, 'Cristian Ronald', 'CR9@gmail.com'),
(52, 'Jane Dummy', 'Jdummy@gmail.com');
COMMIT;

Finally, to run this project you need to open cmd and type mvnw spring-boot:run or .\mvnw spring-boot:run on the project's root folder.

How to use it ... well, you can create a new person using the pessoas menu and then clicking in the "cadastrar" option ... thats the same as /add...

To see all the registered people you can go to Pessoas >> Listar option on the menu, thats the sema as the home page...

To Delete and Update records you can use the buttons "Editar" and "Deletar"...

Thats it, i hope it helps someone.
