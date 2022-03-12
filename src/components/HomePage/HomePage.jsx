import classes from "./HomePage.module.scss";
import Gallery from "./Gallery/Gallery";
import SelectedPost from "./SelectedPost";
import NavBar from "./NavBar/NavBar";
import AddImageModal from "./AddImageModal/AddImageModal";
import { useState, useEffect, useContext } from "react";
import AuthContext from "../../store/auth-context";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import useWindowDimensions from "../../Hooks/useWindowDimension";
function HomePage() {
  const { width } = useWindowDimensions();
  //state handeling
  const [openModal, setOpenModal] = useState(false);
  const [newPost, setNewPost] = useState(true);
  const [selectedPost, setSelectedPost] = useState(null);
  const [userData, setUserData] = useState(null);
  const [openGallery, setOpenGallery] = useState(width <= 1024 ? false : true);

  const modalHandler = (e) => {
    setOpenModal(e);
  };

  const galleryHandler = (e) => {
    setOpenGallery(e);
  };

  const authCtx = useContext(AuthContext);
  //GetUserData
  useEffect(() => {
    const docRef = doc(db, "users", `${authCtx.user}`);
    getDoc(docRef).then((user) => {
      setUserData(user.data());
    });
  }, [authCtx.user]);

  return (
    <div className={classes["home-container"]}>
      <NavBar
        setOpenGallery={setOpenGallery}
        userData={userData}
        setOpenModal={setOpenModal}
      />
      <div className={classes["main-container"]}>
        <Gallery
          openGallery={openGallery}
          galleryHandler={galleryHandler}
          userData={userData}
          setSelectedPost={setSelectedPost}
          setNewPost={setNewPost}
          newPost={newPost}
        />
        <SelectedPost userData={userData} selectedPost={selectedPost} />
      </div>
      <AddImageModal
        userData={userData}
        setNewPost={setNewPost}
        openModal={openModal}
        modalHandler={modalHandler}
      />
    </div>
  );
}

export default HomePage;
