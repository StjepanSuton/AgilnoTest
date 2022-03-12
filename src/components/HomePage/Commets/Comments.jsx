import React, { useContext, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import classes from "./Comments.module.scss";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../../../firebase/config";
import SIngleComment from "./SIngleComment";
import AuthContext from "../../../store/auth-context";

function Comments({ selectedPost, userData, setShowComments }) {
  //For checking for new comments
  const [allComments, setAllComments] = useState(null);
  const [loadedComments, setLoadedComments] = useState(false);
  //Adding deleteing,editing,error handlling comments
  const [addComment, setAddComment] = useState("");
  const [manageCommentId, setManageCommentId] = useState(null);
  const [errorComment, setErrorComment] = useState(null);
  //user Data
  const authCtx = useContext(AuthContext);
  //Loading initial comments, checking for new comments
  useEffect(() => {
    if (!loadedComments) {
      const docRef = collection(db, "posts", `${selectedPost.id}/comments`);
      const q = query(docRef, orderBy("postedAt", "asc"));
      getDocs(q).then((snapshot) => {
        let comments = [];
        snapshot.docs.forEach((doc) => {
          comments.push({ ...doc.data(), id: doc.id });
        });
        setAllComments(comments);
        setLoadedComments(true);
      });
    } else {
      return;
    }
  }, [loadedComments, selectedPost]);

  //Adding new comment
  const addCommentHandler = () => {
    if (addComment.trim().length > 0) {
      addDoc(collection(db, `posts/${selectedPost.id}/comments`), {
        comment: addComment,
        user: userData.email,
        userImage: userData.image,
        postedAt: serverTimestamp(),
      }).then((q) => {
        setAddComment("");
        setLoadedComments(false);
      });
    } else {
      setErrorComment("Must contain a character");
      setAddComment("");
      setTimeout(() => {
        setErrorComment(null);
      }, 3000);
    }
  };

  const deleteCommentHandler = () => {
    const docRef = doc(
      db,
      `posts/${selectedPost.id}/comments/${manageCommentId}`
    );
    deleteDoc(docRef).then(() => {
      setLoadedComments(false);
    });
  };

  return (
    <motion.div
      exit={{ scale: 0, y: 150, x: 110, opacity: 0 }}
      animate={{ scale: 1 }}
      initial={{ scale: 0 }}
      className={classes["coments-section-container"]}
    >
      <div className={classes["comments-header"]}>
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 1.1 }}
          onClick={() => setShowComments(false)}
        >
          <ArrowBackIosIcon />
        </motion.div>
        <h6>{selectedPost.name}</h6>
      </div>
      <motion.div className={classes.comments}>
        <img src={selectedPost.image} alt={selectedPost.image} />
        <AnimatePresence>
          {allComments &&
            allComments.map((comment, i) => (
              <motion.div
                className={
                  classes[comment.user === authCtx.user ? "owner-layout" : ""]
                }
                layout
                key={comment.id}
              >
                <SIngleComment
                  comment={comment}
                  selectedPost={selectedPost}
                  manageCommentId={manageCommentId}
                  setManageCommentId={setManageCommentId}
                  deleteCommentHandler={deleteCommentHandler}
                  setLoadedComments={setLoadedComments}
                />
              </motion.div>
            ))}
        </AnimatePresence>
      </motion.div>
      <div
        className={
          classes[
            errorComment === null ? "comment-input" : "comment-input-error"
          ]
        }
      >
        <motion.input
          value={addComment}
          onChange={(e) => setAddComment(e.target.value)}
          placeholder={
            errorComment === null ? `LEAVE A COMMENT` : `${errorComment}`
          }
        />
        <SendIcon onClick={addCommentHandler} className={classes.icon} />
      </div>
    </motion.div>
  );
}

export default Comments;
