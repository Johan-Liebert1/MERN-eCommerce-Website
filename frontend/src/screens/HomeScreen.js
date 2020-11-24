import React, {useEffect} from 'react'
import { Col, Row } from 'react-bootstrap'

// these are hooks
import { useDispatch, useSelector } from 'react-redux'
import { listProducts } from '../actions/productActions'

import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'

const HomeScreen = () => {
    const dispatch = useDispatch()

    // as we want to get productList from the store
    const productList = useSelector(state => state.productList)

    const { loading, error, products } = productList

    useEffect(() => {
        dispatch(listProducts())
    }, [dispatch])


    return (
        <>
            <h3>Latest Products</h3>

            {loading ? <Loader /> : error ? <Message variant = 'danger'>{error}</Message> : (

            <Row>
                {products.map(p => (
                    <Col key={p._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product = {p}/>
                    </Col>
                ))}
            </Row>
            
            )}
        </>
    )
}

export default HomeScreen
