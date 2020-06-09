import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import Axios from "../../../Axios";

import * as validate from '../../Auth/validation/validation'
import Input from "../../layouts/Input/Input";


class EditeContent extends Component {
    state = {
        editeInfo: {
            title: {
                id: 1,
                inputType: 'input',
                config: {
                    placeholder: 'enter the title',
                    type: 'text',
                    name: 'title',
                    value: this.props.product.title
                },
                validator: {
                    isRequire: true
                },
                valid: true,
                isTouched: false
            },
            price: {
                id: 2,
                inputType: 'input',
                config: {
                    placeholder: 'enter the price',
                    type: 'number',
                    name: 'price',
                    value: this.props.product.price
                },
                validator: {
                    isRequire: true,
                    isNum: true
                },
                valid: true,
                isTouched: false
            },
            description: {
                id: 3,
                inputType: 'input',
                config: {
                    placeholder: 'enter the descrition',
                    type: 'text',
                    name: 'description',
                    value: this.props.product.description
                }, 
                validator: {
                    isRequire: true
                },
                valid: true,
                isTouched: false
            }
        },
        done: false,
        selectedImage: ''
    }

    onChangeHandler = (event) => {
        const name = event.target.name
        const edite = {...this.state.editeInfo}
        edite[name].config.value = event.target.value
        edite[name].isTouched = true
        edite[name].valid = validate.validate(edite[name].config.value, edite[name].validator)
        this.setState({editeInfo: edite})
    }
    onClicke = (event) => {
        event.preventDefault()
        const formData = new FormData();
        formData.append('title', this.state.editeInfo.title.config.value);
        formData.append('price', this.state.editeInfo.price.config.value);
        formData.append('description', this.state.editeInfo.description.config.value);
        formData.append('image', this.state.selectedImage);


        Axios({
            url: '/product/'+this.props.product._id,
            method: 'put',
            headers:  {'Authorization': localStorage.getItem('token')},
            data: formData
        }).then(res => {
            this.setState({done: true})
        })

    }

    onChangeFileHandler = event =>{
        this.setState({selectedImage: event.target.files[0]})
    }


    render() { 
        let formValid = true
        formValid = Object.keys(this.state.editeInfo).map(pro => {
            return this.state.editeInfo[pro].valid && formValid
        })
        let product = Object.keys(this.state.editeInfo).map(pro => {
            return <Input
                    isTouched={this.state.editeInfo[pro].isTouched}
                    isValid={this.state.editeInfo[pro].valid}
                    key={this.state.editeInfo[pro].id}
                    onChange={(event) => this.onChangeHandler(event)} 
                    {...this.state.editeInfo[pro]} />
        })
        if(this.state.done)
            return <Redirect to='/card' />
        return (
            <form onSubmit={(event) => this.onClicke(event)}>
                {product}
                <input onChange={(event) => this.onChangeFileHandler(event)} className='form-control' type='file' name='image' value={this.selectedImage}  />
                <input disabled={!formValid} className='mybtn btn btn-outline-primary' value='Edite' type='submit' />
            </form>
        )
    }
}

export default EditeContent