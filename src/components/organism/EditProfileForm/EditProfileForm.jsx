import React, { useState } from 'react';
// formik
import { Form, Formik } from 'formik';
// styles
import './EditProfileForm.scss';
// redux
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUser } from '../../../redux/User/userSlice';
// schemas
import schemas from '../../../utils/schemas';
// components
import Button from '../../molecules/Button/Button';
import {
  changeCurrentUserEmail,
  getCurrentUserProviderId,
  reauthenticate
} from '../../../services/auth/auth';
// API utils
import api from '../../../utils/fetchEditAccount';
import AccountEditInput from '../../molecules/AccountEditInput/AccountEditInput';
import handleAuthErrors from '../../../utils/handleAuthErrors';
import ErrorContainer from '../../molecules/ErrorContainer/ErrorContainer';
import { ACCOUNT } from '../../../routes';
import Modal from '../../atoms/Modal/Modal';

function EditProfileForm() {
  // router navigate
  const navigate = useNavigate();

  // state confirm with pass
  const [togglePassword, setTogglePassword] = useState();
  const [isLoading, setIsLoading] = useState(false);

  // state error manage
  const [error, setError] = useState(null);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const initialValues = {
    firstName: user.firstName,
    lastName: user.lastName ? user.lastName : '',
    email: user.email
  };

  const handleSubmit = async ({ password } = {}) => {
    setError(null);
    setIsLoading(true);
    try {
      // if provider comes from email and pass
      if (getCurrentUserProviderId() === 'password') {
        await reauthenticate(password);
        await changeCurrentUserEmail(formValues.email);
      }

      const apiUser = await api.fetchEditProfile(formValues, user.id);
      dispatch(setUser(apiUser));
      navigate(ACCOUNT);
    } catch (e) {
      const message = handleAuthErrors(e.message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmitWithoutEmail = async (values) => {
    setError(null);
    setIsLoading(true);
    try {
      const apiUser = await api.fetchEditProfile(values, user.id);
      dispatch(setUser(apiUser));
      navigate(ACCOUNT);
    } catch (e) {
      const message = handleAuthErrors(e.message);
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="profileSection">
      <h1>Edit your profile</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          setFormValues(values);

          if (values.email !== initialValues.email) {
            setTogglePassword(true);
          } else {
            handleSubmitWithoutEmail(values);
          }
        }}
        validationSchema={schemas.editProfileSchema}
      >
        {({ errors, touched }) => (
          <Form>
            {/* //? Padding problems */}
            {/* //!GetCurrentUserProviderId not working at all, refresh when true and see */}
            {getCurrentUserProviderId() === 'password' ? (
              <AccountEditInput
                error={errors.email}
                touched={touched.email}
                label="Email"
                name="email"
                type="text"
              />
            ) : null}
            <AccountEditInput
              error={errors.firstName}
              touched={touched.firstName}
              label="First name"
              name="firstName"
            />
            <AccountEditInput
              error={errors.lastName}
              touched={touched.lastName}
              label="Last name"
              name="lastName"
            />
            <Button size="md">Save profile</Button>
          </Form>
        )}
      </Formik>
      {togglePassword && (
        <Modal title="Confirm your password" setShow={setTogglePassword}>
          <Formik
            initialValues={{
              password: ''
            }}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form>
                <AccountEditInput
                  type="password"
                  label="Password"
                  name="password"
                />
                <Button isLoading={isLoading} size="md">
                  Confirm password
                </Button>
              </Form>
            )}
          </Formik>
          <ErrorContainer error={error} />
        </Modal>
      )}
    </section>
  );
}

export default EditProfileForm;
