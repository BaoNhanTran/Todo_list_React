const action = {
    SET_TODO: 'set_todo',
    ADD_TODO: 'add_todo',
    DELETE_TODO: 'delete_todo',
    COMPLETED: 'completed',
    TOGGLE_ALL: 'toggled_all',
    SET_EDIT_INDEX: 'set_edit_index',
    EDIT_TODO: 'edit_todo',
    SET_IS_ENTER_OR_ESC_PRESSED: 'set_is_enter_or_esc_pressed',
    SET_FILTER: 'set_filter',
    CLEAR_COMPLETED: 'clear_completed',

    setTodo(payload) {
        return {
            type: action.SET_TODO,
            payload
        }
    },

    addTodo() {
        return {
            type: action.ADD_TODO,
        }
    },

    deleteTodo(payload) {
        return {
            type: action.DELETE_TODO,
            payload
        }
    },

    completed(payload) {
        return {
            type: action.COMPLETED,
            payload
        }
    },

    toggleAll() {
        return {
            type: action.TOGGLE_ALL
        }
    },

    setEditIndex(payload) {
        return {
            type: action.SET_EDIT_INDEX,
            payload
        }
    },

    editTodo(payload) {
        return {
            type: action.EDIT_TODO,
            payload
        }
    },

    setIsEnterOrEscpressed(payload) {
        return {
            type: action.SET_IS_ENTER_OR_ESC_PRESSED,
            payload
        }
    },

    setFilter(payload) {
        return {
            type: action.SET_FILTER,
            payload
        }
    },

    clearCompleted() {
        return {
            type: action.CLEAR_COMPLETED,
        }
    }
}

export default action



