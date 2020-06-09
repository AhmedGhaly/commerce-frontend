import React, { Component } from 'react'
import Axios from "../.././Axios";

import * as validation from '../Auth/validation/validation'
import Input from '../layouts/Input/Input'
import './admin.css'
import Spinner from '../layouts/spinner/Spinner';
class Admin extends Component {
    state = {
        product: {
            title: {
                id: 1,
                inputType: 'input',
                config: {
                    placeholder: 'enter the title',
                    value: '',
                    name: 'title',
                    type: 'text'
                },
                validation: {
                    isRequire: true
                },
                valid: false,
                isTouched: false
            },
            price:  {
                id: 2,
                inputType: 'input',
                config: {
                    placeholder: 'enter the price',
                    value: '',
                    name: 'price',
                    type: 'text'
                },
                validation: {
                    isRequire: true,
                    isNum: true
                },
                valid: false,
                isTouched: false
            },
            description:  {
                id: 3,
                inputType: 'textarea',
                config: {
                    placeholder: 'enter the description',
                    value: '',
                    name: 'description'
                },
                valid: true,
                isTouched: false
            }
        },
        loading: false,
        selectedImage: {
            value: '',
            valid: false,
            validation: {
                isRequire: true
            }
        }
    }

    onSumitHandler = event => {
        event.preventDefault()
        this.setState({loading: true})
        const formData = new FormData();
        const {title, price, description} = this.state.product
        formData.append('title', title.config.value);
        formData.append('price', price.config.value);
        formData.append('description', description.config.value);
        formData.append('image', this.state.selectedImage.value);
        Axios({
            url: '/product',
            method: 'POST',
            data: formData,
            headers: {'Authorization': localStorage.getItem('token')}
        }).then(data => {
            this.setState({loading: false})
            this.props.history.push('/card')
        }).catch(err => {
            this.setState({loading: false})
        })
    }

    onChangeHandler = event => {
        const product = {...this.state.product}
        product[event.target.name].config.value = event.target.value
        product[event.target.name].valid = validation.validate(event.target.value, product[event.target.name].validation)
        product[event.target.name].isTouched = true
        this.setState({product:product})

    }
    onChangeFileHandler = event =>{
        const image = {...this.state.selectedImage}
        image.value = event.target.files[0]
        if(image.value)
            image.valid = true
        this.setState({selectedImage: image})
        
    }
    render() {
        
        let formValid = true
        formValid = Object.keys(this.state.product).map(pro => {
             return this.state.product[pro].valid && formValid
        })
        formValid = this.state.selectedImage.valid && formValid
        let content
        let input = Object.keys(this.state.product).map(pro => {
            return <Input isValid={this.state.product[pro].valid} isTouched={this.state.product[pro].isTouched} key={this.state.product[pro].id} onChange={(event) => this.onChangeHandler(event)} {...this.state.product[pro]} />
        })
        if(this.state.loading){
            content = <Spinner />
        }else {
            content = 
            (   
                <React.Fragment>
                    {input}
                    <input onChange={(event) => this.onChangeFileHandler(event)} className='form-control' type='file' name='image' value={this.selectedImage}  />
                    <button onClick={(event) => this.onSumitHandler(event)} className='btn btn-outline-primary' disabled={!formValid}>submit</button>
                </React.Fragment>
            )
        }
        return (
            <form className='text-center form-group'>
                {content}
            </form>
        )
    }
}


export default Admin