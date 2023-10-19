import { useReducer } from "react";

// CSS
import './css/base.css'
import './css/style.css'

// Core
import reducer from './reducer.js'
import action from './actions.js'

// Component
import Header from './component/Header.js'
import TodoList from './component/TodoList.js'
import Footer from "./component/Footer";

// utilities
import initState from './util/initState.js'
import logger from './util/logger'

// Main

const { setTodo, addTodo, setEditIndex, editTodo, deleteTodo, setIsEnterOrEscpressed } = action

function App() {

    // Handler functions
    const handle = {
        add(e) {
            const newTitle = todo.trim()
            if (e.keyCode === 13 && newTitle !== '') {
                if (todos.some(todo => todo.title === newTitle)) {
                    alert('This task has already been added!')
                } else {
                    dispatch(addTodo())
                }
            }
        },
        startEdit(index) {
            if (!todos[index].completed) {
                dispatch(setEditIndex(index))
                dispatch(setIsEnterOrEscpressed(false))
            }
            setTimeout(() => {
                // dùng ref trong trường hợp này chỉ lấy được input cuối cùng nên không đạt được mục đích
                const input = document.querySelectorAll('.edit')[index]
                const end = input.value.length
                input.focus()
                input.setSelectionRange(end, end)
            }, 0);
        },
        edit(e) {
            const newTitle = e.target.value.trim();
            const endEdit = () => {
                if (newTitle !== '') {
                    /* Option warning: Xử lý khi người dùng sửa tên task, nhưng tên mới đã tồn tại trong todo list: 
                    Đảm bảo rằng trong todo list không có 2 task trùng tên nhau */
                    if (todos.some((task, index) => task.title === newTitle && editIndex !== index && editIndex !== null)) {
                        alert('This task has already been added! Please choose another task.')
                    } else {
                        dispatch(editTodo(newTitle))
                        dispatch(setEditIndex(null))
                    }
                } else {
                    dispatch(deleteTodo(editIndex))
                    dispatch(setEditIndex(null))
                }
            }

            switch (e.keyCode) {
                case 13:
                    endEdit()
                    //Đổi biến isEnterOrEscPressed sang true khi người dùng nhấn phím enter hoặc esc
                    dispatch(setIsEnterOrEscpressed(true))
                    break
                case undefined:
                    // Duyệt biến isEnterOrEscPressed === false mới kích hoạt onBlur
                    if (!isEnterOrEscpressed) {
                        endEdit()
                    }
                    // Đổi biến isEnterOrEscPressed sang false sau khi onBlur được kích hoạt
                    dispatch(setIsEnterOrEscpressed(false))

                    break
                case 27:
                    dispatch(setEditIndex(null))
                    //Đổi biến isEnterOrEscPressed sang true khi người dùng nhấn phím enter hoặc esc
                    dispatch(setIsEnterOrEscpressed(true))
            }
        }
    }

    // Hook

    const [state, dispatch] = useReducer(logger(reducer), initState)

    const { todo, todos, editIndex, isEnterOrEscpressed, filter, filters } = state

    // JSX

    return (
        <section className="todoapp">
            <Header
                onChange={e => dispatch(setTodo(e.target.value))}
                value={todo}
                onKeyUp={handle.add}
            />
            {/* <!-- This section should be hidden by default and shown when there are todos --> */}
            {todos.length > 0 &&
                <TodoList
                    todos={todos}
                    filters={filters}
                    filter={filter}
                    editIndex={editIndex}
                    handle={handle}
                    dispatch={dispatch}
                />
            }
            {/* <!-- This footer should hidden by default and shown when there are todos --> */}
            {todos.length > 0 &&
                <Footer
                    todos={todos}
                    filters={filters}
                    filter={filter}
                    dispatch={dispatch}
                />
            }
        </section>
    );
}

export default App;

