import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Link, Typography, Box, Container } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import useAuthCall from '../../hooks/useAuthCall';

const validationSchema = yup.object({
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required'),
});

const LoginForm = ({setAuthType}) => {

  const { login } = useAuthCall();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2));
      login(values);
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} >
        <Box sx={{textAlign: 'center'}}>
          <LockIcon sx={{width:50, height:50, padding: 0.8, borderRadius: '50%', backgroundColor:'#ffcd44'}}/>
        </Box>
        
        <Typography sx={{marginBottom: 4, textAlign:'center'}} variant='h4' >
          Sign in 
        </Typography>
        <TextField
          fullWidth
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.email && Boolean(formik.errors.email)}
          helperText={formik.touched.email && formik.errors.email}
        />
        <TextField
          sx={{marginTop:2}}
          fullWidth
          id="password"
          name="password"
          label="Password"
          type="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
          Sign In
        </Button>
        <Typography sx={{marginTop: 1, textAlign:'center'}}>
          Don't have an account? <Link underline="none" onClick={()=>setAuthType('register')} sx={{cursor: 'pointer', "&:hover": {color:'#57c1ff'}}}>Sign Up</Link> 
        </Typography>
      </form>
    </Container>
  );
};

//ReactDOM.render(<LoginForm />, document.getElementById('root'));
export default LoginForm;