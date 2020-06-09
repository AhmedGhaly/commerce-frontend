import * as actionType from './actionType'

export const addProduct = (product) => {
    return {
        type: actionType.ADD_PRODUCT,
        product: product
    }
}
export const initialProducts = product => {
    return {
        type: actionType.INITIAL_PRODUCT,
        product: product
    }
}

export const deleteProduct = productIndex => {
    return {
        type: actionType.DELETE_PRODUCT,
        productIndex: productIndex
    }
}

export const deleteProductById = productId => {
    return {
        type: actionType.DELETE_PRODUCT_BY_ID,
        productId: productId
    }
}

export const editeProduct = product => {
    return {
        type: actionType.EDITE_PRODUCT,
        product: product
    }
}

