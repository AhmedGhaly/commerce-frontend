import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const gustRouter = ({component:Component, ...rest}) => {
return <Route  {...rest} render={props => !localStorage.getItem('token')?<Component {...props} />: <Redirect to='/card' />} />
}

export default gustRouter