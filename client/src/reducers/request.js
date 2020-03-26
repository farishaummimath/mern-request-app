const requestsReducer = (state=[],action) => {
    console.log(action.type,state)
    switch(action.type){
        case 'SET_REQUEST': return [].concat(state,action.payload)

        case 'REMOVE_REQUEST': return state.filter(request=>{
            return request._id != action.payload._id
        })

        case 'ADD_REQUEST' : return [...state,action.payload]

        case 'UPDATE_REQUEST': return state.map(request=>{
                    if(request._id == action.payload._id){
                        return Object.assign({},request,action.payload)
                    } else {
                        return Object.assign({},request)
                    }
        })
        default: return [...state]
    }
}
export default requestsReducer