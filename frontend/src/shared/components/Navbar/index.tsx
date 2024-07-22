import { Link } from "react-router-dom";
import logo from "../../assets/react.svg";
import styles from "./index.module.css";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarLogo}>
        <Link to="/">
          <img src={logo} alt="logo" className={styles.navbarLogoImage} />
        </Link>
      </div>
      <div className={styles.navbarLinks}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link to="/1/statistics">Estatísticas</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/1/history">Histórico</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/users">Users</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/login-client">Login Client</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/home-client">Home Client</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/login-restaurant">Login Restaurant</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/home-restaurant">Home Restaurant</Link>
          </li>
          <li className={styles.listItem}>
            <Link to="/forgot-password">Forgot Password</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
