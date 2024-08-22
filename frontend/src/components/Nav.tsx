import NavItem from "./NavItem";
import routes from "../routes";
import styles from "./Nav.module.css";
import logo from "../assets/DixieTechLogo_Artboard-07.png";

function Nav() {
  return (
    <div className={styles.navigation}>
      <nav className={styles.navbar}>
        <img src={logo} alt="logo" className={styles.navLogo}></img>
        <ul className={styles.navItem}>
            {routes.map(route => <NavItem key={route.name} routeName={route.name} path={route.path} />)}
        </ul>
      </nav>
    </div>
  );
}

export default Nav;
