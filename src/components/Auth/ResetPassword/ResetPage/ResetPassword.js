import React, { Component } from 'react'

import * as validate from '../../validation/validation'
import Input from '../../../layouts/Input/Input'
import Axios from '../../../../Axios'
import Spinner from '../../../layouts/spinner/Spinner'

class ResetPassword extends Component {

    state = {
        passwords: {
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
            confirmpassword: {
                id: 2,
                inputType: 'input',
                config: {
                    placeholder: 'confirm password',
                    type: 'password',
                    name: 'confirmpassword',
                    value: ''
                },
                valid: true,
                isTouched: false
            }
        },
        loading: false
    }

    onChangeHandler = e => {
        const passwords = {...this.state.passwords}
        const name = e.target.name
        passwords[name].config.value = e.target.value
        passwords[name].isTouched = true
        passwords[name].valid = validate.validate(passwords[name].config.value, passwords[name].validator)
        this.setState({passwords: passwords})
    }

    onSubmit = e => {
        e.preventDefault()
        this.setState({loading: true})
        const data = {
            pass: this.state.passwords.password.config.value,
            confirmpass: this.state.passwords.confirmpassword.config.value
        }
        Axios.post('/restpassword/'+this.props.match.params.token, data).then(res => {
            this.props.history.push('/login')
            this.setState({loading: false})
        }).catch(err => {
            this.setState({loading: false})
            console.log(err)
        })
    }

    render() {
        let confirm = (this.state.passwords.password.config.value === this.state.passwords.confirmpassword.config.value)
        let input = Object.keys(this.state.passwords).map(prop => {
            return <Input 
                    isTouched={this.state.passwords[prop].isTouched}
                    isValid={this.state.passwords[prop].valid}
                    key={this.state.passwords[prop].id}
                    {...this.state.passwords[prop]}
                    onChange={(event) => this.onChangeHandler(event)} />
        })
        if(!this.state.loading) {
            return(
                <form onSubmit={(event) => this.onSubmit(event)}>
                    {input}
                    {!confirm ? <p style={{color : "#c13a3a"}}>not mathed</p> : null}
                    <input disabled={!(this.state.passwords.password.valid && this.state.passwords.confirmpassword.valid && confirm)} className='btn btn-outline-primary' type='submit' value='Reset Password' />
                </form>
            )
        } else return <Spinner />
    }
}
export default ResetPassword