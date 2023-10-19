import action from "../actions"
const { deleteTodo, completed } = action

function TodoItem({ task, index, handle, editIndex, dispatch }) {
    return (
        <li
            className={`${task.completed ? "completed" : ""} ${editIndex === index ? "editing" : ""}`}
        >
            <div className="view">
                <input
                    className="toggle"
                    checked={task.completed}
                    onChange={() => dispatch(completed(index))}
                    type="checkbox"
                />
                <label
                    className="todo-label"
                    title={task.completed ? "Completed task can't be edited!" : "Double click to edit task!"}
                    onDoubleClick={() => handle.startEdit(index)}
                >
                    <span className="todo-text">
                        {task.title}
                    </span>
                    <span className="date">
                        {task.date}
                    </span>
                </label>
                <button className="destroy" onClick={() => dispatch(deleteTodo(index))}></button>
            </div>
            {task.title.length <= 43 ? (
                <input
                    className="edit"
                    onKeyUp={e => handle.edit(e)}
                    onBlur={e => handle.edit(e)}
                    defaultValue={task.title}
                />
            )
                : (
                    <textarea
                        className="edit"
                        onKeyUp={e => handle.edit(e)}
                        onBlur={e => handle.edit(e)}
                        defaultValue={task.title}
                    />
                )}
        </li>
    )
}

export default TodoItem