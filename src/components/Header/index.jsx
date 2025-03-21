import React from 'react';
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';

import styles from './Header.module.scss';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { fetchAuth, logout, selectIsAuth } from '../../redux/slices/auth';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);  
  const dispatch = useDispatch();
  
  const onClickLogout = () => {
    if(window.confirm('Are you sure you want to leave?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root} style={{background: 'linear-gradient(90deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 100%)'}}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>ROMANIUK BLOG</div>
          </Link>
          <div className={styles.buttons}>

            {isAuth ? (
              <>
                <Link to="/add-post">
                  <Button variant="contained">Write an article</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                Get out
                </Button>
              </>
            ) : (

              
              <>
                <Link to="/login">
                  <Button variant="contained" color='secondary' size='small'>Sign in</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained" size='large'>Create an account</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
