CREATE OR ALTER PROCEDURE createNewNoteProc(@title VARCHAR(255), @content VARCHAR(MAX))
AS
BEGIN
    INSERT
    INTO Notes(title, content)
    VALUES(@title, @content)
END;

-- DROP PROCEDURE createNewNoteProc;