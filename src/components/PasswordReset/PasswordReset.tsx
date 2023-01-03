import * as React from "react";
import { Form } from "../Form";
import { AuthContext } from "../../context/AuthContext";
import { Box, Button, Input } from "@kodebi/libkodebi-ui";
import { AuthState } from "../../@types/auth";

export const PasswordReset: React.FC = (): JSX.Element => {
  const { userCredential, checkSigninInput, reset } = React.useContext(AuthContext) as AuthState;
  return (
    <>
      <Form className="form-center" onSubmit={reset}>
        <Box variant="flex-col" padding="0">
          <div className="title">
            <h3>Passwort Reset</h3>
            <p>Du hast es fast geschafft! Lege hier dein neues Passwort fest.</p>
          </div>
          <Input
            label
            type="password"
            labelTag="Dein neues Passwort"
            name="password"
            id="password"
            position="above"
            value={userCredential.password}
            onChange={checkSigninInput}
            required
          />
          <Button type="submit" label="Passwort ändern" />
        </Box>
      </Form>
    </>
  );
};
