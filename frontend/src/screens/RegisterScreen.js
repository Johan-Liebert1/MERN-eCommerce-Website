import React, { useState, useEffect } from 'react'
import { Col, Form, Row, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { register } from '../actions/userActions'
import FormContainer from '../components/FormContainer'
import Message from '../components/Message'
import Loader from '../components/Loader'

const RegisterScreen = ({ location, history }) => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const redirect = location.search ? location.search.split('=')[1] : '/'
    
    const dispatch = useDispatch()

    const userRegister = useSelector(state => state.userRegister)

    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])


    const submitHandler = (e) => {
        e.preventDefault()

        if (password !== confirmPassword) {
            setMessage("Password do not Match")
        }

        else 
            dispatch(register(name, email, password))
    }


    return (
        <FormContainer>
            <h3>Sign Up</h3>

            {error && <Message variant = 'danger'> {error} </Message> }
            {message && <Message variant = 'danger'> {message} </Message> }
            {loading && <Loader />}

            <Form onSubmit={submitHandler}>

                <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        type='name'
                        placeholder='Enter Name'
                        value = {name}
                        onChange ={(e) => setName(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter Email'
                        value = {email}
                        onChange ={(e) => setEmail(e.target.value)}
                    >

                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter Password'
                        value = {password}
                        onChange ={(e) => setPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Form.Group controlId='confirmPassword'>
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Confirm Password'
                        value = {confirmPassword}
                        onChange ={(e) => setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>

                <Button type = 'submit' variant = 'primary'>Register</Button>

            </Form>

            <Row className='py-3'>
                <Col>
                    Have an account? 
                    <Link to = {redirect ? `/login${redirect}`:'/login'}>
                        <span>&#9;</span> Sign In
                    </Link>
                </Col>
            </Row>

        </FormContainer>
    )
}

export default RegisterScreen
