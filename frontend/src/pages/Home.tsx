import logo from "../assets/DixieTechLogo_Artboard-04.png";
import styles from "./Home.module.css";

function Home() {
  return (
    <div className={styles.dixieLogo}>
      <img src={logo} alt="dixie-tech-logo"></img>
    </div>
  );
}

export default Home;
