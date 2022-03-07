import * as React from 'react'
import InputField from './InputField'
import SigninBtn from './SigninBtn'
import Form from './Form'
import { AuthContext } from '../context/AuthContext'

const Login = ({ openPasswordResetTab }) => {
  const {
    userCredential: { email, password },
    login,
    checkSigninInput,
  } = React.useContext(AuthContext)

  return (
    <>
      <Form className='form-center' onSubmit={login}>
        <div className='title'>
          <h3>Willkommen zurück</h3>
        </div>
        <section className='form'>
          <InputField
            type='text'
            htmlFor='Deine Email:'
            name='email'
            id='email'
            value={email}
            onChange={checkSigninInput}
            required
          />
          <InputField
            type='password'
            htmlFor='Dein Passwort:'
            name='password'
            id='password'
            value={password}
            onChange={checkSigninInput}
            required
          />
          <SigninBtn type='submit'>Einloggen</SigninBtn>
          <button
            type='button'
            className='reset'
            onClick={openPasswordResetTab}
          >
            Passwort vergessen?
          </button>
        </section>
      </Form>
    </>
  )
}

export default Login
