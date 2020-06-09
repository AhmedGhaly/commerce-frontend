import React from 'react'

import './product.css'
import { Link } from 'react-router-dom'
const product = props => {
    const admin = (
        <React.Fragment>
        <div className='col-lg-5'>
            <button onClick={props.delete} className="btn btn-outline-danger">Delete</button>
        </div>
        <div className='col-lg-5'>
            <button onClick={props.edite} className="btn btn-outline-primary">Edite</button>
        </div>
        </React.Fragment>
    )
    let url
    if(localStorage.getItem('userId') === props.user._id) {
        url = '/dashboard/' + props.user._id
    } else url = '/userinfo/' + props.user._id

    return (
        <div className="card col-sm-3">
            <div className="card-body">
                <img className='card-img-top image' src={props.image} alt='...' />
                <Link className='text-center' to={`/edite?id=${props.productId}`}>{props.title}</Link>
                {/* <p className="text-center card-title"></p> */}
                <p>{props.price} $$</p>
                {/* {props.user? <p>created by: <Link to={url}>{props.user.name}</Link> </p>  :null} */}
                <div className='row'>
                    <div className='col-lg-2'>
                    <i onClick={props.onClick} className="addToCard fa fa-shopping-cart fa-2x" aria-hidden="true"></i>
                        {/* <input type='submit'  className="my btn btn-outline-success" /> */}
                    </div>
                    {props.isAuth && localStorage.getItem('userId') === props.user._id?admin:null}
                </div>
            </div>
        </div>
    )
}

export default product