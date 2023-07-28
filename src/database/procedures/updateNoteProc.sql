CREATE PROCEDURE updateNoteProcedure(@id INT, @title VARCHAR(255), @content VARCHAR(MAX))
AS
BEGIN
    UPDATE Notes
    SET title = @title, content = @content
    WHERE id = @id
END;