import React from 'react'
import { Table } from 'reactstrap'

import {connect} from 'react-redux'
import currentUserReducer from '../../reducers/user'

// import { startRemoveDepartment, startAddDepartment } from '../../actions/departments'
class RejectedList extends React.Component {
    findUser(id) {
        return this.props.users.find(user => user._id == id)
    }
    render(){
        return (
            <div>
                <h2>Rejected List - {this.props.rejectedRequests.length}</h2>
                   
                {this.props.rejectedRequests.length>0 && <Table striped>
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Message</th>
                        <th>Assignee</th>
                        <th>CreatedBy</th>
                        <th>CreatedAt</th>
                    </tr>
                </thead>
                <tbody>
                            {this.props.rejectedRequests.map((request,index) => {
                                return (
                                    <tr key={request._id}>
                                    <td>{index+1}</td>
                                    <td>{request.message}</td>
                                    <td>{request.assignee.name ? request.assignee.name : this.findUser(request.assignee).name}</td>
                                    <td>{request.createdBy.name ? request.createdBy.name : this.findUser(request.createdBy).name}</td>
                                    <td>{request.createdAt}</td>
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
        rejectedRequests:state.requests.filter(request=>request.status=='Rejected' && request.department == state.currentuser.department)
    }
}

export default connect(mapStateToProps)(RejectedList)