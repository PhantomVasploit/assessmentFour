const mssql = require('mssql')

const { noteSchema } = require('../utils/validator')
const { sqlConfig } = require('../config/database.connection.config')

module.exports.createNewNote = (req, res)=>{
    // sanitize data first
    const { title, content, createdAt } = req.body
    
    const {error} = noteSchema.validate({title, content})
    if(error){
        return res.status(400).json({error: error.message})
    }else{
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('title', title)
            .input('content', content)
            .input('createdAt', createdAt)
            .execute('createNewNoteProc')
            .then((result)=>{
                return res.status(201).json({message: 'New note created successfully'})
            })
            .catch((e)=>{
               return res.status(400).json({error: e.message})
            })
        })
        .catch((e)=>{
           return res.status(500).json({error: `Internal server error: ${e.message}`})
        })
    }
}


module.exports.getAllNotes = (req, res)=>{
    mssql.connect(sqlConfig)
    .then((pool)=>{
        pool.request()
        .execute('getAllNotesProc')
        .then((result)=>{
            return res.status(200).json({message: 'Fetch successful', notes: result.recordset})
        })
        .catch((e)=>{
            return res.status(400).json({error: e.message})
        })
    })
    .catch((e)=>{
        return res.status(500).json({error: `Internal server error: ${e.message}`})
    })
}


module.exports.getANote = (req, res)=>{
    const { id } = req.params;
    mssql.connect(sqlConfig)
    .then((pool)=>{
        pool.request()
        .input('id', id)
        .execute('getANoteProc')
        .then((result)=>{
            return res.status(200).json({message: 'Fetch successful', note: result.recordset[0]})
        })
        .catch((e)=>{
            return res.status(400).json({error: e.message})
        })
    })
    .catch((e)=>{
        return res.status(500).json({error: `Internal server error: ${e.message}`})
    })
}


module.exports.updateNote = (req, res)=>{
    const { id } = req.params
    const {title, content, createdAt} = req.body
    // data sanitization
    const { error } = noteSchema.validate({title, content})
    if(error){
        return res.status(400).json({error: error.message})
    }else{
        mssql.connect(sqlConfig)
        .then((pool)=>{
            pool.request()
            .input('title', title)
            .input('content', content)
            .execute('updateNoteProcedure')
            .then((result)=>{
                return res.status(200).json({message: 'Updated note successfully'})
            })
            .catch((e)=>{
                return res.status(400).json({error: e.message})
            })
        })
        .catch((e)=>{
            return res.status(500).json({error: `Internal server error: ${e.message}`})
        })
    }
}


module.exports.deleteNote = (req, res)=>{
    const { id } = req.params
    mssql.connect(sqlConfig)
    .then((pool)=>{
        pool.request()
        .input('id', id)
        .execute('deleteNoteProc')
        .then((result)=>{
            return res.status(200).json({message: 'Note deleted successfully'})
        })
        .catch((e)=>{
            res.status(400).json({error: e.message})
        })
    })
    .catch((e)=>{
        return res.status(500).json({error: `Internal server error: ${e.message}`})
    })
}