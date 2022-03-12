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
  const [nameError, setNameError] = useState(false);
  const [description, setDescription] = useState("");
  const [descriptionError, setDescriptionError] = useState(false);
  const [file, setFile] = useState(null);
  const [url, setUrl] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const types = ["image/png", "image/jpeg"];

  const nameHandler = () => {
    if (name.trim().length === 0) {
      setNameError(true);
    } else {
      setNameError(false);
    }
  };

  const descriptionHandler = () => {
    if (description.trim().length === 0) {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };

  const handleChangedFile = (e) => {
    let selected = e.target.files[0];
    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setErrorMessage("");
    } else {
      setFile(null);
      setErrorMessage("Please select an image file (png or jpg)");
    }
  };

  const handleClick = (e) => {
    if (e.target.id === "backdrop") {
      setName("");
      setDescription("");
      setNameError(false);
      setDescriptionError(false);
      setFile(null);
      setUrl(null);
      setErrorMessage(null);
      modalHandler(false);
    } else {
      return;
    }
  };

  const handleClose = () => {
    setName("");
    setDescription("");
    setNameError(false);
    setDescriptionError(false);
    setFile(null);
    setUrl(null);
    setErrorMessage(null);
    modalHandler(false);
  };

  const formSubmitHandler = (e) => {
    if (
      file !== null &&
      description.trim().length > 0 &&
      name.trim().length > 0
    ) {
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
        setNameError(false);
        setDescriptionError(false);
        setFile(null);
        setUrl(null);
        setErrorMessage(null);
        setNewPost(true);
        modalHandler(false);
      });
    } else {
      e.preventDefault();
      return;
    }
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
                  placeholder={
                    nameError === true
                      ? "Must contain a character"
                      : "Image name"
                  }
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onBlur={nameHandler}
                  className={
                    classes[nameError === true ? "input-error" : "input"]
                  }
                  required
                />
                <label>Description:</label>
                <input
                  placeholder={
                    descriptionError === true
                      ? "Must contain a character"
                      : "Image description"
                  }
                  type="text"
                  value={description}
                  onBlur={descriptionHandler}
                  onChange={(e) => setDescription(e.target.value)}
                  className={
                    classes[nameError === true ? "input-error" : "input"]
                  }
                  required
                ></input>
                <label>Image:</label>
                <input required type="file" onChange={handleChangedFile} />
                <div className={classes.output}>
                  <AnimatePresence exitBeforeEnter>
                    {file && (
                      <ProgressBar
                        setUrl={setUrl}
                        file={file}
                        setFile={setFile}
                      />
                    )}
                    {errorMessage && (
                      <motion.div
                        animate={{ opacity: 1, x: 0 }}
                        initial={{ opacity: 0, x: -10 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 1 }}
                        className={classes.error}
                      >
                        {errorMessage}
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
