import React from 'react'
import { Route, Redirect } from 'react-router-dom'

const confrimRouter = ({component: Component, ...rest}) => {
    return <Route  {...rest} render={props => !localStorage.getItem('confirm')?<Component {...props} />: <Redirect to='/confirm' />} />
}

export default confrimRouter