import React from 'react'
import { Link } from 'react-router-dom'

const notFound = props => {
    return(
        <h1 className='alert alert-info text-center'>
            this page not found <br/>
            back to the <Link to='/card'>home page</Link>
        </h1>
    )
}

export default notFound