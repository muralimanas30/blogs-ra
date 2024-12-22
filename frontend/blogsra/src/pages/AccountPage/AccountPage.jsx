import React, { useEffect } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Account from '../../components/Account.jsx/Account'
const AccountPage = () => {
    const { authToken } = useAuthContext()
    const navigate = useNavigate()
    
    useEffect(()=>{
        if (!authToken)
            navigate('/')    
    },[])
    return (
        <Account/>
    )
}

export default AccountPage
