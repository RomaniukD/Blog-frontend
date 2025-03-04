import React from 'react';
import {Link} from "react-router-dom";
import Button from '@mui/material/Button';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import {useDispatch, useSelector} from 'react-redux';
import { fetchAuth, logout, selectIsAuth } from '../../redux/slices/auth';
import { Info } from '@mui/icons-material';

export const Header = () => {
  const isAuth = useSelector(selectIsAuth);  
  const dispatch = useDispatch();
  
  const onClickLogout = () => {
    if(window.confirm('Ви напевно хочете вийти?')) {
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
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (

              
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
