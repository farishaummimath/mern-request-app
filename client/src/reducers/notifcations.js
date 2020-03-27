const notificationsReducers = (state=[],action) => {
    switch(action.type){
        case 'ADD_NOTIFICATION': return [].concat(state,action.payload)
        default: return [...state]
    }
}
export default notificationsReducers
