import React from "react";

import './Input.css'

const Input = props => {
    let input
    switch(props.inputType) {
        case 'input':
            input = <input onChange={props.onChange} {...props.config} className='form-control myform' />
            break
        case 'textarea': 
            input = <textarea onChange={props.onChange} className="form-control myform" {...props.config} rows="3"></textarea>
            break
        default: 
            input = <input onChange={props.onChange} {...props.config} className='form-control myform' />
            break
    }

    return (
        <React.Fragment>
            {input}
            {!props.isValid && props.isTouched? <p className='invalid'>invalid {props.config.name}</p> : null}
        </React.Fragment>
    )
}
export default Input