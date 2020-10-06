const initialState = {
    products: []
}

export const productListReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'PRODUCT_LIST_REQUEST':
            return { loading: true, products : [] }
        
        case 'PRODUCT_LIST_SUCCESS':
            return { loading : false, products : action.payload }

        case 'PRODUCT_LIST_FAIL':
            // here we'll send the error in the action.payload
            return { loading : false, error : action.payload }

        default:
            return state
    }
}

export const productDetailsReducer = (state = {product: { reviews : [] }}, action) => {
    switch (action.type) {
        case 'PRODUCT_DETAILS_REQUEST':
            return { loading: true, ...state }
        
        case 'PRODUCT_DETAILS_SUCCESS':
            return { loading : false, product : action.payload }

        case 'PRODUCT_DETAILS_FAIL':
            // here we'll send the error in the action.payload
            return { loading : false, error : action.payload }

        default:
            return state
    }
}