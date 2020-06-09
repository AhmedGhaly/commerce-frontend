import React, { Component } from 'react'
import Axios from '../../Axios'
import openSocket from 'socket.io-client'

import Prodcut from './product/product'
import Spinner from '../layouts/spinner/Spinner'

class Card extends Component {
    state = {
        loading: false,
        products: []
    }

    componentDidMount () {
        this.setState({loading: true})
        Axios.get('/').then(res => {
            // this.props.initialProducts(res.data.products)
            this.setState({loading: false, products: res.data.products})
        }).catch(err => {
            this.setState({loading: false})
        })
        const socket = openSocket("http://localhost:8080")
        socket.on('cards', data => {
            if(data.action === 'creation') {
                const product = {...this.state}
                product.products.splice(0, 0, data.product)
                // product.products.push(data.product)
                this.setState({products: product.products})
                // this.props.postProdut(data.product)
            } else if(data.action === 'delete'){
                const product = {...this.state}
                product.products.map((pro, i) => {
                    if(pro._id === data.productId) {
                        product.products.splice(i, 1)
                    }
                })
                this.setState({products: product.products})
                
                // this.props.deleteById(data.productId)
            } else if(data.action === 'edite') {
                const product = {...this.state}
                this.state.products.map((item, i) => {
                    if (item._id === data.product._id) {
                        product.products[i] = data.product
                    }
                })
                this.setState({products: product.products})
                // this.props.editeProduct(data.product)
            }
        })
    }
    onClickHandler = (productId) => {
        const data = this.state.products.find(product => product._id === productId)
        data.id = productId
        Axios.post('http://localhost:8080/order', data, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
        }).catch(err => console.log(err))

    }
    details = productId => {
        this.props.history.push('/detail/' + productId)

    }
    onDeleteHandler = (productId, productIndex) => {
        Axios.delete('/product/'+productId, {headers: {'Authorization': localStorage.getItem('token')}}).then(res => {
            const product = {...this.state}
            product.products.splice(productIndex, 1)
            this.setState({prodcuts: product.products})
        })
    }

    render() {
        let products
        if(!this.state.loading) {
            if(this.state.products.length === 0)
                products = (
                    <div className='text-center alert alert-danger'>this is no product to show</div>
                )
            else {
                products = this.state.products.map((product, i) => {   
                    const img = 'http://localhost:8080/' + product.imageUrl
                    return <Prodcut
                                delete={() => this.onDeleteHandler(product._id, i)}
                                key={product._id}
                                title={product.title}
                                productId = {product._id}
                                edite={() => this.OnEidteHandler(product._id)}
                                price={product.price}
                                image={img}
                                user={product.userId}
                                isAuth={localStorage.getItem('token')}
                                onClick={() => this.onClickHandler(product._id)}
                                />
                })
            }
        }
        else
            products = <Spinner />
    return (
        <div>
            <div className='row'>
                {products}
            </div>
        </div>
    )
    }
}

// const mapStateToProps = state => {
//     return {
//         product: state.products
//     }
// }

// const mapDispatchToProps = dispactch => {
//     return {
//         initialProducts: (product) => dispactch(actionCreator.initialProducts(product)),
//         postProdut: product => dispactch(actionCreator.addProduct(product)),
//         deleteProduct: productIndex => dispactch(actionCreator.deleteProduct(productIndex)),
//         deleteById: id => dispactch(actionCreator.deleteProductById(id)),
//         editeProduct: product => dispactch(actionCreator.editeProduct(product))
//     }
// }

export default Card