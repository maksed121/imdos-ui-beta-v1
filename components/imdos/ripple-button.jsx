import { Button } from "@nextui-org/react";
import React from "react";

const RippleButton = (props) => {
  return <Button {...props}>{props.children}</Button>;
};

export default RippleButton;
