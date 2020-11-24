import React, {useEffect} from 'react'
import { Col, ListGroup, Row, Image, Card, Button } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import CheckoutSteps from '../components/CheckoutSteps'
import Message from '../components/Message'
import { createOrder } from '../actions/orderActions'

const PlaceOrderScreen = ({ history }) => {
    const dispatch = useDispatch()
    
    const cart = useSelector(state => state.cart)

    const addDecimals = (number) => {
        return (Math.round(number * 100) / 100).toFixed(2)
    }
    // calculate prices
    cart.itemsPrice = addDecimals(cart.cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0))
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 30)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (Number(cart.itemsPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)

    const orderCreate = useSelector(state => state.orderCreate)
    const { success, order, error } = orderCreate

    useEffect(() => {
        if (success) {
            history.push(`/order/${order._id}`)
            dispatch({ type: 'ORDER_CREATE_RESET' })
        }

        //eslint-disable-next-line
    }, [history, success])

    const placeOrderHandler = () => {
        const orderData = {
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice,
        }

        console.log(orderData)

        dispatch(createOrder(orderData))

    }

    return (
        <>
            <CheckoutSteps step1 step2 step3 step4 />
            <Row>
            <Col md={8}>

                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h4>Shipping</h4>
                        <p>
                            <strong>Address: </strong>
                            {cart.shippingAddress.address}, {cart.shippingAddress.city}, {cart.shippingAddress.postalCode}, {cart.shippingAddress.country}
                        </p>
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h4>Payment Method</h4>
                        <strong>Method: </strong>
                        {cart.paymentMethod}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h4>Order Items</h4>
                        {cart.cartItems.length === 0 ? <Message>Your Cart is Empty</Message> : (

                            <ListGroup variant = 'flush'>
                                {cart.cartItems.map((item, index) => (
                                    <ListGroup.Item key = {index}>
                                        <Row>

                                            <Col md={1}>
                                                <Image src = {item.image} alt={item.name} fluid />
                                            </Col>

                                            <Col>
                                                <Link to = {`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>

                                            <Col md={4}>
                                                {item.quantity} x ${item.price} = ${(item.quantity * item.price).toFixed(2)}
                                            </Col>

                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>

                        )}
                    </ListGroup.Item>

                </ListGroup>

            </Col>

            <Col md={4}>

                <Card>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>Order Summary</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>${cart.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>${cart.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>${cart.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>


                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>${cart.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            {error && <Message variant='danger'>{error}</Message> }
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Button 
                                type='button' 
                                className='btn-block'
                                disabled = {cart.cartItems === 0}
                                onClick = {placeOrderHandler}
                            >Place Order</Button>

                        </ListGroup.Item>

                    </ListGroup>
                </Card>

            </Col>

            </Row>
        </>
    )
}

export default PlaceOrderScreen
