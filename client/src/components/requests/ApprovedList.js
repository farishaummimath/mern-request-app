import React from 'react'
import { Table,Button } from 'reactstrap'

import {connect} from 'react-redux'

// import { startRemoveDepartment, startAddDepartment } from '../../actions/departments'

import swal from 'sweetalert2'

class ApprovedList extends React.Component {
    findUser(id) {
        return this.props.users.find(user => user._id == id)
    }
    render(){
        return (
            <div>
                <h2>Approved - {this.props.approvedRequests.length}</h2>
                {this.props.approvedRequests.length>0 && <Table striped>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Message</th>
                    <th>CreatedBy</th>
                    <th>CreatedAt</th>
                </tr>
            </thead>
            <tbody>
                        {this.props.approvedRequests.map((request,index) => {
                            return (
                                <tr key={request._id}>
                                <td>{index+1}</td>
                                <td>{request.message}</td>
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
        users: state.users,
        approvedRequests:state.requests.filter(request=>request.status=='approved' && request.department == state.currentuser.department )
    }
}

export default connect(mapStateToProps)(ApprovedList)