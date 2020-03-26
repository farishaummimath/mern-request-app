import React from 'react'
import RequestForm from './Form'

import {connect} from 'react-redux'
import { startAddRequest } from '../../actions/request'


class RequestNew extends React.Component {  
    handleSubmit = (request) => {
        
        const redirect = () => this.props.history.push('/myrequests')
        this.props.dispatch(startAddRequest(request,redirect))
    }
    
    render(){
        return (
            <div>
                <h2>Add Request</h2>
                <RequestForm handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

export default connect()(RequestNew)