import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

import './App.css';
import UserRouter from './components/hoc/userRouter';
import GustRouter from './components/hoc/guestRouter';
import lazyImport from './components/hoc/lazyImport'

////////////////////////////////////////////////////////////
// download the component when the app need this

const Detail = lazyImport(() => {
  return import ('./components/Detail/Detail')
})

const Order = lazyImport(() => {
  return import ('./components/order/Order')
})

const Home = lazyImport(() => {
  return import ('./components/Home/Home')
})

const Signup = lazyImport(() => {
  return import ( './components/Auth/Signup')
})

const Login = lazyImport(() => {
  return import ('./components/Auth/login')
})

const Admin = lazyImport(() => {
  return import ('./components/admin/admin')
})

const ConfirmEmailPage = lazyImport(() => {
  return import ('./components/Auth/confirmPage/ConfirmPage')
})

const UserInfo = lazyImport(() => {
  return import ('./components/UserInfo/UserInfo')
})

const NotFound = lazyImport(() => {
  return import ('./components/NotFound/NotFound')
})

const Card = lazyImport(() => {
  return import ('./components/Cards/Card')
})

const NavBar = lazyImport(() => {
  return import ('./components/layouts/Navbar')
})

const Edite = lazyImport(() => {
  return import ('./components/Cards/Edite/Edite')

})

const ForgetPass = lazyImport(() => {
  return import ('./components/Auth/ResetPassword/ForgetPassword/ForgerPass')

})

const Dashbord = lazyImport(() => {
  return import ('./components/admin/dashbord/dashbord')

})

const ResetPassword = lazyImport(() => {
  return import ('./components/Auth/ResetPassword/ResetPage/ResetPassword')
})

////////////////////////////////////////////////////////////


class App extends Component {

  state = {
    token: null,
    counter: 0
  }

  componentDidMount () {
    const token = localStorage.getItem('token')
    this.setState({token: token})
  }

  render(){
    return (
      <React.Fragment>
      <NavBar token={this.state.token}/>
        <div className='container'>
          <Switch>
            <Route path='/card' render={(props) => <Card {...props} />} />
            <UserRouter path='/edite' component={Edite} />
            <UserRouter path='/order' component={Order} />
            <GustRouter path='/signup' component={Signup} />
            <UserRouter path='/admin' component={Admin} />
            <GustRouter path='/login' component={Login}/>
            <GustRouter path='/confirmEmail/:token' component={ConfirmEmailPage} />
            <UserRouter path='/dashboard/:userId' component={Dashbord}/>
            <UserRouter path='/userinfo/:userId' component={UserInfo}/>
            <GustRouter path='/forget' component={ForgetPass} />
            <GustRouter path='/reset/:token' component={ResetPassword} />
            <Route path='/detail/:productId' component={Detail} />
            <GustRouter exact path='/' component={Home} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </React.Fragment>
    )
  }
}

// const mapDispatchToProps = dispatch => {
//   return {
//     initialCounter: (counter) => dispatch(actionCreator.initialCounter(counter))
//   }
// }


export default App;
