import TodoItem from './TodoItem.js'

function TodoList({ todos, handle, filters, filter, editIndex }) {
    return (
        <section className="main">
            <input
                checked={todos.every(todo => todo.completed === true)}
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={handle.toggleAll}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {/* <!-- These are here just to show the structure of the list items --> */}
                {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
                {todos.map((todo, index) => {
                    if (filters[filter](todo)) {
                        return (
                            < TodoItem
                                key={index}
                                todo={todo}
                                index={index}
                                handle={handle}
                                editIndex={editIndex}
                            />
                        )
                    }
                }
                )}
            </ul>
        </section>
    )
}

export default TodoList