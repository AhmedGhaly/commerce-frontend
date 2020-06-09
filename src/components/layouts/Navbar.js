import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import './Navbar.css'
import { connect } from 'react-redux'

const navbar = props => {
  const onHandle = () => {
    localStorage.removeItem('token')
    // return <Redirect to='/' />
    window.location.reload();
  }
  let auth
  if(!localStorage.getItem('token')) {
    auth = 
    null
    // (
      // <React.Fragment>
      //   <li className="nav-item "><NavLink className="nav-link" exact to='/signup'>signup</NavLink></li>
      //   <li className="nav-item "><NavLink className="nav-link" exact to='/login'>login</NavLink></li>
      // </React.Fragment>
    // )
  } else {
    const dashboard = '/dashboard/' + localStorage.getItem('userId')
    auth = (
      <React.Fragment>
        <li className="nav-item "><NavLink className="nav-link" to='/card'>Home</NavLink></li>
        <li className="nav-item "><NavLink className="nav-link" exact to='/order'>Order <span className='num'>{props.ordercounter}</span></NavLink></li>
        <li className="nav-item "><NavLink className="nav-link" exact to='/admin'>add Product</NavLink></li>
        <li className="nav-item "><NavLink className="nav-link" exact to={dashboard}>dashboard</NavLink></li>
      </React.Fragment>
    )
  }
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <Link className="navbar-brand" to='/card'>my commerce</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
              {auth}
          </ul>
          <ul className="navbar-nav ml-auto">
            {localStorage.getItem("token") ? <li  className="nav-item"><button style={{border: '1px black'}} onClick={onHandle} className='navBtn nav-link'>logout</button></li> : null}
          </ul>
      </div>
    </nav>
    )
}


const mapStateToProps = state => {
  return {
    ordercounter: state.ordercounter
  }

}

export default connect(mapStateToProps)(navbar)