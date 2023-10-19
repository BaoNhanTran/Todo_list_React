import date from './util/date.js'
import storage from "./util/storage";
import action from './actions'

const { SET_TODO, ADD_TODO, DELETE_TODO, COMPLETED, TOGGLE_ALL, SET_EDIT_INDEX, EDIT_TODO, SET_IS_ENTER_OR_ESC_PRESSED, SET_FILTER, CLEAR_COMPLETED } = action

const reducer = (state, action) => {
    const { todo, todos, editIndex, filters } = state
    let newState
    switch (action.type) {
        case SET_TODO: {
            newState = {
                ...state,
                todo: action.payload
            }
            break
        }
        case ADD_TODO: {
            newState = {
                ...state,
                todo: '',
                todos: [
                    ...todos,
                    {
                        title: todo,
                        completed: false,
                        date
                    }
                ]
            }
            storage.set(newState.todos)
            break
        }
        case DELETE_TODO: {
            const newTodos = [...todos]
            newTodos.splice(action.payload, 1)
            newState = {
                ...state,
                todos: newTodos
            }
            storage.set(newState.todos)
            break
        }
        case COMPLETED: {
            const newTodos = [...todos]
            const updateTodo = { ...newTodos[action.payload], completed: !newTodos[action.payload].completed }
            newTodos[action.payload] = updateTodo;
            newState = {
                ...state,
                todos: newTodos
            }
            storage.set(newState.todos)
            break
        }
        case TOGGLE_ALL: {
            const completed = todos.every(filters.completed)
            const newTodos = todos.map(task => ({
                ...task,
                completed: !completed
            })
            )
            newState = {
                ...state,
                todos: newTodos
            }
            storage.set(newState.todos)
            break
        }
        case SET_EDIT_INDEX: {
            newState = {
                ...state,
                editIndex: action.payload
            }
            break
        }
        case EDIT_TODO: {
            const newTodos = [...todos]
            const updateTodo = {...newTodos[editIndex], title: action.payload}
            newTodos[editIndex] = updateTodo
            newState = {
                ...state,
                todos: newTodos
            }
            break
        }
        case SET_IS_ENTER_OR_ESC_PRESSED: {
            newState = {
                ...state,
                isEnterOrEscpressed: action.payload
            }
            break
        }
        case SET_FILTER: {
            newState = {
                ...state,
                filter: action.payload
            }
            break
        }
        case CLEAR_COMPLETED: {
            newState = {
                ...state,
                todos: todos.filter(filters.active)
            }
            break
        }
        default: {
            throw new Error('Invalid action')
        }
    }
    return newState
}

export default reducer