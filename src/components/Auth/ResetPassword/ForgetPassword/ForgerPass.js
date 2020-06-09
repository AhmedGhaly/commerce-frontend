import React, { Component } from 'react'
import Input from '../../../layouts/Input/Input'

import * as validate from '../../validation/validation'
import Axios from 'axios'
import { Link } from 'react-router-dom'

class ForgetPass extends Component {

    state = {
        email: {
            inputType: 'input',
            config: {
                placeholder: 'enter the email',
                type: 'email',
                name: 'email',
                value: ''
            },        
            validator: {
                isRequire: true,
                isEmail: true
            },
            valid: false,
            isTouched: false
        },
        checkEmail: false
    }
    onSubmit = e => {
        e.preventDefault()
        Axios.post('http://localhost:8080/forget', {email: this.state.email.config.value}).then(res => {
            console.log(res.data)
            this.setState({checkEmail: true})
            // this.props.history.push('/reset/'+res.data.user.passwordToken)
        })
    }
    onChange = event => {
        const emailInput = {...this.state.email}
        emailInput.config.value = event.target.value
        emailInput.isTouched = true
        emailInput.valid = validate.validate(emailInput.config.value, emailInput.validator)
        this.setState({email: emailInput})    
    }

    render() {


        return(
            <form onSubmit={(event) => this.onSubmit(event)}>
                {this.state.checkEmail? <p className='text-center alert alert-info'>please check your email <br/> Back to<Link to='/login'> login </Link>page</p> : null}
                <Input 
                    {...this.state.email}
                    onChange={(event) => this.onChange(event)}
                    isTouched={this.state.email.isTouched}
                    isValid={this.state.email.valid} />
                    <input disabled={!this.state.email.config.value} className='btn btn-outline-primary' type='submit' value='Reset' />
            </form>
        )
    }
}
export default ForgetPass