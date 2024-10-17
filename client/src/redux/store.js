import { configureStore } from "@reduxjs/toolkit";
import {
  imageUploadReducer,
  userImagesReducer,
  viewCountReducer,
  imageReducer,
  allImagesReducer,
} from "./reducer/reducer";

const store = configureStore({
  reducer: {
    imageUpload: imageUploadReducer,
    userImages: userImagesReducer,
    viewCount: viewCountReducer,
    singleImage: imageReducer,
    allImages: allImagesReducer,
  },
});

export default store;
