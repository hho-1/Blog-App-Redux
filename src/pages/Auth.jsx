import React from 'react'
//import RegisterForm from '../components/auth/RegisterForm'
import LoginForm from '../components/auth/LoginFrom'
import { Box } from '@mui/material'
import RegisterForm from '../components/auth/RegisterForm'

const Auth = ({authType, setAuthType}) => {

  return (
    <>
        {
            authType === 'login' ? 
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                    margin='auto'
                >
                    <LoginForm setAuthType={setAuthType}/>
                </Box>
            :
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    minHeight="90vh"
                    width="500px"
                    margin='auto'
                >
                    <RegisterForm setAuthType={setAuthType}/>
                </Box>
        }       
    </>
  )
  
}

export default Auth