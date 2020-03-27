
export const addNotification = (request) => {
    return {
        type: 'ADD_NOTIFICATION',
        payload: request
    }
}

export const startSetNotification = (notification) => {
    return (dispatch) => {
      dispatch(addNotification(notification));

    }
  }