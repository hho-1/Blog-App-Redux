import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Link, Typography, Box } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import useAuthCall from '../../hooks/useAuthCall';

const validationSchema = yup.object({
  username: yup
    .string('Enter your username')
    .required('Username is required'),
  firstName: yup
    .string('Enter your first name')
    .max(20, "First name can include maximum 20 characters"),
  lastName: yup
    .string('Enter your last name')
    .max(20, "Last name can include maximum 20 characters"),
  email: yup
    .string('Enter your email')
    .email('Enter a valid email')
    .required('Email is required'),
  image: yup
    .string('Enter image URL'),
  bio: yup
    .string('Enter bio'),
  password: yup
    .string('Enter your password')
    .min(8, 'Password should be of minimum 8 characters length')
    .required('Password is required')
    .matches(/\d+/, "Password must include at least 1 number")
    .matches(/[a-z]/, "Password must include at least 1 lowercase letter")
    .matches(/[A-Z]/, "Password must include at least 1 uppercase letter")
    .matches(/[!,?{}><%&$#£+-.]+/, "Password must include at least 1 lspecial character"),
  password2: yup
    .string('Enter your password again')
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required('Password is required'),
});

const RegisterForm = ({setAuthType}) => {

  const { register } = useAuthCall();

  const formik = useFormik({
    initialValues: {
      username: '',
      first_name: '',
      last_name: '',
      email: '',
      image: '',
      bio: '',
      password: '',
      password2: '',
    },
    validationSchema: validationSchema,
    onSubmit: (values, actions) => {
      //alert(JSON.stringify(values, null, 2));
      register(values);
      actions.resetForm();
      actions.setSubmitting(false);
    },
  });

  return (
    <div >
      <form onSubmit={formik.handleSubmit}>
        <Box sx={{textAlign: 'center'}}>
          <LockIcon sx={{width:50, height:50, padding: 0.8, borderRadius: '50%', backgroundColor:'#ffcd44'}}/>
        </Box>
        
        <Typography sx={{marginBottom: 4, textAlign:'center'}} variant='h4' >
          Sign up 
        </Typography>
        <TextField
          fullWidth
          id="username"
          name="username"
          label="Username"
          value={formik.values.username}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.username && Boolean(formik.errors.username)}
          helperText={formik.touched.username && formik.errors.username}
        />
        <TextField
          sx={{marginTop:1}}
          fullWidth
          id="first_name"
          name="first_name"
          label="First name"
          value={formik.values.first_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.first_name && Boolean(formik.errors.first_name)}
          helperText={formik.touched.first_name && formik.errors.first_name}
        />
        <TextField
          sx={{marginTop:1}}
          fullWidth
          id="last_name"
          name="last_name"
          label="Last name"
          value={formik.values.last_name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.last_name && Boolean(formik.errors.last_name)}
          helperText={formik.touched.last_name && formik.errors.last_name}
        />
        <TextField
          sx={{marginTop:1}}
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
          sx={{marginTop:1}}
          fullWidth
          id="image"
          name="image"
          label="Image"
          value={formik.values.image}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.image && Boolean(formik.errors.image)}
          helperText={formik.touched.image && formik.errors.image}
        />
        <TextField
          sx={{marginTop:1}}
          fullWidth
          id="bio"
          name="bio"
          label="Bio"
          value={formik.values.bio}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.bio && Boolean(formik.errors.bio)}
          helperText={formik.touched.bio && formik.errors.bio}
        />
        <TextField
          sx={{marginTop:1}}
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
        <TextField
          sx={{marginTop:1}}
          fullWidth
          id="password2"
          name="password2"
          label="Confirm Password"
          type="password"
          value={formik.values.password2}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.password2 && Boolean(formik.errors.password2)}
          helperText={formik.touched.password2 && formik.errors.password2}
        />
        <Button color="primary" variant="contained" fullWidth type="submit" sx={{marginTop: 3, "&:hover": {backgroundColor:'#57c1ff'}}}>
          Sign Up
        </Button>
        <Typography sx={{marginTop: 1, textAlign:'center'}}>
          Already have an account? <Link underline="none" onClick={()=>setAuthType('login')} sx={{cursor: 'pointer', "&:hover": {color:'#57c1ff'}}}>Sign In</Link> 
        </Typography>
      </form>
    </div>
  );
};


//ReactDOM.render(<RegisterForm />, document.getElementById('root'));
export default RegisterForm;