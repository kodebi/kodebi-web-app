import React from "react";
import { NavigateFunction, useNavigate } from "react-router-dom";
import { Button } from "@kodebi/libkodebi-ui";

export const ReturnTo: React.FC = (): JSX.Element => {
  const history: NavigateFunction = useNavigate();
  const prevPath = (): void => history(-1);
  return (
    <>
      <Button variant="filter" onClick={prevPath} label="zurück" />
    </>
  );
};
