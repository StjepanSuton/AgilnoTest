import classes from "./AddImageModal.module.scss";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import ProgressBar from "./ProgressBar";
import { addDoc, serverTimestamp } from "firebase/firestore";
import { colRef } from "../../../firebase/config";
import CloseIcon from "@mui/icons-material/Close";

function AddImageModal({ openModal, setNewPost, userData, modalHandler }) {
  ////Upload data
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [errorFile, setErrorFile] = useState(null);

  const types = ["image/png", "image/jpeg"];
  const handleChangedFile = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      console.log("fired");
      setFile(selected);
      setErrorFile("");
    } else {
      setFile(null);
      setErrorFile("Please select an image file (png or jpg)");
    }
  };

  const handleClick = (e) => {
    if (e.target.id === "backdrop") {
      modalHandler(false);
    } else {
      return;
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setFile(null);
    setUrl(null);
    setErrorFile(null);
    modalHandler(false);
  };

  const formSubmitHandler = (e) => {
    e.preventDefault();
    addDoc(colRef, {
      name: name,
      user: userData.email,
      description: description,
      image: url,
      postedAt: serverTimestamp(),
    }).then(() => {
      setName("");
      setDescription("");
      setFile(null);
      setUrl(null);
      setErrorFile(null);
      setNewPost(true);
      modalHandler(false);
    });
  };

  return (
    <>
      <AnimatePresence>
        {openModal && (
          <motion.div
            id="backdrop"
            onClick={handleClick}
            className={classes.backdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div layout className={classes.modal}>
              <motion.span
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 1.1 }}
                onClick={handleClose}
                className={classes["close-icon"]}
              >
                <CloseIcon />
              </motion.span>
              <h4 className={classes["modal-title"]}>
                Add an Image to the gallery
              </h4>
              <form
                onSubmit={formSubmitHandler}
                className={classes["modal-form"]}
              >
                <label>Name:</label>
                <input
                  onFocus={() => setErrorFile("")}
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={classes.input}
                  required
                />
                <label>Description:</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={classes.input}
                  required
                ></input>
                <label>Image:</label>
                <input type="file" onChange={handleChangedFile} />
                <div className={classes.output}>
                  <AnimatePresence exitBeforeEnter>
                    {file && (
                      <ProgressBar
                        setUrl={setUrl}
                        file={file}
                        setFile={setFile}
                      />
                    )}
                    {errorFile && (
                      <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -10 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 1 }}
                        className={classes.error}
                      >
                        {errorFile}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                <div className={classes["button-container"]}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.1 }}
                    className={classes[url !== null ? "add" : "disabled"]}
                    type="submit"
                  >
                    Submit Post
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 1.1 }}
                    className={classes.cancel}
                    onClick={handleClose}
                    type="button"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default AddImageModal;
