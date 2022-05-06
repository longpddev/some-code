import "./Layout.style.scss";
import Header from "../header";
import Footer from "../footer";
import { useEffect } from "react";
import { LOGOUT_MUTATION } from "../../graphql/mutations/User/UserMutation";
import { useMutation } from "@apollo/client";
import { REFRESH_TOKEN } from "../../constants/constants";

const Layout = (props: { children: any, showhideticky?: boolean }) => {

  return (
    <>
      <Header />
      <div className="layout">{props.children}</div>
      <Footer showhidetickys={props.showhideticky ? props.showhideticky : false} />
    </>
  );
};

export default Layout;
