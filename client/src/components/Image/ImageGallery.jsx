import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllImagesAction,
  getUserImagesAction,
  incrementViewCountAction,
} from "../../redux/actions/action";
import Modal from "./model";
import ImageUpload from "./UploadImage";
import { useNavigate } from "react-router-dom";

const ImageGallery = ({ token, userId, onLogout }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux state: Fetching all images and user images from the store
  const { images, loading: allImagesLoading, error: allImagesError } = useSelector(
    (state) => state.allImages
  );
  const { userImages, loading: userImagesLoading, error: userImagesError } = useSelector(
    (state) => state.userImages
  );

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState("all");

  const fetchImages = () => {
    if (viewMode === "my") {
      console.log("Fetching user images");
      dispatch(getUserImagesAction(token, userId));
    } else if (viewMode === "all") {
      console.log("Fetching all images");
      dispatch(fetchAllImagesAction(token));
    }
  };

  useEffect(() => {
    fetchImages();
  }, [viewMode, token, userId, dispatch]);

  const handleViewClick = async (imageId) => {
    try {
      await dispatch(incrementViewCountAction(token, imageId));
      navigate(`/image/${imageId}`);
    } catch (error) {
      console.error("Failed to increment view count:", error);
    }
  };

  const handleToggleView = (mode) => {
    console.log(`Switching to ${mode} view`);
    setViewMode(mode);
  };

  const renderImages = () => {
    if (viewMode === "all") {
      if (allImagesLoading) {
        return <p>Loading all images...</p>;
      }
      // if (allImagesError) {
      //   return <p className="text-red-500">Error: {allImagesError}</p>;
      // }
      if (images.images && images.images.length > 0) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {images.images.map((image) => (
              <div key={image._id} className="flex flex-col items-center">
                <h3 className="font-bold">{image.title || "Untitled"}</h3>
                <img
                  src={image.url}
                  alt={image.title || "Image"}
                  className="max-w-full h-auto rounded-lg"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <p>{image.description || "No description available."}</p>
                <button
                  onClick={() => handleViewClick(image._id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  View
                </button>
                <p className="mt-1">Views: {image.viewCount || 0}</p>
              </div>
            ))}
          </div>
        );
      } else {
        return <p>No images found.</p>;
      }
    } else if (viewMode === "my") {
      if (userImagesLoading) {
        return <p>Loading your images...</p>;
      }
      // if (userImagesError) {
      //   return <p className="text-red-500">Error: {userImagesError}</p>;
      // }
      if (userImages.images && userImages.images.length > 0) {
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {userImages.images.map((image) => (
              <div key={image._id} className="flex flex-col items-center">
                <h3 className="font-bold">{image.title || "Untitled"}</h3>
                <img
                  src={image.url}
                  alt={image.title || "Image"}
                  className="max-w-full h-auto rounded-lg"
                  style={{
                    width: "300px",
                    height: "300px",
                    objectFit: "cover",
                  }}
                />
                <p>{image.description || "No description available."}</p>
                <button
                  onClick={() => handleViewClick(image._id)}
                  className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-4 rounded"
                >
                  View
                </button>
                <p className="mt-1">Views: {image.viewCount || 0}</p>
              </div>
            ))}
          </div>
        );
      } else {
        return <p>No user images found.</p>;
      }
    }
  };

  return (
    <div className="h-full flex items-center justify-center">
      <div className="bg-black flex flex-col p-8 m-8 text-white border-white border-2 rounded-xl">
        <div className="flex justify-between mb-4">
          <h2 className="text-center py-6 text-xl font-bold">Image Gallery</h2>
          <button
            onClick={onLogout}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Logout
          </button>
        </div>

        {allImagesError && <p className="text-red-500">{allImagesError}</p>}
        {userImagesError && <p className="text-red-500">{userImagesError}</p>}

        <div className="text-center mb-4">
          <button
            onClick={() => handleToggleView("all")}
            className={`bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded mr-2 ${
              viewMode === "all" ? "bg-blue-500" : ""
            }`}
          >
            All Images
          </button>
          <button
            onClick={() => handleToggleView("my")}
            className={`bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ${
              viewMode === "my" ? "bg-blue-500" : ""
            }`}
          >
            My Images
          </button>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-white hover:bg-blue-700 text-black font-bold py-2 px-4 rounded ml-2"
          >
            Upload Image
          </button>
        </div>

        {renderImages()}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <ImageUpload token={token} onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default ImageGallery;
