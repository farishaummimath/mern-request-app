import React from 'react'
import RequestForm from './Form'

import {connect} from 'react-redux'
import { startAddRequest } from '../../actions/request'
import io from 'socket.io-client'


const socket = io.connect('http://localhost:4002')

class RequestNew extends React.Component {  
    constructor(){
        super()
        // socket.on('RequestAdded', (data) => {
        //     console.log('Added: '+JSON.stringify(data));
        //     this.props.addRequest(data);
        //   });

    }
    handleSubmit = (request) => {
        
        const redirect = () => this.props.history.push('/myrequests')
        socket.emit('addRequest', request);
        redirect()
        // this.props.dispatch(startAddRequest(request,socket,redirect))
       
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