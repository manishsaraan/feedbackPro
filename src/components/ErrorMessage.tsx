import React from "react";

type Props = {
  message: string;
};

export default function ErrorMessage({ message }: Props) {
  return <div>{message}</div>;
}
