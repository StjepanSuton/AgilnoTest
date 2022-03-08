import React from "react";
import classes from "./SelectedPost.module.scss";
import CommentSection from "./Commets/CommentSection";
import { AnimatePresence, motion } from "framer-motion";
function SelectedPost({ selectedPost, userData }) {
  return (
    <>
      <AnimatePresence exitBeforeEnter>
        {selectedPost !== null ? (
          <motion.div
            animate={{ opacity: 1 }}
            initial={{ opacity: 0 }}
            exit={{ opacity: 0 }}
            key={selectedPost.id}
            className={classes["main-post-container"]}
          >
            <div className={classes["main-image"]}>
              <img src={selectedPost.image} alt="test" />
            </div>
            <p className={classes["main-description"]}>
              {selectedPost.description}
            </p>
            <div className={classes["comment-section"]}>
              <CommentSection userData={userData} selectedPost={selectedPost} />
            </div>
          </motion.div>
        ) : (
          <div className={classes["main-post-container"]}>
            <h2 className={classes.message}>Please select a post from the gallery</h2>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

export default SelectedPost;
