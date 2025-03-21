import React from "react";
import {useDispatch, useSelector} from 'react-redux';
import {Navigate} from "react-router-dom";
import { useForm} from 'react-hook-form';
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import { fetchAuth, selectIsAuth } from "../../redux/slices/auth";

export const Login = () => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: {errors, isValid}
  } = useForm({
    mode: 'onChange'
  })

  const onSubmit = async (values) => {
    const data = await dispatch(fetchAuth(values));

    if (!data.payload) {
      return alert('Failed to log in!')
    }

    if ('token' in data.payload) {
      window.localStorage.setItem('token', data.payload.token);
    }
  }

  React.useEffect(() => {

  });

  if (isAuth) {
    return <Navigate to='/' />
  }

  return (
    <Paper classes={{ root: styles.root }}>
      <Typography classes={{ root: styles.title }} variant="h5">
      Account Login
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        className={styles.field}
        label="E-Mail"
        error={Boolean(errors.email?.message)}
        helperText={errors.email?.message}
        {...register('email', {required: 'Enter your mail'})}
        fullWidth
      />
      <TextField 
      className={styles.field} 
      error={Boolean(errors.password?.message)}
      label="Password" 
      helperText={errors.password?.message}
      {...register('password', {required: 'Enter your password'})}
      fullWidth 
      />
      <Button disabled={!isValid} type="submit" size="large" variant="contained" fullWidth>
      Sign in
      </Button>
      </form>
    </Paper>
  );
};
