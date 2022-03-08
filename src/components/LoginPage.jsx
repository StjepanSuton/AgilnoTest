import classes from "./LoginPage.module.scss";
import logoBig from "../assets/agilno-logo-big.png";
import LoginForm from "./LoginForm";
import camera from "../assets/camera.png";
import useWindowDimensions from "../Hooks/useWindowDimension";
function LoginPage() {
  const { width } = useWindowDimensions();
  return (
    <div className={classes.container}>
      <div className={classes["header-form-container"]}>
        <div className={classes.header}>
          <img className={classes.logo} src={logoBig} alt="agilno-logo" />
        </div>
        <LoginForm />
      </div>
      {width > 1024 ? (
        <img className={classes["welcome-image"]} src={camera} alt="welcome" />
      ) : (
        ""
      )}
    </div>
  );
}

export default LoginPage;
