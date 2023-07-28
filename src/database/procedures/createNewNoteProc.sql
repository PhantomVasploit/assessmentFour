CREATE PROCEDURE createNewNoteProc(@title VARCHAR(255), @content VARCHAR(MAX), @createdAt DATE)
AS
BEGIN
    INSERT
    INTO Notes(title, content, createdAt)
    VALUES(@title, @content, @createdAt)
END;