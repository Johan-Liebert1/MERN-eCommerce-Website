import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Product from '../components/Product'
import { Link } from 'react-router-dom'

import { Col, Row, Image, ListGroup, Card, Button } from 'react-bootstrap'
import Rating from '../components/Rating'

const ProductScreen = ({ match }) => {
    const [product, setProduct] = useState({})

    useEffect(() => {

        const fetchProduct = async () => {
            const id = match.params.id

            const { data } = await axios.get(`/api/products/${id}`)
            
            setProduct(data)
        }

        fetchProduct()

    }, [match])


    return (
        <>
            <Link className = 'btn btn-primary my-3' to = '/'>
                Go Back
            </Link>

            <Row>
                <Col md={6}>
                    <Image src = {product.image} alt = {product.name} fluid/>
                </Col>

                <Col md={3}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h4>{product.name}</h4>
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <Rating 
                                value = {product.rating} 
                                text = {`${product.numReviews} reviews`}
                            />
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Price : ${product.price}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            Description : ${product.description}
                        </ListGroup.Item>

                    </ListGroup>
                </Col>

                <Col md={3}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Price : 
                                    </Col>
                                    <Col>
                                        <strong>${product.price}</strong>
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Row>
                                    <Col>
                                        Status : 
                                    </Col>
                                    <Col>
                                        {product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
                                    </Col>
                                </Row>
                            </ListGroup.Item>

                            <ListGroup.Item>
                                <Button 
                                    className='btn-block btn-success' 
                                    type = 'button'
                                    disabled = {product.countInStock === 0}
                                >
                                    Add to Cart
                                </Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default ProductScreen
