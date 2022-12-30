import * as React from "react";
import { LayoutContext } from "../../context/LayoutContext";
import { Box } from "@kodebi/libkodebi-ui";
import { LayoutState } from "../../@types/layout";

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
