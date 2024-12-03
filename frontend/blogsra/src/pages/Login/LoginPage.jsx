import React from 'react'
import Login from '../../components/Login/Login'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import './LoginPage.css'
export default function LoginPage() {
    const {authToken}=useAuthContext()
    const navigate = useNavigate()
    if(authToken)
        navigate('/')
    return (
        <div className='login-container'>
            <Login/>
        </div>
    )
}
