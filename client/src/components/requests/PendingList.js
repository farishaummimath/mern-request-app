import React from 'react'
import { Table,Button } from 'reactstrap'

import {connect} from 'react-redux'

import { startApproveRequest, startRejectRequest } from '../../actions/request'

import swal from 'sweetalert2'

class PendingList extends React.Component {


  handleApprove = (req) =>{
    swal.fire({
        title: "Are you sure you want to Approved?",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      })
      .then((confirmDelete) => {
        if (confirmDelete) {
          swal.fire("Successfully Approved!!", {
            icon: "success",
          });
          const redirect = () => this.props.history.push('/pending')
          this.props.dispatch(startApproveRequest(req,redirect))
        } 
      })}
      handleReject = (req) =>{
        swal.fire({
            title: "Are you sure you want to reject?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((confirmDelete) => {
            if (confirmDelete) {
              swal.fire("Successfully Rejected!!", {
                icon: "success",
              });
              const redirect = () => this.props.history.push('/pending')
              this.props.dispatch(startRejectRequest(req,redirect))
            } 
          })}
        findUser(id) {
            return this.props.users.find(user => user._id == id)
       }
        
    render(){
        return (
           
            <div>
            <h2>Pending request - {this.props.pendingRequests.length}</h2>
            {this.props.pendingRequests.length>0 && <Table striped>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Message</th>
                    <th>CreatedBy</th>
                    <th>Assignee</th>
                    <th>Created Date</th>
                    <th>Actions</th>
                    <th>Reject</th>
                </tr>
            </thead>
            <tbody>
                        {this.props.pendingRequests.map((request,index) => {
                             
                            return (
                                <tr key={request._id}>
                                <td>{index+1}</td>
                                <td>{request.message}</td>
                                <td>{request.createdBy.name ? request.createdBy.name : this.findUser(request.createdBy).name}</td>
                                <td>{request.assignee.name ? request.assignee.name : this.findUser(request.assignee).name}</td>
                                <td>{request.createdAt.toLocaleString()}</td>
                                <td>{request.assignee==this.props.currentuser.id?(<Button color="info" onClick = {()=>{
                                     this.handleApprove(request)
                                }}>Approve</Button>):null}</td>
                                 <td>{request.assignee==this.props.currentuser.id?(<Button color="danger" onClick = {()=>{
                                     this.handleReject(request)
                                }}>Reject</Button>):null}</td>
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
        currentuser: state.currentuser,
        users: state.users,
        pendingRequests:state.requests.filter(request=>request.status=='Pending' && request.department == state.currentuser.department)
    }
}

export default connect(mapStateToProps)(PendingList)