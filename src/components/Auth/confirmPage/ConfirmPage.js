import React, { Component } from 'react'
import Axios from '../../../Axios'
import { Link } from 'react-router-dom'

class Confirm extends Component {
    state = {
        isconfirmed: false
    }
    componentDidMount() {
        Axios.get('/confirm/'+this.props.match.params.token).then(res => {
            localStorage.setItem('confirm', 'true')
            this.setState({isconfirmed: true})
        }).catch (err => console.log(err))
    }
    render() {
        let success = (
            <div>
                <p className='alert alert-success'>your email has been confirmed, thanks!!</p>
                <Link to='/login' className='btn btn-outline-primary'> back to login page</Link>
            </div>
        )
        return this.state.isconfirmed? success : <p className='alert alert-danger'>something went wrong!!</p>
    }
}

export default Confirm