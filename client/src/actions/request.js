import axios from "../config/axios"
import {startSetNotification} from './notifications'
export const setRequest = (requests) => {
    return {
        type: 'SET_REQUEST',
        payload: requests
    }
}

export const startSetRequest = () => {
    return (dispatch) => {
        axios.get('/requests',{
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
export const startAddRequest = (request) => {
    return (dispatch) => {
    //   socket.emit('addRequest', request);
      dispatch(addRequest(request));
      dispatch(startSetNotification(request))

    }
  }
export const UpdateRequest = (request) => {
    return {
            type: 'UPDATE_REQUEST',
            payload: request
    }
}

  export const startApproveRequest = (request,socket) => {
    return (dispatch) => {
      dispatch(UpdateRequest(request));
      socket.emit('approveRequest', request);
    }
  }

  export const startRejectRequest = (request,socket) => {
    return (dispatch) => {
      dispatch(UpdateRequest(request));
      socket.emit('rejectRequest', request);
    }
  }
