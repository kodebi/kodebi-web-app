import React from 'react';
import InputField from './InputField';
import SigninBtn from './SigninBtn';
import Form from './Form';
import { useAuthContext } from '../context/AuthContext';

const Login = ({ openPasswordResetTab }) => {
    const {
        userCredential: { email, password },
        loginNow,
        checkSigninInput
    } = useAuthContext();

    return (
        <>
            <Form className='form-center' onSubmit={loginNow}>
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
    );
};

export default Login;
