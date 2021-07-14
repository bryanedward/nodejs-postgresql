CREATE TABLE IF NOT EXISTS books(
    isbn INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    namebook VARCHAR NOT NULL,
    descriptbook VARCHAR,
    yearbook DATE,
    price DECIMAL
);

-- tabla para respaldar los libros antes de modificar
CREATE TABLE IF NOT EXISTS res_books(
    isbn INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    namebok VARCHAR NOT NULL,
    descriptbook VARCHAR,
    yearbook DATE,
    price DECIMAL
);

ALTER TABLE books add CONSTRAINT name_book UNIQUE (namebook);

CREATE FUNCTION save_books() RETURNS TRIGGER
AS
$$
DECLARE
delivery_date DATE := CURRENT_DATE;
BEGIN
  INSERT INTO res_books
  (namebook,descriptbook,yearbook,price)
  VALUES(old.namebook, old.descriptbook, delivery_date, old.price);
  RETURN new;
END;
$$
LANGUAGE plpgsql;

CREATE TRIGGER save_book before UPDATE ON books
for each row
EXECUTE PROCEDURE save_books();


