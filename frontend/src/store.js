import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

import {productDetailsReducer, productListReducer} from './reducers/productReducers'
import { cartReducer } from './reducers/cartReducers'
import { userDetailsReducer, userLoginReducer, userRegisterReducer, userUpdateProfileReducer } from './reducers/userReducers'

// the naming convetion used here is nameOfState : nameOfReducer associated with that state
// example productList, productDetails and cart are states 
const reducer = combineReducers({
    productList : productListReducer,
    productDetails : productDetailsReducer,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister : userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems') 
    ? JSON.parse(localStorage.getItem('cartItems')) : []

const userInfoFromStorage = localStorage.getItem('userInfo') 
    ? JSON.parse(localStorage.getItem('userInfo')) : null

const shippingAddressFromStorage = localStorage.getItem('shippingAddress') 
    ? JSON.parse(localStorage.getItem('shippingAddress')) : {}

const initialState = {
    cart : { 
        cartItems : cartItemsFromStorage, 
        shippingAddress: shippingAddressFromStorage 
    },
    
    userLogin: { userInfo : userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer, 
    initialState, 
    composeWithDevTools(applyMiddleware(...middleware)) // in order to use redux-thunk
)

export default store
