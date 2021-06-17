/***CREATING ALL TABLES*/
CREATE TABLE Fruit (
  FruitId   INT PRIMARY KEY AUTO_INCREMENT NOT NULL,
  FruitName    VARCHAR(40)                    NULL
);


/* INSERT DATA */
INSERT INTO Fruit (FruitName)
VALUES ('Banana');
INSERT INTO Fruit (FruitName)
VALUES ('Apple');

DROP PROCEDURE IF EXISTS sp_GetFruit;
DELIMITER //
CREATE PROCEDURE sp_GetFruit()
  BEGIN
    SELECT * FROM Fruit;
  END //
DELIMITER ;
/**Drop StoreProcedure**/
CALL sp_GetFruit();