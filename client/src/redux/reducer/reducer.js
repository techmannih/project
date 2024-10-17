import {
  IMAGE_UPLOAD_REQUEST, IMAGE_UPLOAD_SUCCESS, IMAGE_UPLOAD_FAILURE,
  GET_IMAGES_REQUEST, GET_IMAGES_SUCCESS, GET_IMAGES_FAILURE,
  VIEW_COUNT_INCREMENT_REQUEST, VIEW_COUNT_INCREMENT_SUCCESS, VIEW_COUNT_INCREMENT_FAILURE,
  FETCH_IMAGE_REQUEST, FETCH_IMAGE_SUCCESS, FETCH_IMAGE_FAILURE,
  FETCH_ALL_IMAGES_REQUEST, FETCH_ALL_IMAGES_SUCCESS, FETCH_ALL_IMAGES_FAILURE
} from '../constants/constant';

// Initial state for image upload
const initialUploadState = {
  loading: false,
  uploadedImage: null,
  error: null,
};

// Initial state for fetching user images
const initialUserImagesState = {
  loading: false,
  userImages: [],
  error: null,
};

// Initial state for incrementing view count
const initialViewCountState = {
  loading: false,
  viewCount: 0,
  error: null,
};

// Initial state for fetching a single image
const initialImageState = {
  loading: false,
  image: null,
  error: null,
};

// Initial state for fetching all images
const initialAllImagesState = {
  loading: false,
  images: [],
  error: null,
};

// Image Upload Reducer
export const imageUploadReducer = (state = initialUploadState, action) => {
  switch (action.type) {
    case IMAGE_UPLOAD_REQUEST:
      return { ...state, loading: true };
    case IMAGE_UPLOAD_SUCCESS:
      return { ...state, loading: false, uploadedImage: action.payload };
    case IMAGE_UPLOAD_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

// Fetch User Images Reducer
export const userImagesReducer = (state = initialUserImagesState, action) => {
  switch (action.type) {
    case GET_IMAGES_REQUEST:
      return { ...state, loading: true };
    case GET_IMAGES_SUCCESS:
      return { ...state, loading: false, userImages: action.payload };
    case GET_IMAGES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

// Increment View Count Reducer
export const viewCountReducer = (state = initialViewCountState, action) => {
  switch (action.type) {
    case VIEW_COUNT_INCREMENT_REQUEST:
      return { ...state, loading: true };
    case VIEW_COUNT_INCREMENT_SUCCESS:
      return { ...state, loading: false, viewCount: action.payload };
    case VIEW_COUNT_INCREMENT_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

// Fetch Single Image Reducer
export const imageReducer = (state = initialImageState, action) => {
  switch (action.type) {
    case FETCH_IMAGE_REQUEST:
      return { ...state, loading: true };
    case FETCH_IMAGE_SUCCESS:
      return { ...state, loading: false, image: action.payload };
    case FETCH_IMAGE_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

// Fetch All Images Reducer
export const allImagesReducer = (state = initialAllImagesState, action) => {
  switch (action.type) {
    case FETCH_ALL_IMAGES_REQUEST:
      return { ...state, loading: true };
    case FETCH_ALL_IMAGES_SUCCESS:
      return { ...state, loading: false, images: action.payload };
    case FETCH_ALL_IMAGES_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};
