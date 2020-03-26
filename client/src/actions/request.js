import axios from "../config/axios"
export const setRequest = (requests) => {
    return {
        type: 'SET_REQUEST',
        payload: requests
    }
}

export const startSetRequest = () => {
    return (dispatch) => {
        axios.get('/api/requests',{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                const requests = response.data
                console.log("requests",requests)
                dispatch(setRequest(requests))
            })
            .catch(err=>{
                console.log(err)
            }) 
    }
}

export const addRequest = (request) => {
    return {
        type: 'ADD_REQUEST',
        payload: request
    }
}

export const startAddRequest = (request,redirect) => {
    return (dispatch) => {
        console.log("Form request",request)
        axios.post('/api/requests',request,{
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
        .then(response=>{
            console.log(response.data)
            if(response.data.hasOwnProperty('errors')){
                alert(`${response.data.errors}--erro`)
            } else {
                const request = response.data
                redirect()
                dispatch(addRequest(request))
            }
        })
        
    }
}


export const UpdateRequest = (request) => {
    return {
            type: 'UPDATE_REQUEST',
            payload: request
    }
}

export const startApproveRequest = (request,redirect) => {
    console.log('startApproveRequest')
    return (dispatch) => {
        request.status = 'approved'
        axios.put(`/api/managerequests/${request._id}`,request, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log("Edited",response.data)
                if (response.data.errors) {
                    alert(`${response.data.message}`,"","error")
                } else {
                    const request = response.data
                    dispatch(UpdateRequest(request))
                    redirect()

                }
            })
    }
}
export const startRejectRequest = (request,redirect) => {
    return (dispatch) => {
        request.status = 'rejected'
        axios.put(`/api/managerequests/${request._id}`,request, {
            headers: {
                'x-auth': localStorage.getItem('authToken')
            }
        })
            .then(response=>{
                console.log("Edited",response.data)
                if (response.data.errors) {
                    alert(`${response.data.message}`,"","error")
                } else {
                    const request = response.data
                    dispatch(UpdateRequest(request))
                    redirect()

                }
            })
    }
}