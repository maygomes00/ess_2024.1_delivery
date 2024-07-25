import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo-delivery-branco.svg";
import styles from "./index.module.css";
import { localContextGetInfo } from "../../../app/home/context/LocalContext";
import SearchBar from "../SearchBar";

const Navbar = () => {
  useLocation(); // Hook para monitorar mudanças na URL
  const userId = localContextGetInfo("user", "id");

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <img src={logo} alt="logo" className={styles.navbarLogoImage} />
        <p>DeliveryApp</p>
      </div>
      <SearchBar />
      <div className={styles.navbarLinks}>
        <ul className={styles.list}>
          {userId ? (
            <>
              <li className={styles.listItem}>
                <Link to={`/${userId}/statistics`} data-cy="estatisticas">
                  Estatísticas
                </Link>
              </li>
              <li className={styles.listItem}>
                <Link to={`/${userId}/history`} data-cy="historico">
                  Histórico
                </Link>
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
