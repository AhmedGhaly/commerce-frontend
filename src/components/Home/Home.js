import React from 'react'
import { Link } from 'react-router-dom'

const Home = props => {
    return (
        <div className='text-center alert alert-info'>
            <h1>welcome to my app</h1>
            <br/>
            <Link to='/login'>Login</Link>
            <br/>
            <Link to='/signup'>signup</Link>
        </div>
    )
}

export default Home