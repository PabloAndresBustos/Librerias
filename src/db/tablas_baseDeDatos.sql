CREATE TABLE IF NOT EXISTS `bdphaylwsnlbt55jud5h`.`libraries` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(255) NOT NULL,
  `is_deleted` VARCHAR(3) NULL DEFAULT 'no',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
AUTO_INCREMENT = 22
DEFAULT CHARACTER SET = utf8

CREATE TABLE IF NOT EXISTS `bdphaylwsnlbt55jud5h`.`books` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `isbn` INT(11) NOT NULL,
  `title` VARCHAR(255) NULL DEFAULT NULL,
  `autor` VARCHAR(255) NULL DEFAULT NULL,
  `publish_year` VARCHAR(255) NULL DEFAULT NULL,
  `library_id` INT(11) NULL DEFAULT NULL,
  `is_deleted` VARCHAR(3) NULL DEFAULT 'no',
  PRIMARY KEY (`id`),
  INDEX `fk_library` (`library_id` ASC) VISIBLE,
  CONSTRAINT `fk_library`
    FOREIGN KEY (`library_id`)
    REFERENCES `bdphaylwsnlbt55jud5h`.`libraries` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8

CREATE TABLE IF NOT EXISTS `bdphaylwsnlbt55jud5h`.`users` (
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(255) NOT NULL,
  `user_password` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8
