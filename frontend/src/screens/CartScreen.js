import React, { useEffect } from 'react'
import { Col, Image, ListGroup, Row, Form, Button, Card } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addToCart, removeFromCart } from '../actions/cartActions'
import Message from '../components/Message'


const CartScreen = ({ match, location, history }) => {
    // location is used to serach for query strings ?qty=3

    const productId = match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]) : 1

    const dispatch = useDispatch()

    const cart = useSelector(state => state.cart)

    const { cartItems } = cart

    useEffect(() => {

        if (productId) 
            dispatch(addToCart(productId, qty))

    }, [dispatch, productId, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        history.push('/login?redirect=shipping')
    }

    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0)

    return (
        <Row>
            <Col md = {8}>
                <h3>Shopping Cart</h3>

            {
                cartItems.length === 0 ? (
                <Message variant='primary'>Your Cart is Empty <Link to = '/'>Go Back</Link> </Message>
                ) 
                :
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key = {item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src = {item.image} fluid rounded />
                                </Col>

                                <Col md={3}>
                                    <Link to = {`/product/${item.product}`}>{item.name}</Link>
                                </Col>

                                <Col md={2}>${item.price}</Col>

                                <Col md={2}>
                                    <Form.Control 
                                        as = 'select' 
                                        value = {item.qty} 
                                        onChange={(e) => 
                                            dispatch(addToCart(item.product, Number(e.target.value))
                                        )}
                                    >
                                    {[...Array(item.countInStock).keys()].map(key => (
                                        <option key = {key + 1} value = {key + 1}>
                                            {key + 1}
                                        </option>
                                    ))}
                                    </Form.Control>
                                </Col>
                                <Col md={2}>
                                    <Button 
                                        type = 'button' 
                                        variant='danger' 
                                        onClick = {() => removeFromCartHandler(item.product)}
                                    ><i className='fas fa-trash'></i></Button>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }

            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant = 'flush'>
                        <ListGroup.Item>
                             <h4> 
                                SUBTOTAL 
                                ({totalItems}) ITEMS 
                            </h4>
                            ${cartItems.reduce((acc, curItem) => acc + curItem.quantity * curItem.price, 0)
                                .toFixed(2)
                            }
                        </ListGroup.Item>
                        
                        <ListGroup.Item>
                            <Button 
                                className='btn-block' 
                                disabled={cartItems.length === 0} 
                                onClick={checkoutHandler}>
                                    Proceed to Checkout
                            </Button>
                        </ListGroup.Item>

                    </ListGroup>
                </Card>
            </Col>

        </Row>
    )
}

export default CartScreen
