import mssql from 'mssql'
import { createNewNote, deleteNote, getANote, getAllNotes, updateNote } from '../src/controller/notes.controller'

describe("Note controller test suite", ()=>{
    
    describe("Create new note test suite", ()=>{
        
        it("should return a status code of 422 if the request body is not provided", ()=>{
            
            const req = {
                body: {

                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn() 
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({rowsAffected: 0})
            })

            createNewNote(req, res)
            expect(res.status).toHaveBeenCalledWith(422)
            expect(res.json).toHaveBeenCalledWith({error: 'Request body can not be empty'})
        })

        it("should create a new note when the body has the title and content field", ()=>{
            
            const req = {
                body: {
                    title: "The Jitu",
                    content: "The giant in technology"
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, "connect").mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({rowsAffected: [1]})
            })

            createNewNote(req, res)
            expect(res.status).toHaveBeenCalledWith(201)
            expect(res.json).toHaveBeenCalledWith({message: 'New note created successfully'})
        })

    })

    describe("Fetching notes test suite", ()=>{
        it("should fetch all notes", ()=>{
            const mockedRecordset = [
                {
                    id: 12,
                    title: 'The Jitu',
                    content: 'The giant in technology',
                    createdAt: "2023-08-01T00:00:00.000Z"
                  },
                  {
    
                    id: 1005,
                    title: 'The Jitu',
                    content: 'The giant in technology',
                    createdAt: "2023-08-02T00:00:00.000Z"
                  },
                  {
    
                    id: 1006,
                    title: 'The Jitu',
                    content: 'The giant in technology',
                    createdAt: "2023-08-02T00:00:00.000Z"
                }]
    
            const req ={}
            
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
    
            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    recordset: mockedRecordset
                })
            })
    
            getAllNotes(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message: 'Fetch successful'})
            expect(res.json.toHaveBeenCalledWith({notes: mockedRecordset}))
        })
        
        it("should fetch one note when a valid id is provided", ()=>{
            const mockedRecordset = [{
                id: 12,
                title: 'The Jitu',
                content: 'The giant in technology',
                createdAt: "2023-08-01T00:00:00.000Z"
            }]

            const req = {
                params: {
                    id: 12
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({ recordset: mockedRecordset})
            })

            getANote(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message: 'Fetch successful'})
            expect(res.json).toHaveBeenCalledWith({note: mockedRecordset[0]})
        })
    })


    describe("Updating a note test suite", ()=>{
        it("should update a note when the id and body is valid", ()=>{
            
            const req = {
                params: {
                    id: 12
                },
                body: {
                    title: 'The Jitu',
                    content: 'The giant in technology',
                    createdAt: "2023-08-02T00:00:00.000Z"
                }
            }

            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }

            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })

            updateNote(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message: 'Updated note successfully'})
        })
    })


    describe("Delete a note test suite", ()=>{
        it('should delete a note if id is valid', ()=>{
            const req = {
                params: {
                    id: 12
                }
            }
    
            const res = {
                status: jest.fn().mockReturnThis(),
                json: jest.fn()
            }
    
            jest.spyOn(mssql, 'connect').mockResolvedValueOnce({
                request: jest.fn().mockReturnThis(),
                input: jest.fn().mockReturnThis(),
                execute: jest.fn().mockResolvedValueOnce({
                    rowsAffected: [1]
                })
            })
    
            deleteNote(req, res)
            expect(res.status).toHaveBeenCalledWith(200)
            expect(res.json).toHaveBeenCalledWith({message: 'Note deleted successfully'})
        })      
    })

})