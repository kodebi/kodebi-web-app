import * as React from 'react'
import { Form } from '../Form'
import { InputField } from '../InputField'
import { SigninBtn } from '../SigninBtn'
import { AuthContext } from '../../context/AuthContext'

export const PasswordReset = () => {
  const { userCredential, checkSigninInput, reset } =
    React.useContext(AuthContext)

  return (
    <>
      <Form className='form-center' onSubmit={reset}>
        <div className='title'>
          <h3>Passwort Reset</h3>
          <p>Du hast es fast geschafft! Lege hier dein neues Passwort fest.</p>
        </div>
        <section className='form'>
          <InputField
            type='password'
            htmlFor='Dein neues Passwort:'
            name='password'
            id='password'
            value={userCredential.password}
            onChange={checkSigninInput}
            required
          />
          <SigninBtn type='submit'>Passwort ändern</SigninBtn>
        </section>
      </Form>
    </>
  )
}
