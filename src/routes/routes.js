const { Router } = require('express');
const { getAllNotes, getANote, createNewNote, updateNote, deleteNote } = require('../controller/notes.controller');

const router = Router();

router.get('/', getAllNotes)
router.get('/:id', getANote)
router.put('/:id', updateNote)
router.post('/', createNewNote)
router.delete('/:id', deleteNote)

module.exports = router;