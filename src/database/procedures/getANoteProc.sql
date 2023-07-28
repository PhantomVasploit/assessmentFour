CREATE PROCEDURE getANoteProc(@id INT)
AS
BEGIN
    SELECT id, title, content, createdAt
    FROM Notes
    WHERE id = @id
END;