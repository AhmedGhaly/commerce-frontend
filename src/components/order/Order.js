import React, { Component } from 'react'
import Axios from '../../Axios'

import "./order.css";
import OrderList from './orderList/orderList'
import Spinner from '../layouts/spinner/Spinner';
class Order extends Component {
    state = {
        order: [],
        loading: true
    }
    componentDidMount() {
        if(!localStorage.getItem('token'))
            this.props.history.push('login')
        else{
            Axios.get('/order', {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {            
                this.setState({order: res.data.data, loading: false})
    
            }).catch(err => {
                this.setState({loading: false})
            })
        }

    }
    onDeleteHandler = (productId, orderIdex) => {
        Axios.delete('/order/'+productId, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
            const order = {...this.state}
            order.order.splice(orderIdex, 1)
            this.setState({order: order.order})
        })
    }


    deleteOrder = (orderIdex) => {
        const order = {...this.state}
        order.order.splice(orderIdex, 1)
        this.setState({order: order.order})
    }
    render() {
        let totalPrice = 0
        let data = this.state.order.map((order, i) => {
            totalPrice += (order.amount * order.price)
            return <OrderList delete={() => this.onDeleteHandler(order.productId, i)} amount={order.amount} key={order._id} title={order.title} description={order.description} price={order.price} />
        })
        let content
        if(this.state.loading)
            content = <Spinner />
        else {
            if(this.state.order.length === 0)
                content = <h1 className='text-center'>there is no order to show</h1>
            else {
                content = (
                    <div>
                        {data}
                        <h1 className='text-center total'>{totalPrice}$$</h1>
                    </div>
                )
            }
        }
       return content
    }
}


export default Order