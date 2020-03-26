import axios from "axios"

export const setDepartments = (department) => {
    return {
        type: 'SET_DEPARTMENTS',
        payload: department
    }
}

export const startSetDepartments = () => {
    return (dispatch) => {
        axios.get('http://localhost:4002/departments',{
                headers: {
                    'x-auth': localStorage.getItem('authToken')
                }
            })
            .then(response=>{
                const departments = response.data
                dispatch(setDepartments(departments))
            })
            .catch(err=>{
                console.log(err)
            })

    }
}
