/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import '../styles/common/paragraph.scss';
import '../styles/containers/signIn.scss';
import { signInRequest } from '../api/queries';

interface State {
  email: string;
  password: string;
  showPassword: boolean;
}

const SignIn = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    showPassword: false,
  });

  const navigate = useNavigate();
  const loginMutation = useMutation(() => signInRequest(values.email, values.password));

  useEffect(() => {
    if (loginMutation.isSuccess) {
      navigate('/');
    }
  }, [loginMutation.isSuccess, navigate]);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const onSubmitHandler = () => {
    loginMutation.mutate();
  };

  return (
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { width: '100%w' },
      }}
      autoComplete="off"
    >
      <>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <p>Email</p>
          <OutlinedInput
            id="outlined-adornment-email"
            type="text"
            value={values.email}
            onChange={handleChange('email')}
            placeholder="Type your email"
            sx={{ borderRadius: '8px' }}
          />
        </FormControl>
        <FormControl sx={{ width: '100%' }} variant="filled">
          <p className="paragraph">Password</p>
          <OutlinedInput
            required
            id="outlined-adornment-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            placeholder="Type your password"
            sx={{ borderRadius: '8px' }}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
          />
        </FormControl>
      </>
      {loginMutation.isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', padding: '1.2rem' }}>
          <CircularProgress />
        </Box>
      ) : (
        <button
          type="button"
          className={`submit-form-button ${(!values.email || !values.password) && 'disabled'}`}
          onClick={onSubmitHandler}
          onSubmit={onSubmitHandler}
        >
          Log in
        </button>
      )}
      <p className="paragraph-secondary">I forgot my password</p>
    </Box>
  );
};

export default SignIn;