import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap';

import { useDispatch, useSelector } from "react-redux";
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';
import FormContainer from '../components/FormContainer';

const ShippingScreen = ({ history }) => {

    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart

    const dispatch = useDispatch()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(saveShippingAddress({ address, city, postalCode, country }))
        history.push('/payment')
    }

    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h3>Shipping</h3>

            <Form onSubmit ={submitHandler}>

                <Form.Group controlId='address'>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Shipping Address'
                        value = {address}
                        onChange ={(e) => setAddress(e.target.value)}
                        required
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='city'>
                    <Form.Label>City</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='City'
                        value = {city}
                        onChange ={(e) => setCity(e.target.value)}
                        required
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='postalcode'>
                    <Form.Label>Postal Code</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Enter Postal Code'
                        value = {postalCode}
                        onChange ={(e) => setPostalCode(e.target.value)}
                        required
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='country'>
                    <Form.Label>Country</Form.Label>
                    <Form.Control
                        type='text'
                        placeholder='Country'
                        value = {country}
                        onChange ={(e) => setCountry(e.target.value)}
                        required
                    >

                    </Form.Control>
                </Form.Group>


                <Button type = 'submit' variant = 'secondary'>Proceed</Button>

            </Form>

        </FormContainer>
    )
}

export default ShippingScreen
