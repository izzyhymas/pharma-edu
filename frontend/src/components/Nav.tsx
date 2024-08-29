import NavItem from "./NavItem";
import routes from "../routes";
import styles from "./Nav.module.css";
import logo from "../assets/DixieTechLogo_Artboard-07.png";
import profile from "../assets/user-circle.svg";

function Nav() {
  return (
    <div className={styles.navigation}>
      <nav className={styles.navbar}>
        <img src={logo} alt="logo" className={styles.navLogo}></img>
        <ul className={styles.navItem}>
          {routes
            .filter((route) => route.name !== "Login")
            .map((route) => (
              <NavItem
                key={route.name}
                routeName={route.name}
                path={route.path}
              />
            ))}
        </ul>
        <div className={styles.profile}>
          <a href="/login" className={styles.profileLink}>
            <img
              src={profile}
              alt="Profile"
              className={styles.profileImage}
            ></img>
          </a>
        </div>
      </nav>
    </div>
  );
}

export default Nav;
