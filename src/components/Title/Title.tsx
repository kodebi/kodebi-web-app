import React from "react";

interface TitleProps {
  content: string;
}

export const Title: React.FC<TitleProps> = ({ content }): JSX.Element => {
  return (
    <>
      <h3 className="title-2">{content}</h3>
    </>
  );
};
