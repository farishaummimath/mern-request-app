import {createStore,combineReducers,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import currentUserReducer from '../reducers/user'
import usersReducer from '../reducers/users'
import departmentsReducer from '../reducers/departments'
import requestsReducers from '../reducers/request'

const configureStore = () => {
    const store = createStore(combineReducers({
        currentuser: currentUserReducer,
        users: usersReducer,
        departments: departmentsReducer,
        requests: requestsReducers,
    }),applyMiddleware(thunk))

    return store

}

export default configureStore