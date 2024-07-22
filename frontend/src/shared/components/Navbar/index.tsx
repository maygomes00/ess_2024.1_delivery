import React from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/react.svg";
import styles from "./index.module.css";
import { localContextGetInfo } from "../../../app/home/context/LocalContext";

const Navbar = () => {
  useLocation(); // Hook para monitorar mudanças na URL
  const userId = localContextGetInfo("user", "id");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.navbarLogoImage} />
        </Link>
      </div>
      <div className={styles.navbarLinks}>
        <ul className={styles.list}>
          {userId ? (
            <>
              <li className={styles.listItem}>
                <Link to={`/${userId}/statistics`}>Estatísticas</Link>
              </li>
              <li className={styles.listItem}>
                <Link to={`/${userId}/history`}>Histórico</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/users">Users</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/home-client">Home Client</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/home-restaurant">Home Restaurant</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/forgot-password">Forgot Password</Link>
              </li>
            </>
          ) : (
            <>
              <li className={styles.listItem}>
                <Link to="/login-client">Login Client</Link>
              </li>
              <li className={styles.listItem}>
                <Link to="/login-restaurant">Login Restaurant</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
