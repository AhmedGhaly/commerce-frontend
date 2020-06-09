import React, { Component } from 'react'
import Axios from '../../Axios'

import UserInput from './UserInput'
import Spinner from '../layouts/spinner/Spinner'

class UserInfo extends Component {

    state = {
        user: null,
        loadin: false,
    }

    componentDidMount() {
        this.setState({loadin: true})
        Axios.get ('/user/'+this.props.match.params.userId).then(res => {
            this.setState({user: res.data.user, loadin: false})
        })
    }

    render() {
        if(this.state.user) {
            return <UserInput user={this.state.user} />
        } else return <Spinner />
    }
}

export default UserInfo