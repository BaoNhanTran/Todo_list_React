const logger = (reducer) => {
    return (state, action) => {
        console.group(action.type)
        console.log('Prev state:', state);
        console.log('payload:', action.payload);
        const nextState = reducer(state, action)
        console.log('Next state:', nextState);
        console.groupEnd()
        return nextState
    }
}

export default logger