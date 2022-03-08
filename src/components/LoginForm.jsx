import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import classes from "./LoginForm.module.scss";
import AuthContext from "../store/auth-context";
import { AnimatePresence, motion } from "framer-motion";
function LoginForm() {
  const navigate = useNavigate();
  //
  const authCtx = useContext(AuthContext);
  const [emailAdress, setEmailAdress] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  //
  //
  const [errorMessage, setErrorMessage] = useState(null);
  const [emailisValid, setEmailIsValid] = useState(true);
  const [passwordisTouched, setPasswordIsTouched] = useState(false);
  const [passwordisValid, setPasswordIsValid] = useState(true);
  const [emailIsTouched, setEmailIsTouched] = useState(true);

  const emailValidHandler = () => {
    if (emailIsTouched && emailAdress.includes("@")) {
      return setEmailIsValid(true);
    } else {
      setEmailIsValid(false);
      setErrorMessage("email must contain @");
    }
  };

  const passwordValidHandler = () => {
    if (passwordisTouched && password.trim().length > 5) {
      setPasswordIsValid(true);
    } else {
      setPasswordIsValid(false);
      setErrorMessage("Password must be longer than 5 characters");
    }
  };
  //

  useEffect(() => {
    clearTimeout();
    if (errorMessage) {
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }, [errorMessage]);

  const submitHandler = (event) => {
    event.preventDefault();
    const enteredEmail = emailAdress;
    const enteredPassword = password;
    setIsLoading(true);
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAb0n8j8j2tD8-c6Wv1vESblJlnkSlH3HI";
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let error =
              "Authentication failed! Please check your email and/or passwrod";
            setErrorMessage(error);
            throw new Error(error);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(
          new Date().getTime() + +data.expiresIn * 1000
        );
        authCtx.login(data.idToken, expirationTime.toISOString(), emailAdress);
        navigate("/home-page");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className={classes["section-container"]}>
      <h4 className={classes["login-title"]}>Log in</h4>
      <form className={classes.control} onSubmit={submitHandler}>
        <label htmlFor="email">Email address</label>
        <input
          onFocus={() => setEmailIsTouched(true)}
          onBlur={emailValidHandler}
          className={classes[emailisValid === true ? "input" : "input-error"]}
          value={emailAdress}
          onChange={(e) => setEmailAdress(e.target.value)}
          type="email"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          onFocus={() => setPasswordIsTouched(true)}
          onBlur={passwordValidHandler}
          className={
            classes[passwordisValid === true ? "input" : "input-error"]
          }
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
        />
        <div className={classes.action}>
          {isLoading === true ? (
            <button className={classes.button} type="button">
              Loading...
            </button>
          ) : (
            <button className={classes.button} type="submit">
              LOG IN
            </button>
          )}
        </div>
      </form>
      <AnimatePresence>
        {errorMessage && (
          <motion.h4
            className={classes["error-message"]}
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
          >
            {errorMessage}
          </motion.h4>
        )}{" "}
      </AnimatePresence>
    </section>
  );
}

export default LoginForm;
