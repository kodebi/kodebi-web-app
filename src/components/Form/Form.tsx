import * as React from "react";

interface FormProps {
  onSubmit?: (e: React.FormEvent<HTMLFormElement>) => void;
  className?: string;
  children?: React.ReactNode;
}

export const Form: React.FC<FormProps> = (props): JSX.Element => {
  return (
    <>
      <form {...props}>{props.children}</form>
    </>
  );
};
