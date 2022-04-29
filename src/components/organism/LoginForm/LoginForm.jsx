import React, { useState } from 'react';
// styles
import './LoginForm.scss';
import { Waveform } from '@uiball/loaders';
// redux
import { useDispatch } from 'react-redux';
// formik
import { Formik, Form } from 'formik';
// router
import { useNavigate, Link } from 'react-router-dom';
// redux actions
import { setUser } from '../../../redux/User/userSlice';

import { HOME, SIGN_UP, RESET_PASSWORD } from '../../../routes';
// formik schema
import schemas from '../../../utils/schemas';
// components
import Input from '../../molecules/Input/Input';
// auth
import {
  signInEmailAndPassword,
  signInWithGoogle
} from '../../../services/auth/auth';
// utils
import apiAuth from '../../../utils/fetchAuthApi';
import handleAuthErrors from '../../../utils/handleAuthErrors';
// icons
import googleIcon from '../../../assets/svg/googleIcon.svg';
// components
import ErrorContainer from '../../molecules/ErrorContainer/ErrorContainer';

import ButtonSubmit from '../../molecules/ButtonSubmit/ButtonSubmit';

function LoginForm() {
  const navigate = useNavigate();

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleLoginWithGoogle = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // auth in firebase and api
      await signInWithGoogle();
      const apiUser = await apiAuth.signupWithApi();
      // set user in redux
      dispatch(setUser(apiUser));
      navigate(HOME);
    } catch (e) {
      const message = handleAuthErrors(e.message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = async (values) => {
    try {
      setIsLoading(true);
      setError(null);
      // auth in firebase and api
      await signInEmailAndPassword(values.email, values.password);
      const apiUser = await apiAuth.loginWithApi();
      // set user in redux
      dispatch(setUser(apiUser));
      navigate(HOME);
    } catch (e) {
      const message = handleAuthErrors(e.message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <h1 className="authHeading">Login</h1>
      <Formik
        initialValues={{
          email: '',
          password: ''
        }}
        validationSchema={schemas.signInSchema}
        onSubmit={(values) => handleLogin(values)}
      >
        {({ handleSubmit, errors, touched }) => (
          <Form onSubmit={handleSubmit}>
            <Input
              id="email"
              touched={touched.email}
              icon="email"
              error={errors.email}
              name="email"
              label="Email"
              placeholder="Type your email"
            />
            <Input
              id="password"
              icon="password"
              name="password"
              touched={touched.password}
              error={errors.password}
              label="Password"
              placeholder="Type your password"
              password
            />
            <div className="textRightLogin">
              <Link to={RESET_PASSWORD}>Forgot password?</Link>
            </div>

            <div className="loginBgButton" />
            <ButtonSubmit disabled={isLoading}>
              {isLoading ? (
                <Waveform size={40} lineWeight={3.5} speed={1} color="white" />
              ) : (
                'LOG IN'
              )}
            </ButtonSubmit>
            <button
              disabled={isLoading}
              className="googleLoginbutton"
              onClick={handleLoginWithGoogle}
              type="button"
            >
              <span>Continue with</span>
              <img src={googleIcon} alt="google icon" />
            </button>
            <ErrorContainer error={error} />
            <div className="flexBottomText">
              <span className="textSignup">Don&apos;t have an account?</span>

              <span className="signupLink">
                <Link to={SIGN_UP}>Sign up</Link>
              </span>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default LoginForm;
