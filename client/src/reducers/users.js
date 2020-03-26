const usersReducer = (state=[],action) => {
    switch(action.type){
        case 'SET_USERS': return [].concat(state,action.payload)
        default: return [...state]
    }
}

export default usersReducer