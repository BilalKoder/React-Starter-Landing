import React from "react";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Session from "supertokens-web-js/recipe/session";
import Loader from "../../components/Loader";
import Nav from "../../components/Nav";
import TopNav from "../../components/TopNav";
import useUser from "../../hooks/useUser";
import Toast from "../../libs/Toast";
import ErrorComponent from "../../components/ErrorComponent";
import { getUserData } from "../../redux/userSlice";
import FooterIcon from "../../components/FooterIcon";

const Home = () => {
  const { isLoading, isSuccess, isError } = useUser();
  const logOut = async () => {
    await Session.signOut();
    window.location.reload();
  };
  const user = useSelector(getUserData);
  console.log("user..........", user);

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return (
      <div
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        <ErrorComponent
          handleLoading={() => {
            window.location.reload();
          }}
        />
      </div>
    );
  }

  return (
    <>
      <TopNav />
      <div style={{ display: "flex" }}>
        <Nav />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            paddingTop: "2%",
            marginLeft: "1.5rem",
          }}
        >
          <Outlet />
        </div>
      </div>
      <FooterIcon />
    </>
  );
};

export default Home;
