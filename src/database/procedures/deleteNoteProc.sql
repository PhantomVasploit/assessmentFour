CREATE PROCEDURE deleteNoteProc(@id INT)
AS
BEGIN
    DELETE
    FROM Notes
    WHERE id = @id
END;