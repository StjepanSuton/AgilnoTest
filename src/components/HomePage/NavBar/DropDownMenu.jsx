import React, { useContext } from "react";
import { motion } from "framer-motion";
import classes from "./DropDownMenu.module.scss";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
function DropDownMenu({ setOpenModal, setShowDropDown }) {
  const authCtx = useContext(AuthContext);

  const logoutHandler = () => {
    authCtx.logout();
    navigate("/");
  };

  const navigate = useNavigate();

  return (
    <motion.div
      animate={{ y: 0 }}
      initial={{ y: -100 }}
      exit={{ y: -100 }}
      transition={{ type: "just", stiffness: 100, duration: 0.7 }}
      className={classes["dropdown-menu"]}
    >
      <motion.button
        onClick={() => setOpenModal(true)}
        whileTap={{ scale: 1.1 }}
        className={classes["add-button"]}
      >
        ADD IMAGE <AddAPhotoIcon />
      </motion.button>
      <motion.button
        whileTap={{ scale: 1.1 }}
        onClick={logoutHandler}
        className={classes["signout-button"]}
      >
        SIGN OUT
      </motion.button>
    </motion.div>
  );
}

export default DropDownMenu;
