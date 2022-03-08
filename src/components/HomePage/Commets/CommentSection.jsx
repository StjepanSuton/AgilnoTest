import CloseIcon from "@mui/icons-material/Close";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import { useState } from "react";
import Comments from "./Comments";
import classes from "./CommentSection.module.scss";
import { motion, AnimatePresence } from "framer-motion";
function CommentSection({ selectedPost, userData }) {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className={classes["comment-section"]}>
      {!showComments && (
        <QuestionAnswerIcon
          onClick={() => setShowComments(!showComments)}
          style={{ fontSize: 50 }}
          className={classes.icons}
        />
      )}
      {showComments && (
        <CloseIcon
          onClick={() => setShowComments(!showComments)}
          style={{ fontSize: 50 }}
          className={classes.icons}
        />
      )}
      <AnimatePresence exitBeforeEnter>
        {showComments && (
          <motion.div
            animate={{ scale: 1 }}
            initial={{ scale: 0 }}
            exit={{ scale: 0 }}
            className={classes["comment-container"]}
          >
            <Comments
              setShowComments={setShowComments}
              userData={userData}
              selectedPost={selectedPost}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default CommentSection;
