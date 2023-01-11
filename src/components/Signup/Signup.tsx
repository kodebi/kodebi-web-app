import * as React from "react";
import { Box, Input, Button } from "@kodebi/libkodebi-ui";

import { Form } from "../Form";
import { AuthContext } from "../../context/AuthContext";

import type { AuthState } from "../../@types/auth";

export const Signup: React.FC = (): JSX.Element => {
  const {
    userCredential: { name, email, password },
    signup,
    checkSigninInput,
  } = React.useContext(AuthContext) as AuthState;

  return (
    <>
      <Form className="form-center" onSubmit={signup}>
        <Box variant="flex-col" margin="0" padding="0">
          <div className="title">
            <h3>Melde dich jetzt an!</h3>
          </div>
          <Input
            label
            type="text"
            labelTag="Dein Wunsch-Username"
            name="name"
            id="name"
            value={name}
            position="above"
            onChange={checkSigninInput}
          />
          <Input
            label
            type="text"
            labelTag="Deine bevorzugte Email"
            name="email"
            id="email"
            value={email}
            position="above"
            onChange={checkSigninInput}
          />
          <Input
            label
            type="password"
            labelTag="Dein bärenstarkes Passwort"
            id="password"
            name="password"
            value={password}
            position="above"
            onChange={checkSigninInput}
          />
          <Button variant="signin" type="submit" label="Registrieren" />
        </Box>
      </Form>
    </>
  );
};
