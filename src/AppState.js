import { useState } from "react";

// CSS
import './css/base.css'
import './css/style.css'

// Component
import Header from './component/Header.js'
import TodoList from './component/TodoList.js'
import Footer from "./component/Footer";

// utilities
import date from './util/date.js'
import storage from './util/storage.js'

// Set initial todos
const init = [
    {
        title: 'Learn HTML, CSS',
        completed: true,
        date: "02/09/2023"
    },
    {
        title: 'Learn Javascript',
        completed: true,
        date: "12/09/2023"
    },
    {
        title: 'Learn ReactJs',
        completed: false,
        date: "06/10/2023"
    },
    {
        title: 'Cho người ta một phần mềm, bạn sẽ làm họ bực mình một ngày. Dạy người ta lập trình, họ sẽ bực mình cả đời!',
        completed: false,
        date: "06/10/2023"
    },
]

storage.get() || storage.set(init)

// Main

const filters = {
    all: () => true,
    active: todo => !todo.completed,
    completed: todo => todo.completed
}

function App() {

    // Handler functions
    const handle = {
        input(e) {
            setTask(e.target.value);
        },
        add(e) {
            const newTitle = task.trim()
            if (e.keyCode === 13 && newTitle !== '') {
                if (todos.some(todo => todo.title === newTitle)) {
                    alert('This task has already been added!')
                    setTask(newTitle)
                } else {
                    setTodos(prev => {
                        const next = [...prev, {
                            title: newTitle,
                            completed: false,
                            date,
                        }]

                        // Save to local storage
                        storage.set(next)
                        return next;
                    })
                    setTask('')
                }
            }
        },
        delete(todo) {
            setTodos(prev => {
                const next = prev.filter(item => item !== todo)
                storage.set(next)
                return next
            })
        },
        complete(index) {
            const newTodos = [...todos]
            newTodos[index].completed = !newTodos[index].completed
            storage.set(newTodos)
            setTodos(newTodos)
        },
        toggleAll() {
            const checked = todos.every(todo => todo.completed === true)
            const newTodos = todos.map(todo => ({
                ...todo,
                completed: !checked
            }))
            storage.set(newTodos)
            setTodos(newTodos)
        },
        startEdit(index) {
            setEditIndex(index)
            setTimeout(() => {
                const input = document.querySelectorAll('.edit')[index]
                const end = input.value.length
                input.focus()
                input.setSelectionRange(end, end)
            }, 0);
        },
        edit(e, todo, index) {
            const newTitle = e.target.value.trim();
            const endEdit = (todo, index) => {
                if (newTitle !== '') {
                    /* Xử lý khi người dùng sửa tên task, nhưng tên mới đã tồn tại trong todo list: 
                    Đảm bảo rằng trong todo list không có 2 task trùng tên nhau */
                    if (todos.some((todo, index) => todo.title === newTitle && editIndex !== index && editIndex !== null)) {
                        alert('This task has already been added! Please choose another task.')
                    } else {
                        const newTodos = [...todos]
                        newTodos[index].title = newTitle
                        storage.set(newTodos)
                        setTodos(newTodos)
                        setEditIndex(null)
                    }
                } else {
                    this.delete(todo)
                    setEditIndex(null)
                }
            }
            
            switch (e.keyCode) {
                case 13:
                    endEdit(todo, index)
                    //Đổi biến isEnterOrEscPressed sang true khi người dùng nhấn phím enter hoặc esc
                    setIsEnterOrEscpressed(true)
                    break
                case undefined:
                    // Duyệt biến isEnterOrEscPressed === false mới kích hoạt onBlur
                    if (!isEnterOrEscpressed) {
                        endEdit(todo, index)
                    }
                    // Đổi biến isEnterOrEscPressed sang false sau khi onBlur được kích hoạt
                    setIsEnterOrEscpressed(false)
                    break
                case 27:
                    setEditIndex(null)
                    //Đổi biến isEnterOrEscPressed sang true khi người dùng nhấn phím enter hoặc esc
                    setIsEnterOrEscpressed(true)
            }
        },
        clearCompleted() {
            setTodos(prev => {
                const next = prev.filter(filters.active)
                storage.set(next)
                return next
            })
        }
    }

    // Hook

    const [task, setTask] = useState('')

    const [todos, setTodos] = useState(() => storage.get() ?? [])

    const [filter, setFilter] = useState('all')

    const [editIndex, setEditIndex] = useState(null)

    // Tạo ra biến này để ngăn chặn việc gọi sự kiện onBlur sau khi người dùng nhấn enter hoặc esc
    const [isEnterOrEscpressed, setIsEnterOrEscpressed] = useState(false)

    // JSX

    return (
        <section className="todoapp">
            <Header
                onChange={handle.input}
                value={task}
                onKeyUp={handle.add}
            />
            {/* <!-- This section should be hidden by default and shown when there are todos --> */}
            {todos.length > 0 &&
                <TodoList
                    todos={todos}
                    handle={handle}
                    filters={filters}
                    filter={filter}
                    editIndex={editIndex}
                />
            }
            {/* <!-- This footer should hidden by default and shown when there are todos --> */}
            {todos.length > 0 &&
                <Footer
                    todos={todos}
                    handle={handle}
                    filters={filters}
                    filter={filter}
                    setFilter={setFilter}
                />
            }
        </section>
    );
}

export default App;

