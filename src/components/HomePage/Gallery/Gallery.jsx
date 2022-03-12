import React, { useEffect, useState } from "react";
import classes from "./Gallery.module.scss";
import SearchIcon from "@mui/icons-material/Search";
import ArrowBackOutlinedIcon from "@mui/icons-material/ArrowBackOutlined";
import { getDocs, orderBy, query } from "firebase/firestore";
import { colRef } from "../../../firebase/config";
import Post from "./Post";
import { AnimatePresence, motion } from "framer-motion";
function Gallery({
  newPost,
  setNewPost,
  setSelectedPost,
  galleryHandler,
  openGallery,
}) {
  const [posts, setPosts] = useState(null);
  const [filteredPosts, setFilteredPosts] = useState("");

  //Get Posts and check for new posts
  useEffect(() => {
    if (newPost) {
      const q = query(colRef, orderBy("postedAt", "desc"));
      let posts = [];
      getDocs(q).then((snapshot) => {
        snapshot.docs.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id });
        });
        setPosts(posts);
        setNewPost(false);
      });
    } else {
      return;
    }
  }, [newPost]);

  return (
    <AnimatePresence>
      {openGallery && (
        <motion.div
          animate={{ x: 0 }}
          initial={{ x: -1000 }}
          exit={{ x: -1000 }}
          transition={{ type: "just", stiffness: 100, duration: 0.7 }}
          className={classes["gallery-container"]}
        >
          <motion.span
            whileTap={{ scale: 1.2 }}
            onClick={() => galleryHandler(false)}
            className={classes["close-icon"]}
          >
            <ArrowBackOutlinedIcon />
          </motion.span>
          <h4 className={classes["gallery-title"]}>Image Gallery</h4>
          <div className={classes["search-input"]}>
            <input
              value={filteredPosts}
              onChange={(e) => setFilteredPosts(e.target.value)}
              placeholder="Search showcase..."
            />
            <SearchIcon className={classes.icon} />
          </div>
          <motion.div className={classes["post-container"]}>
            <AnimatePresence>
              {posts &&
                posts
                  .filter((post) => {
                    if (filteredPosts === "") {
                      return post;
                    } else if (
                      post.name
                        .toLowerCase()
                        .includes(filteredPosts.toLowerCase())
                    ) {
                      return post;
                    }
                  })
                  .map((post) => (
                    <motion.div layout key={post.id}>
                      <Post
                        galleryHandler={galleryHandler}
                        setSelectedPost={setSelectedPost}
                        post={post}
                      />
                    </motion.div>
                  ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Gallery;
