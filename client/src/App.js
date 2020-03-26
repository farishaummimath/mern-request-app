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
import {Navbar,NavbarBrand,Nav,NavItem,NavbarText} from 'reactstrap'

import {connect} from 'react-redux'
import swal from 'sweetalert2'

import {startRemoveUser} from './actions/user'

function App(props) {


  return (
    <BrowserRouter>
      <>
      <Navbar color="blue" dark expand="md" className="mb-5 bg-primary">
        <NavbarBrand>Requests </NavbarBrand>
          
            {Object.keys(props.currentuser).length>0?( 

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
                  <NavbarText className="text-white">Welcome,{props.currentuser.name}</NavbarText> 
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
                          props.dispatch(startRemoveUser())
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

const mapStateToProps = (state) => {
  return {
    currentuser: state.currentuser,
    departments : state.departments,
    requests: state.requests,
    users: state.users
  }
}

export default connect(mapStateToProps)(App)