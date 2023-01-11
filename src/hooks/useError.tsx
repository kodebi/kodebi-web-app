import * as React from "react";

import { LayoutContext } from "../context/LayoutContext";
import { FaPoop } from "react-icons/fa";

import type { LayoutState } from "../@types/layout";

function useError(): { catchError: (e: Error) => void } {
  const { setAlert } = React.useContext(LayoutContext) as LayoutState;

  const catchError = (e: Error): void => {
    setAlert({
      display: true,
      icon: <FaPoop />,
      msg: e.message,
    });
  };

  return {
    catchError,
  };
}

export default useError;
