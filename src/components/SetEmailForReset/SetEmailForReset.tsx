import * as React from "react";
import { Box, Button, Input } from "@kodebi/libkodebi-ui";

import { Form } from "../Form";
import { AuthContext } from "../../context/AuthContext";
import type { AuthState, LoginProps } from "../../@types/auth";

export const SetEmailForReset: React.FC<LoginProps> = ({ openPasswordResetTab }): JSX.Element => {
  const { userCredential, checkSigninInput, requestReset } = React.useContext(
    AuthContext
  ) as AuthState;

  return (
    <>
      <Form className="form-center" onSubmit={requestReset}>
        <Box variant="flex-col" padding="0">
          <div className="title">
            <h3>Passwort Reset</h3>
            <p>Gib hier deine Email ein und wir schicken dir einen Reset-Link</p>
          </div>
          <Input
            label
            type="text"
            labelTag="Deine Email"
            name="email"
            id="email"
            position="above"
            value={userCredential.email}
            onChange={checkSigninInput}
            required
          />
          <Button type="submit" label="Passwort zurücksetzen" />
          <button type="button" className="reset" onClick={openPasswordResetTab}>
            zurück zum Login
          </button>
        </Box>
      </Form>
    </>
  );
};
