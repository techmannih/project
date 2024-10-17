import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadImageAction } from "../../redux/actions/action";

const ImageUpload = ({ token, onClose }) => {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.imageUpload);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("title", title);
    formData.append("description", description);

    dispatch(uploadImageAction(token, formData));
    setTitle("");
    setDescription("");
    setFile(null);
    onClose();
  };

  return (
    <div className="flex flex-col">
      <div className="text-center py-6 text-xl font-bold">Upload Image</div>
      <form onSubmit={handleSubmit} className="flex flex-col">
        <div className="m-5">
          <input
            type="file"
            name="avatar"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="bg-black p-2"
          />
        </div>
        <div className="m-5">
          <input
            className="bg-black p-2 hover:border-white hover:border-2 hover:rounded-xl"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            required
          />
        </div>
        <div className="m-5">
          <input
            className="bg-black p-2 hover:border-white hover:border-2 hover:rounded-xl"
            type="text"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description"
            required
          />
        </div>
        {error && <p className="text-red-500 m-2 p-2">{error}</p>}
        <div className="text-center">
          <button
            type="submit"
            className={`cursor-pointer border-white border-2 rounded-xl font-bold py-3 px-24 ${
              loading ? "bg-gray-500" : "hover:bg-white hover:text-black"
            }`}
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Image"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ImageUpload;
