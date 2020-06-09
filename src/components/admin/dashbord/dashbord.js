import React, { Component } from "react";
import Axios from "../../../Axios";

import DashbordInput from "./dashbordiputs/dashbordinput";
import Spinner from "../../layouts/spinner/Spinner";
class Dashbord extends Component {
    

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
           return <DashbordInput users={this.state.user} {...this.props} />
       } else return <Spinner />
    }
}

export default Dashbord

