import React, {useRef, useState} from 'react'
import {Form, Button, Card, Alert} from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const {currentUser, updateEmail, updatePassword} = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e){
        e.preventDefault()

        if(passwordRef.current.value !== passwordConfirmRef.current.value){
            return setError('Passwords do not match')
        }

        const promises = []
        if(emailRef.current.value !== currentUser.email){
            promises.push(updateEmail(emailRef.current.value))
        }
        if(passwordRef.current.value){
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(()=>{
            navigate('/')
        }).catch(()=>{setError("Failed to update account")})
        .finally(()=>{
            setLoading(false)
        })

        try{
            setError('')
            setLoading(true)
            // await signup(emailRef.current.value, passwordRef.current.value)
        }
        catch{
            setError("Failed to create an Account")
        }
        setLoading(false)

    }

  return (
    <>
        <Card>
            <Card.Body>
                <h2 className="text-center mb-4">Update Profile</h2>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id="email">
                            <Form.Label>Email:</Form.Label>
                            <Form.Control type="email" ref={emailRef} required defaultValue={currentUser.email}/>
                        </Form.Group>

                        <Form.Group id="password">
                            <Form.Label>Passwsord:</Form.Label>
                            <Form.Control type="password" ref={passwordRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>

                        <Form.Group id="password-confirm">
                            <Form.Label>Password Confirmation:</Form.Label>
                            <Form.Control type="password" ref={passwordConfirmRef} placeholder="Leave blank to keep the same"/>
                        </Form.Group>

                        <Button disabled={loading} className="w-100 mt-4 mb-3" type="submit">Update</Button>
                    </Form>
            </Card.Body>
        </Card>
        <div className='w-100 text-center mt-2'>Already have an Account? <Link to="/">Cancel</Link></div>
    </>
  )
}