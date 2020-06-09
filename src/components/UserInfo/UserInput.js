import React from 'react'

const userInput = props => {
    return (
        <div>
            <h1>{props.user.name}</h1>
            <h1>{props.user.email}</h1>
        </div>
    )
}

export default userInput