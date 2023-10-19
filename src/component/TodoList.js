import TodoItem from './TodoItem.js'
import action from '../actions.js'
const { toggleAll } = action

function TodoList({ todos, filters, filter, dispatch, ...props }) {
    return (
        <section className="main">
            <input
                checked={todos.every(task => task.completed === true)}
                id="toggle-all"
                className="toggle-all"
                type="checkbox"
                onChange={() => dispatch(toggleAll())}
            />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">
                {/* <!-- These are here just to show the structure of the list items --> */}
                {/* <!-- List items should get the class `editing` when editing and `completed` when marked as completed --> */}
                {todos.map((task, index) => {
                    if (filters[filter](task)) {
                        return (
                            < TodoItem
                                key={index}
                                task={task}
                                index={index}
                                dispatch={dispatch}
                                {...props}
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