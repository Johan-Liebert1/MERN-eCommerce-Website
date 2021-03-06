import axios from 'axios'

export const addToCart = (id, quantity) => async (dispatch, getState) => {
    // get state gives access to the entire state tree

    const { data } = await axios.get(`/api/products/${id}`)

    dispatch({
        type: 'CART_ADD_ITEM',
        payload : {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock : data.countInStock,
            qty:quantity,
            paymentMethod: data.paymentMethod
        }
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => async (dispatch, getState) => {
    dispatch({
        type: 'CART_REMOVE_ITEM',
        payload: id
    })

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => async (dispatch) => {
    dispatch({
        type: 'CART_SAVE_SHIPPING_ADDRESS',
        payload: data
    })

    localStorage.setItem('shippingAddress', JSON.stringify(data))
}

export const savePaymentMethod = (paymentMethod) => async (dispatch) => {
    dispatch({
        type: 'CART_SAVE_PAYMENT_METHOD',
        payload: paymentMethod
    })

    localStorage.setItem('paymentMethod', JSON.stringify(paymentMethod))
}