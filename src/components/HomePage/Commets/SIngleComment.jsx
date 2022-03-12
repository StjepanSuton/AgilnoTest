import { motion, AnimatePresence } from "framer-motion";
import CloseIcon from "@mui/icons-material/Close";
import CreateIcon from "@mui/icons-material/Create";
import classes from "./SingleComment.module.scss";
import { db } from "../../../firebase/config";
import { doc, updateDoc } from "firebase/firestore";
import { useContext, useState } from "react";
import AuthContext from "../../../store/auth-context";
function SIngleComment({
  comment,
  deleteCommentHandler,
  selectedPost,
  setManageCommentId,
  manageCommentId,
  setLoadedComments,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [startEditig, setStartEditign] = useState(false);
  const [edditComment, setEdditComment] = useState("");
  const [errorComment, setErrorComment] = useState(null);

  const authCtx = useContext(AuthContext);

  const editCommentHandler = () => {
    if (edditComment.trim().length > 0) {
      const docRef = doc(
        db,
        `posts/${selectedPost.id}/comments/${manageCommentId}`
      );
      updateDoc(docRef, {
        comment: edditComment,
      }).then(() => {
        setStartEditign(false);
        setEdditComment("");
        setLoadedComments(false);
      });
    } else {
      setErrorComment("Must contain a character");
      setEdditComment("");
      setTimeout(() => {
        setErrorComment(null);
      }, 3000);
    }
  };
  //used for more complex animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        delay: 0.5,
      },
    },
    exit: {
      opacity: 0,
    },
  };

  return (
    <motion.div>
      <AnimatePresence
        onExitComplete={() => {
          setStartEditign(true);
        }}
      >
        {!isEditing && (
          <motion.div
            variants={container}
            animate="show"
            initial="hidden"
            exit="exit"
            className={classes["user-comment"]}
          >
            {comment.user === authCtx.user ? (
              ""
            ) : (
              <motion.img src={comment.userImage} />
            )}

            <motion.h6
              className={
                classes[
                  comment.user === authCtx.user
                    ? "owner-comment-text"
                    : "comment-text"
                ]
              }
              onMouseEnter={() =>
                comment.user === authCtx.user
                  ? setManageCommentId(comment.id)
                  : setManageCommentId(null)
              }
              onMouseLeave={() => setManageCommentId(null)}
            >
              {comment.comment}
              <AnimatePresence>
                {manageCommentId === comment.id ? (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={classes.edit}
                  >
                    <span onClick={() => setIsEditing(true)}>
                      <CreateIcon style={{ fontSize: 12 }} />
                    </span>
                    <span onClick={deleteCommentHandler}>
                      <CloseIcon style={{ fontSize: 12 }} />
                    </span>
                  </motion.span>
                ) : (
                  ""
                )}
              </AnimatePresence>
            </motion.h6>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence onExitComplete={() => setIsEditing(false)}>
        {startEditig && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={classes["user-comment"]}
          >
            <motion.div
              className={
                classes[
                  errorComment === null ? "edit-input" : "edit-input-error"
                ]
              }
            >
              <motion.input
                value={edditComment}
                onChange={(e) => setEdditComment(e.target.value)}
                placeholder={
                  errorComment === null ? "EDIT YOUR COMMENT" : errorComment
                }
              />
              <CreateIcon
                onClick={editCommentHandler}
                className={classes.icon}
              />
              <motion.button
                onClick={() => setStartEditign(false)}
                className={classes.cancel}
              >
                Cancel
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default SIngleComment;
