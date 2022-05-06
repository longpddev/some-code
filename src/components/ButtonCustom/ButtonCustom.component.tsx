import React from "react";
import { Button } from "react-materialize";
import "./ButtonCustom.style.scss";

type TButtonCustom = {
  label?: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  textTrans?: string; //none | capitalize | uppercase | lowercase | full-width
  onClick?: Function;
  capitalize?: boolean;
  disabled?: any;
};

const ButtonCustom = ({
  label = "Button",
  backgroundColor = "#f4364f",
  width = "150px",
  height = "45px",
  onClick,
  disabled,
  ...props
}: // textTrans = "capitalize",
  TButtonCustom) => {
  return (
    <Button
      node="button"
      // large

      disabled={disabled}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: width,
        height: height,
        fontFamily: "Poppins",
        textTransform: "capitalize",
        backgroundColor: backgroundColor,
        fontSize: "14px",
        fontWeight: "600",
        lineHeight: "20px",
        boxShadow: "none",
      }}
      onClick={() => onClick}
      {...props}
    >
      {label}
    </Button>
  );
};

export default ButtonCustom;
