import classes from "./Post.module.scss";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { motion } from "framer-motion";
import useWindowDimensions from "../../../Hooks/useWindowDimension";
function Post({ post, setSelectedPost, galleryHandler }) {
  const { width } = useWindowDimensions();

  const postAndGalleryHandler = () => {
    if (width <= 1024) {
      setSelectedPost(post);
      galleryHandler(false);
    }
    setSelectedPost(post);
  };

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      transition={{ delay: 0.5 }}
      className={classes["single-post-container"]}
    >
      <div className={classes.post}>
        <div className={classes["image-container"]}>
          <img src={post.image} alt={post.name} />
        </div>
        <h4>{post.name}</h4>
      </div>
      <motion.button
        onClick={postAndGalleryHandler}
        whileHover={{ x: 20 }}
        whileTap={{ scale: 1.1 }}
        className={classes["button-container"]}
      >
        REVIEW <ArrowForwardIcon style={{ fontSize: 35, marginLeft: "1rem" }} />
      </motion.button>
    </motion.div>
  );
}

export default Post;
