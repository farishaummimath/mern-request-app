import React from 'react'
// import {Link} from 'react-router-dom'
import { Table } from 'reactstrap'

import {connect} from 'react-redux'

// import { startRemoveDepartment, startAddDepartment } from '../../actions/departments'

import swal from 'sweetalert2'

class MyRequestsList extends React.Component {
    findUser(id) {
        return this.props.users.find(user => user._id == id)
    }
    render(){
        return (
            <div>
                <h2>MyRequestsList - {this.props.myRequests.length}</h2>
                   
                {this.props.myRequests.length>0 && <Table striped>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Message</th>
                    <th>Assignee</th>
                    <th>CreatedBy</th>
                    <th>CreatedAt</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                        {this.props.myRequests.map((request,index) => {
                            return (
                                <tr key={request._id}>
                                <td>{index+1}</td>
                                <td>{request.message}</td>
                                <td>{request.assignee.name ? request.assignee.name : this.findUser(request.assignee).name}</td>
                                <td>{request.createdBy.name ? request.createdBy.name : this.findUser(request.createdBy).name}</td>
                                <td>{request.createdAt}</td>
                                <td>{request.status}</td>
                            </tr>
                            )   
                                               
                        })}

           </tbody>

           </Table>}
                    
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users:state.users,
        myRequests:state.requests.filter(request=>request.createdBy == state.currentuser.id)
    }
}

export default connect(mapStateToProps)(MyRequestsList)