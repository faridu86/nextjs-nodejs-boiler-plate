import { connect } from 'react-redux';
import { Formik } from 'formik';
import * as yup from 'yup';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import { userSignIn } from '../../store/actions/auth';

const LoginForm = ({ userSignIn: signIn }) => {
  // rendering login form
  const schema = yup.object({
    username: yup.string().required(),
    password: yup.string().required(),
  });
  const handleLogin = model => signIn(model);
  return (
    <Formik
      validationSchema={schema}
      onSubmit={handleLogin}
      initialValues={{
        username: 'farid',
        password: '123',
      }}
    >
      {({
        handleSubmit,
        handleChange,
        values,
        touched,
        // eslint-disable-next-line
        handleBlur, isValid,
        errors,
      }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group md="4" controlId="validationFormik01">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={values.username}
                onChange={handleChange}
                isValid={touched.username && !errors.username}
              />
              {touched.username && <Form.Control.Feedback>{errors.username}</Form.Control.Feedback>}
            </Form.Group>
            <Form.Group md="4" controlId="validationFormik02">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
              />
              {touched.password && <Form.Control.Feedback>{errors.password}</Form.Control.Feedback>}
            </Form.Group>
          </Form.Row>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
};
const mapStateToProps = ({ auth }) => {
  const { authUser } = auth;
  return { authUser };
};

const mapDispatchToProps = { userSignIn };

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
