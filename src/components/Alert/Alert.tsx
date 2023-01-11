/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { Box } from "@kodebi/libkodebi-ui";

import { LayoutContext } from "../../context/LayoutContext";

import type { LayoutState } from "../../@types/layout";

export const Alert: React.FC = (): JSX.Element => {
  const { alert, setAlert } = React.useContext(LayoutContext) as LayoutState;

  React.useLayoutEffect(() => {
    setTimeout(() => {
      setAlert({ display: false, icon: "", msg: "" });
    }, 3000);
  }, [alert]);

  return (
    <Box className="alert basic-flex">
      <span className="icon basic-flex">{alert.icon}</span>
      <p>{alert.msg}</p>
    </Box>
  );
};
