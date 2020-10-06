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
            quantity
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