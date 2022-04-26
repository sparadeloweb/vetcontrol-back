const todoMethods = {}
const Todo = require('../models/todoModel')

todoMethods.addTodo = async (req, res) => {
    const {title, description} = req.body

    if(!title){
        return res.status(500).json({
            message: "El titulo es necesario"
        })
    }

    const user_id = req.user_id

    const newTodo = new Todo({title, description, owner: user_id})

    newTodo.save();

    res.status(200).json({
        message: "Todo creado correctamente"
    })
}

todoMethods.getUserTodos = async (req, res) => {
    if(req.user_id){
        const todos = await Todo.find({owner: req.user_id})
        return res.status(200).json({
            todos: todos,
        })
    } else {
        return res.status(500).json({
            message: "No se encontro el ID de usuario"
        })
    }
}

todoMethods.getAllTodos = async (req, res) => {
    const todos = await Todo.find()

    return res.status(200).json({
        todos: todos,
    })
}

todoMethods.getTodo = async (req, res) => {
    const {id} = req.params

    if(id){
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const findedTodo = await Todo.findOne({_id: id})
    
            if(!findedTodo) {
                return res.status(500).json({
                    message: "Todo no encontrado"
                })
            }

            return res.status(200).json({
                todo: findedTodo
            })
        } else {
            return res.status(500).json({
                message: "Todo no encontrado"
            })
        }
    } else {
        return res.status(500).json({
            message: "Todo no encontrado"
        })
    }
}

todoMethods.updateTodo = async (req, res) => {
    const {title, description} = req.body
    
    const {id} = req.params

    if(id){
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const findedTodo = await Todo.findById(id)
            if(!findedTodo) {
                return res.status(500).json({
                    message: "Todo no encontrado"
                })
            }
        
            if(findedTodo.owner == req.user_id) {
                if(title || description) {
                    if(title) {
                        findedTodo.title = title
                    }
                    if(description) {
                        findedTodo.description = description
                    }
                }
                findedTodo.save()
                return res.status(200).json({
                    message: "Todo actualizado correctamente"
                })
            } else {
                return res.status(500).json({
                    message: "No tienes permisos para actualizar este todo"
                })
            }
        }
    } else {
        return res.status(500).json({
            message: "Todo no encontrado"
        })
    }
}

todoMethods.updateTodoStatus = async (req, res) => {
    const {id} = req.params

    if(id){
        if (id.match(/^[0-9a-fA-F]{24}$/)) {
            const findedTodo = await Todo.findById(id)

            if(!findedTodo) {
                return res.status(500).json({
                    message: "Todo no encontrado"
                })
            }

            if(findedTodo.owner === req.user_id) {
                findedTodo.status = findedTodo.turnTodo()
        
                if(findedTodo.status) {
                    findedTodo.completedAt = new Date()
                } else {
                    findedTodo.completedAt = null
                }
            
                findedTodo.save()
            
                return res.status(200).json({
                    message: "Todo actualizado correctamente"
                })
            } else {
                return res.status(500).json({
                    message: "No tienes permisos para actualizar este todo"
                })
            }
        }
    } else {
        return res.status(500).json({
            message: "Todo no encontrado"
        })
    }
}


todoMethods.deleteTodo = async (req, res) => {
    
}

module.exports = todoMethods