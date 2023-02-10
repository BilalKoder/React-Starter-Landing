import React, { useState } from "react";
import "./styles/Nav.css";
import { Link, NavLink } from "react-router-dom";
import { signOut } from "supertokens-web-js/recipe/session";
import useUser from "../hooks/useUser";
import { useSelector } from "react-redux";
import { getUserData } from "../redux/userSlice";

const Nav = () => {
  const [isLoading, setIsLoading] = useState(false);
  const signOutHandle = async () => {
    try {
      setIsLoading(true);
      await signOut();
      window.location.reload();
    } catch {
      setIsLoading(false);
    }
  };

  const { user } = useSelector(getUserData);
  const first_name = user?.metadata?.first_name;
  const last_name = user?.metadata?.last_name;

  return (
    <div className="nav-container">
      <div style={{ marginLeft: "1rem" }}>
        <h3 className="name-text">
          {first_name} {last_name}
        </h3>
        {/* <span className="email-text">{user?.email}</span> */}
      </div>
      <NavLink
        to={"/home"}
        className={({ isActive }) =>
          isActive ? "link active-nav-link" : "link nav-link"
        }
      >
        Settings
      </NavLink>
      <NavLink
        to={"/subscription"}
        className={({ isActive }) =>
          isActive ? "link active-nav-link" : "link nav-link"
        }
      >
        Subscription
      </NavLink>
      <NavLink
        to={"/usage"}
        className={({ isActive }) =>
          isActive ? "link active-nav-link" : "link nav-link"
        }
      >
        Usage
      </NavLink>
      <NavLink
        to={"/"}
        className={({ isActive }) =>
          isActive ? "link active-nav-link" : "link nav-link"
        }
      >
        Custom Models
      </NavLink>
      <button
        onClick={signOutHandle}
        className="sign-out-btn"
        disabled={isLoading}
      >
        {isLoading ? <span>Signing Out</span> : <span>Sign Out</span>}
      </button>
      <span className="trademark">2023 © Twain</span>
    </div>
  );
};

export default Nav;
