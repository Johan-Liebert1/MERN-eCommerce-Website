import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addToCart } from '../actions/cartActions'


const CartScreen = ({ match, location, history }) => {
    // location is used to serach for query strings ?qty=3

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        
        if (productId) 
            dispatch(addToCart(productId, qty))

    }, [dispatch, productId, qty])

    return (
        <div>
            
        </div>
    )
}

export default CartScreen
