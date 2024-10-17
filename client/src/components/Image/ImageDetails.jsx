import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchImageAction } from "../../redux/actions/action";

const ImageDetail = ({ token }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, image, error } = useSelector((state) => state.singleImage);

  useEffect(() => {
    if (id && token) {
      dispatch(fetchImageAction(id, token));
    }
  }, [id, token, dispatch]);

  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!image) {
    return <p>Image not found</p>;
  }

  return (
    <div className="flex flex-col items-center text-white">
      <div key={image.image.id} className="mb-4">
        <h2 className="text-xl font-bold">{image.image.title || "Untitled"}</h2>
        <img
          src={image.image.url}
          alt={image.image.title || "Image"}
          className="max-w-full h-auto"
        />
        <p>{image.image.description || "No description available."}</p>
        <p>Views: {image.image.viewCount || 0}</p>
      </div>
    </div>
  );
};

export default ImageDetail;
