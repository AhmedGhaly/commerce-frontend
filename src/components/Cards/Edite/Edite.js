import React, { Component } from "react";
import Axios from "../../../Axios";


import EditeContent from "./EditeContent";
import Spinner from "../../layouts/spinner/Spinner";

class Edite extends Component {
    state = {
        product: null,
    }
    componentDidMount() {
        Axios.get('/product/'+this.props.location.search.split('=')[1]).then(res => {
            this.setState({product: res.data.product})
        })
    }

    render() {
        if(this.state.product)
            return <EditeContent product={this.state.product}/>
        else
        return <Spinner />
    }
}


export default Edite