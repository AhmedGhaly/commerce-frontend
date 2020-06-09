import React, { Component } from "react";
import Axios from "../../../../Axios";

import * as validate from '../../../Auth/validation/validation'
import Input from '../../../layouts/Input/Input'
class DashbordInput extends Component {
    

    state = {
        userInfo: {
            name: {
                id: 1,
                inputType: 'input',
                config: {
                    type: 'text',
                    value: this.props.users.name,
                    name: 'name',
                    placeholder: 'please enter you name'
                },
                valid: true,
                isTouched: false,
                validator: {
                    isRequire: true
                }
            },
            email: {
                id: 2,
                inputType: 'input',
                config: {
                    type: 'email',
                    value: this.props.users.email,
                    name: 'email',
                    placeholder: 'please enter you email'
                },
                valid: true,
                isTouched: false,
                validator: {
                    isRequire: true,
                    isEmail: true
                }
            }
        },
        isChange: false
    }

    onChangeHandler = e => {
        const name = e.target.name;
        this.setState({isChange: true})
        const userInfo = {...this.state.userInfo};
        userInfo[name].config.value = e.target.value;
        userInfo[name].isTouched = true
        userInfo[name].valid = validate.validate(e.target.value, userInfo[name].validator)
        this.setState({userInfo: userInfo})
    }

    onSubmitHandler = e => {
        e.preventDefault()
        const {name, email} = this.state.userInfo
        const data = {name: name.config.value, email: email.config.value}
        Axios.put('/edite/'+localStorage.getItem('userId'), data, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
            this.props.history.push('/card')
        })
    }

    render() {
        let formValid = true
        formValid = Object.keys(this.state.userInfo).map(pro => {
             return this.state.userInfo[pro].valid && formValid
        })
        let content = Object.keys(this.state.userInfo).map(input => {
            return <Input
                    isTouched={this.state.userInfo[input].isTouched}
                    onChange={(event) => this.onChangeHandler(event)}
                    key={this.state.userInfo[input].id} 
                    inputType={this.state.userInfo[input].inputType} 
                    isValid={this.state.userInfo[input].valid} 
                    {...this.state.userInfo[input]}  />
        })
        return (
            <form className='text-center' onSubmit={event => this.onSubmitHandler(event)}>
                {content}
                <input disabled={!formValid || !this.state.isChange} type='submit' value='edite' className='btn btn-outline-primary' />
            </form>
        )
    }
}

export default DashbordInput

