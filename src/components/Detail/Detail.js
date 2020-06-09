import React, { Component } from 'react'
import Axios from '../../Axios'
import Spinner from '../layouts/spinner/Spinner'
import { Link } from 'react-router-dom'

import './Detail.css'

class Detail extends Component {
    state = {
        product: null
    }
    componentDidMount() {
        const productId = this.props.match.params.productId
        Axios.get('/product/' + productId).then(res => {
            this.setState({product: res.data.product})
        })
    }
    render() {
         
        let content
        if(this.state.product) {
            const img = 'http://localhost:8080/' + this.state.product.imageUrl
            content = (
                <React.Fragment>
                    <h1 className='text-center'>{this.state.product.title}</h1>
                    <div className='row'>
                        <div className='col-6'>
                            <h3>{this.state.product.price} $$</h3>
                            {this.state.product.description}

                        </div>
                        <div className='col-6'>
                            <p>created by: <Link to={`/userinfo/${this.state.product.userId._id}`}>{this.state.product.userId.name}</Link></p>
                           <img alt='...' className='imag' src={img} />
                        </div>
                    </div>
                </React.Fragment>
            )
        } else
            content = <Spinner />
        return (
            <div>
                {content}
            </div>
        )
    }
}
export default Detail