import React, { useEffect } from "react";
import useStorage from "../../../Hooks/useStorage";
import { motion } from "framer-motion";
import classes from "./ProgressBar.module.scss";
const ProgressBar = ({ file, setFile, setUrl }) => {
  const { progress, url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setUrl(url);
    } else {
      return;
    }
  }, [url, setUrl]);

  return (
    <motion.div
      className={classes["progress-bar"]}
      initial={{ width: 0 }}
      animate={{ width: progress + "%" }}
    ></motion.div>
  );
};

export default ProgressBar;
