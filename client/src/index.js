import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import configureStore from './store/configureStore'
import {setUser} from './actions/user'
import {startSetUsers} from './actions/user'
import {startSetDepartments} from './actions/department'
import {startSetRequest} from './actions/request'

import axios from 'axios'


const store = configureStore()
store.subscribe(() => {
    console.log('index1:',store.getState())
})

console.log('index2:',store.getState())

if(localStorage.getItem('authToken')) {
    axios.get('http://localhost:4002/users/account',{
        headers : {
            'x-auth':localStorage.getItem('authToken')
        }
    })
    .then(response=>{
        const user = response.data
        store.dispatch(setUser(user))
        store.dispatch(startSetDepartments())
        store.dispatch(startSetUsers())
        store.dispatch(startSetRequest())
        
    })
}
const ele = (
    <Provider store = {store}>
        <App /> 
    </Provider>
)
ReactDOM.render(ele, document.getElementById('root'));