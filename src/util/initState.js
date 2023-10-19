import storage from "./storage.js"

// Set initial state
const initState = {
    todo: '',
    editIndex: null,
    isEnterOrEscpressed: false, // Tạo ra biến này để ngăn chặn việc gọi sự kiện onBlur sau khi người dùng nhấn enter hoặc esc, tạo ra một vòng lặp vô hạn khi rơi vào option warning của edit todo
    filter: 'all',
    filters: {
        all: () => true,
        active: todo => !todo.completed,
        completed: todo => todo.completed
    },
    
    todos: [
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
}

storage.get() || storage.set(initState.todos)

export default {
    ...initState,
    todos: storage.get() ?? initState.todos
}
