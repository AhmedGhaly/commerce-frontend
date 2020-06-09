import React from 'react'

import './orderList.css'
const orderList = props => {
    return (
        <div className='card row'>
            <h1>{props.title}</h1>
            {/* <p>{props.description}</p> */}
            <p className='price_product'>${props.price}</p>
            <p>{props.amount}</p>
            <button onClick={props.delete} className='btn btn-outline-danger'> Delete </button>

        </div>
    )
}

export default orderList