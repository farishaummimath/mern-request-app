import axios from "../config/axios"

export const setUser = (user) => {
    return {type:'SET_USER', payload: user}
}
export const removeUser = () => {
    return {
        type: 'REMOVE_USER'
    }
}

export const startGetUsers = (users) =>{
    return {type:'SET_USERS', payload: users}

}

export const startSetUsers = () => {
    return (dispatch) => {
        axios.get('/api/users',{
                    headers: {
                        'x-auth': localStorage.getItem('authToken')
                    }
                })
            .then(response=>{
                const users = response.data
                dispatch(startGetUsers(users))
            })
            .catch(err=>{
                console.log(err)
            })

    }
}

export const startSetUser = (loginData,redirect) => {
    return (dispatch) => {
        axios.post('/api/login',loginData)
            .then(response=>{
                console.log(response.data)

                if(response.data.hasOwnProperty('errors')){
                    console.log(`${response.data.errors}`,"--","error")
                } else {
                    console.log("Successfully Logged In!","","success")
                    localStorage.setItem('authToken', response.data.token)
                    dispatch(setUser(response.data.user))
                    redirect()
                    window.location.reload()
                }
            })
    }
}
export const startRemoveUser = () => {
    return(dispatch=>{
        axios.delete('/api/logout',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                if(response.data.errors){
                    alert(response.data.message)
                } else {
                    localStorage.removeItem('authToken')
                    window.location.href = '/users/login'
                    dispatch(removeUser())
                }
            })
            

    })
}