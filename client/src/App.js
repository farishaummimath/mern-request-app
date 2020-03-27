import React  from 'react'
import {BrowserRouter,Route,Link,Switch} from 'react-router-dom'


import PendingList from './components/requests/PendingList'
import ApprovedList from './components/requests/ApprovedList'
import RejectedList from './components/requests/RejectedList'
import MyRequestsList from './components/requests/MyRequestsList'
import RequestNew from './components/requests/New'
import Login from './components/user/Login'
import Home from './components/Home/Home'


import 'bootstrap/dist/css/bootstrap.min.css'
import {Navbar,NavbarBrand,Nav,NavItem,NavbarText,Button,Badge} from 'reactstrap'

import {connect} from 'react-redux'
import swal from 'sweetalert2'
import io from 'socket.io-client'
import {startRemoveUser} from './actions/user'
import {startAddRequest} from './actions/request'
// import {startSetNotification} from './actions/notifications'
const socket = io.connect('http://localhost:4002')


class App extends React.Component{
  constructor(){
    super()
    socket.on('RequestAdded', (data) => {
        console.log('RequestAdded: '+JSON.stringify(data));
        this.props.dispatch(startAddRequest(data))
      });
      socket.on('RequestApproved', (data) => {
        console.log('RequestApproved: '+JSON.stringify(data));
        //this.props.dispatch(startSetNotification(data))
      });
      socket.on('RequestRejected', (data) => {
        console.log('RequestRejected: '+JSON.stringify(data));
       // this.props.dispatch(startSetNotification(data))
      });
  }
  componentDidMount(){
    
  }
  render(){
    return (
      <BrowserRouter>
        <>
        <Navbar color="blue" dark expand="md" className="mb-5 bg-primary">
          <NavbarBrand>Requests </NavbarBrand>
            
              {Object.keys(this.props.currentuser).length>0?( 
  
                <>
                <Nav className="mr-auto" navbar>
                  <NavItem>
                    <Link className="nav-link text-white" to="/">Home</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link text-white" to="/requests/new">Form</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link text-white" to="/pending">Pending</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link text-white" to="/approved">Approved</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link text-white" to="/rejected">Rejected</Link>
                  </NavItem>
                  <NavItem>
                    <Link className="nav-link text-white" to="/myrequests">Requests for Approval</Link>
                  </NavItem>
  
                  </Nav>
                  <Nav className="ml-auto" navbar>
                    <Button color="primary">
                    Notifications <Badge color="secondary">{this.props.notifications.length}</Badge>
                    </Button>
                    <NavbarText className="text-white">Welcome,{this.props.currentuser.name}</NavbarText> 
                    <NavItem>
                      <Link className="nav-link text-white" to="/users/logout" onClick={()=>{
                        swal.fire({
                          title:"Are you sure to log out?",
                          icon:'warning',
                          buttons: true,
                          dangerMode: true
  
                        })
                        .then(confirmLogout =>{
                          if(confirmLogout) {
                            this.props.dispatch(startRemoveUser())
                            swal.fire("Successfully Logged out",{icon:"success"})
                          }
                        })
                      }}>Logout</Link>
                    </NavItem>
                  </Nav>
                </>
              ):(<>
                <Nav className="ml-auto" navbar>
                  <NavItem>
                    <Link className="nav-link text-white" to="/users/login">Login</Link>
                  </NavItem>
                </Nav>
                
              </>)
              }
        </Navbar>
        <div className ="container">
          <Switch>
            <Route path="/" component = {Home} exact ={true}/>
            <Route path="/requests/new" component= {RequestNew} exact/>
            <Route path="/pending" component={PendingList} exact={true}/>
            <Route path="/approved" component={ApprovedList}/>
            <Route path="/rejected" component={RejectedList}/>
            <Route path="/myrequests" component={MyRequestsList}/>
  
            <Route path="/users/login" component={Login} exact={true} />  
  
  
          </Switch>
        </div>
        
        </>
      </BrowserRouter>
    )
  }
  
}

const mapStateToProps = (state) => {
  return {
    currentuser: state.currentuser,
    departments : state.departments,
    requests: state.requests,
    users: state.users,
    notifications: state.notifications
  }
}

export default connect(mapStateToProps)(App)