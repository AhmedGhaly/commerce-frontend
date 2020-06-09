import React, { Component } from 'react'

import './auth.css'
import * as validate from './validation/validation'
import Input from '../layouts/Input/Input'
import Axios from '../../Axios'
import { Link } from 'react-router-dom'


class Login extends Component {
    state = {
        userInfo: {
            email:  {
                id: 2,
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
            password: {
                id: 1,
                inputType: 'input',
                config: {
                    placeholder: 'enter the password',
                    type: 'password',
                    name: 'password',
                    value: ''
                },
                validator: {
                    isRequire: true
                },
                valid: false,
                isTouched: false
            }
        }
    }

    onLoginHandler = (event, userInfo, props) => {
        event.preventDefault()
        const userInf = {email: userInfo.email.config.value, password: userInfo.password.config.value}
        Axios.post('/login', userInf).then(res => {
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('userId', res.data.userId)
            console.log(res.data)
            window.location.reload()
        }).catch(err => {
        })

    }

    
    onChangeHandler = (event) => {
        const name = event.target.name
        const userInfo = {...this.state.userInfo}
        userInfo[name].config.value = event.target.value
        userInfo[name].isTouched = true
        userInfo[name].valid = validate.validate(userInfo[name].config.value, userInfo[name].validator)
        this.setState({userInfo: userInfo})
    }

    render() {

        let input = Object.keys(this.state.userInfo).map(prop => {
            return <Input 
                    isTouched={this.state.userInfo[prop].isTouched}
                    isValid={this.state.userInfo[prop].valid}
                    key={this.state.userInfo[prop].id}
                    {...this.state.userInfo[prop]}
                    onChange={(event) => this.onChangeHandler(event)} />
        })

        return (
            <React.Fragment>
                <form onSubmit={(event) => this.onLoginHandler(event, this.state.userInfo, {...this.props})}  className='text-center'>
                {input}
                    <input className='mybtn btn btn-outline-primary' value='login' type='submit' />
                    <br/>
                    <Link to='/signup'>signup</Link><br/>
                    <Link to='/forget'>forget your password</Link>
                </form>
            </React.Fragment>
        )
    }
}


export default Login