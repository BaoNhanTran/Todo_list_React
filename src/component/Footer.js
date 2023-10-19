import action from "../actions"
const { setFilter, clearCompleted } = action

function Footer({ todos, filters, filter, dispatch }) {
    return (
        <footer className="footer">
            {/* <!-- This should be `0 items left` by default --> */}
            <span className="todo-count"><strong>{todos.filter(todo => !todo.completed).length}</strong> item left</span>
            {/* <!-- Remove this if you don't implement routing --> */}
            <ul className="filters">
                {Object.keys(filters).map((item, index) =>
                    <li key={index}>
                        <a
                            className={filter === item ? "selected" : ""}
                            href="#/"
                            onClick={() => dispatch(setFilter(item))}
                        >
                            {item[0].toUpperCase() + item.slice(1)}
                        </a>
                    </li>
                )}
            </ul>
            {/* <!-- Hidden if no completed items are left ↓ --> */}
            {todos.some(filters.completed) ? (
                <button
                    className="clear-completed"
                    onClick={() => dispatch(clearCompleted())}
                >
                    Clear completed
                </button>
            )
                : (
                    <span className="clear-completed disable">
                        No completed tasks!
                    </span>
                )
            }
        </footer>
    )
}

export default Footer