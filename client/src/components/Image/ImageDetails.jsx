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
    <div className="flex flex-col items-center text-white mt-24">
      <div key={image.image.id} className="m-2 flex max-md:flex-col justify-center  p-2 ">
        <img
          src={image.image.url}
          alt={image.image.title || "Image"}
          width={400}
          height={300}
          className="h-auto"
        />
        <div className=" md:m-2  md:p-2">
          <h2 className="text-xl  m-1">
            Title: {image.image.title || "Untitled"}
          </h2>
          <p className="m-1">
            Decription: {image.image.description || "No description available."}
          </p>
          <p className="m-1">Views: {image.image.viewCount || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default ImageDetail;
