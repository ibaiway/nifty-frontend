import { Form, Formik } from 'formik';
import React, { useState } from 'react';
// styles
import './SignUpForm.scss';
import { Waveform } from '@uiball/loaders';
// redux
import { useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import ErrorContainer from '../../molecules/ErrorContainer/ErrorContainer';
import Input from '../../molecules/Input/Input';
import ButtonSubmit from '../../molecules/ButtonSubmit/ButtonSubmit';
// actions
import { setUser } from '../../../redux/User/userSlice';
import { HOME, LOGIN } from '../../../routes';
// auth
import { signUpEmailAndPassword } from '../../../services/auth/auth';
import apiAuth from '../../../utils/fetchAuthApi';
import handleAuthErrors from '../../../utils/handleAuthErrors';

// schema
import schemas from '../../../utils/schemas';

function SignUpForm() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // navigatings
  const navigate = useNavigate();
  // redux
  const dispatch = useDispatch();

  const initialValues = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  const handleSignup = async ({ firstName, lastName, email, password }) => {
    try {
      setIsLoading(true);
      // auth in firebase and api
      await signUpEmailAndPassword(email, password);
      const apiUser = await apiAuth.signupWithApi(firstName, lastName);
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
      <h1 className="authHeading">Sign up</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={schemas.signupSchema}
        onSubmit={(values) => handleSignup(values)}
      >
        {({ errors, touched }) => (
          <Form>
            <Input
              error={errors.firstName}
              touched={touched.firstName}
              icon="user"
              name="firstName"
              label="First Name"
              placeholder="Type your Name"
            />
            <Input
              error={errors.lastName}
              touched={touched.lastName}
              icon="user"
              name="lastName"
              label="Last Name"
              placeholder="Type your last name"
            />
            <Input
              error={errors.email}
              touched={touched.email}
              icon="email"
              name="email"
              label="Email"
              placeholder="Type your email"
            />
            <Input
              error={errors.password}
              touched={touched.password}
              signUpPassword
              icon="password"
              password
              name="password"
              label="Password"
              placeholder="Type your password"
            />
            <ButtonSubmit disabled={isLoading}>
              {isLoading ? (
                <Waveform size={40} lineWeight={3.5} speed={1} color="white" />
              ) : (
                'SIGN UP'
              )}
            </ButtonSubmit>
          </Form>
        )}
      </Formik>
      <ErrorContainer error={error} />
      <div className="loginLink">
        <Link to={LOGIN}>Back to Login</Link>
      </div>
    </>
  );
}

export default SignUpForm;