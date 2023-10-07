function Header(props) {
    const Input = 'input'
    return (
        <header className="header">
            <h1>todos</h1>
            <Input
                className="new-todo"
                title="Press Enter to add new task!"
                placeholder="What needs to be done?"
                autoFocus
                {...props}
            />
        </header>
    )
}

export default Header