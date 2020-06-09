import React, { Component } from 'react'
import Axios from '../../Axios';

import './auth.css'
import * as validate from './validation/validation'
import Input from '../layouts/Input/Input'
import Spinner from '../layouts/spinner/Spinner';

class Signup extends Component {
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
                    isRequire: true,
                    minLength: 5
                },
                valid: false,
                isTouched: false
            },
            name: {
                id: 3,
                inputType: 'input',
                config: {
                    placeholder: 'enter the name',
                    type: 'text',
                    name: 'name',
                    value: ''
                },
                validator: {
                    isRequire: true
                },
                valid: false,
                isTouched: false
            }
        },
        loaddin: false
    }
    onsubmitHandler = (event) => {
        event.preventDefault()
        this.setState({loaddin: true})
        const { email, name, password } = this.state.userInfo
        const data = {email: email.config.value
            , password: password.config.value
            , name: name.config.value}
        Axios.post('/signup', data).then(res => {
            this.setState({loaddin: false})
            this.props.history.push('/login')
        }).catch(err => {
            this.setState({loaddin: false})
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
        let formValid = true
        formValid = Object.keys(this.state.userInfo).map(pro => {
             return this.state.userInfo[pro].valid && formValid
        })
        let input = Object.keys(this.state.userInfo).map(prop => {
            return <Input isTouched={this.state.userInfo[prop].isTouched} isValid={this.state.userInfo[prop].valid} key={this.state.userInfo[prop].id} {...this.state.userInfo[prop]} onChange={(event) => this.onChangeHandler(event)} />
        })
        let content
        if(this.state.loaddin)
            content = <Spinner />
        else {
            content = (
            <React.Fragment>
                {input}
                <input className='mybtn btn btn-outline-primary' value='signup' type='submit' disabled={!formValid} />
            </React.Fragment>
            )
        }
        return (
            <form onSubmit={(event) => this.onsubmitHandler(event)} className='text-center'>
                {content}
            </form>
        )
    }
}

export default Signup