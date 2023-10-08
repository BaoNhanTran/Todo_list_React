function TodoItem({ todo, index, handle, editIndex }) {
    return (
        <li
            className={todo.completed ? "completed" : "" + (editIndex === index ? "editing" : "")}
        >
            <div className="view">
                <input
                    className="toggle"
                    checked={todo.completed}
                    onChange={() => handle.complete(index)}
                    type="checkbox"
                />
                <label
                    className="todo-label"
                    title={todo.completed ? "Completed task can't be edited" : "Double click to edit task!"}
                    onDoubleClick={() => handle.startEdit(index)}
                >
                    <span className="todo-text">
                        {todo.title}
                    </span>
                    <span className="date">
                        {todo.date}
                    </span>
                </label>
                <button className="destroy" onClick={() => handle.delete(todo)}></button>
            </div>
            {todo.title.length <= 43 ? (
                <input
                    className="edit"
                    onKeyUp={e => handle.edit(e, todo, index)}
                    onBlur={e => handle.edit(e, todo, index)}
                    defaultValue={todo.title}
                />
            )
                : (
                    <textarea
                        className="edit"
                        onKeyUp={e => handle.edit(e, todo, index)}
                        onBlur={e => handle.edit(e, todo, index)}
                        defaultValue={todo.title}
                    />
                )}
        </li>
    )
}

export default TodoItem