import classes from "./NavBar.module.scss";
import logoSmall from "../../../assets/agilno.logo-small.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import { AnimatePresence, motion } from "framer-motion";
import useWindowDimensions from "../../../Hooks/useWindowDimension";
import DropDownMenu from "./DropDownMenu";
function NavBar({ setOpenModal, userData, setOpenGallery }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const { width } = useWindowDimensions();

  return (
    <nav className={classes["nav-container"]}>
      {width <= 1024 ? (
        <motion.div
          whileTap={{ scale: 1.2 }}
          onClick={() => setOpenGallery(true)}
          className={classes["menu-icon"]}
        >
          <MenuRoundedIcon style={{ fontSize: 25 }} />
        </motion.div>
      ) : (
        ""
      )}
      <motion.div className={classes["logo-container"]}>
        <img className={classes.logo} src={logoSmall} alt="agilno-small" />
        {width <= 1024 ? (
          <motion.div
            onClick={() => setShowDropdown(!showDropdown)}
            className={classes.arrow}
            animate={{ rotate: showDropdown === true ? 180 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <KeyboardArrowDownIcon />
          </motion.div>
        ) : (
          ""
        )}
        <span className={classes.hider}></span>
        {width <= 1024 ? (
          <AnimatePresence>
            {showDropdown && (
              <DropDownMenu
                setOpenModal={setOpenModal}
                setShowDropdown={setShowDropdown}
              />
            )}
          </AnimatePresence>
        ) : (
          ""
        )}
      </motion.div>
      {width > 1024 ? (
        <div className={classes["user-container"]}>
          {userData && (
            <img
              src={userData.image}
              alt="user"
              className={classes["account-image"]}
            />
          )}
          {userData && <h6 className={classes.name}>{userData.user}</h6>}
          <motion.div
            onClick={() => setShowDropdown(!showDropdown)}
            className={classes.arrow}
            animate={{ rotate: showDropdown === true ? 180 : 0 }}
            transition={{ duration: 0.7 }}
          >
            <KeyboardArrowDownIcon />
          </motion.div>
          <span className={classes.hider}></span>
          <AnimatePresence>
            {showDropdown && (
              <DropDownMenu
                setOpenModal={setOpenModal}
                setShowDropdown={setShowDropdown}
              />
            )}
          </AnimatePresence>
        </div>
      ) : (
        ""
      )}
    </nav>
  );
}

export default NavBar;
