import React from 'react'
import axios from 'axios'
import { Button, Form, FormGroup, Label, Input } from 'reactstrap'

import {connect}  from 'react-redux'


class RequestForm extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            message: props.request? props.request.message: '',
            department: props.request? props.request.department._id: '',
            users: [],
            assignee: props.request?props.request.assignee._id:''
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]:e.target.value,
        })

    }
    handleDepartmentChange = e =>{
        this.setState({
            [e.target.name]:e.target.value,
            users : this.props.users.filter(user=>user.department==e.target.value)
        })
    }
    handleAssigneeChange = e =>{
        this.setState({
            [e.target.name]:e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        const formData = {
            message: this.state.message,
            department: this.state.department,
            assignee: this.state.assignee,
        }
        this.props.handleSubmit(formData)
        console.log(formData)
    }

    
    

    render() {
        return (
            <div>
                <Form onSubmit={this.handleSubmit}>

                <FormGroup>
                    <Label htmlFor ="message">Message</Label>
                    <Input type="text" id="message" value={this.state.message} onChange={this.handleChange} name="message"/>
                </FormGroup>
                <FormGroup>
                    <Label for="department">Department</Label>
                    <Input type="select" name="department" id="department" value ={this.state.department} onChange = {this.handleDepartmentChange}>>
                        <option value =''> select department </option>
                        {
                            this.props.departments.map((dep) => {
                                return (
                                    <option key = {dep._id} value = {dep._id}>{dep.name}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
                
                <FormGroup>
                    <Label for="assignee">Select Assignee</Label>
                    <Input type="select" name="assignee" id="assignee" value ={this.state.assignee} onChange = {this.handleAssigneeChange}>
                        <option value =''> select </option>
                        {
                            this.state.users.map((user) => {
                                return (
                                    <option key = {user._id} value = {user._id}>{user.name}</option>
                                )
                            })
                        }
                    </Input>
                </FormGroup>
                 <br/>

                <Button type="submit">Submit</Button>
                </Form>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users,
        departments: state.departments.filter(department=>department._id!=state.currentuser.department),
    }
}

export default connect(mapStateToProps)(RequestForm)