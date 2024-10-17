import {
  IMAGE_UPLOAD_REQUEST,
  IMAGE_UPLOAD_SUCCESS,
  IMAGE_UPLOAD_FAILURE,
  GET_IMAGES_REQUEST,
  GET_IMAGES_SUCCESS,
  GET_IMAGES_FAILURE,
  VIEW_COUNT_INCREMENT_REQUEST,
  VIEW_COUNT_INCREMENT_SUCCESS,
  VIEW_COUNT_INCREMENT_FAILURE,
  FETCH_IMAGE_REQUEST,
  FETCH_IMAGE_SUCCESS,
  FETCH_IMAGE_FAILURE,
  FETCH_ALL_IMAGES_REQUEST,
  FETCH_ALL_IMAGES_SUCCESS,
  FETCH_ALL_IMAGES_FAILURE,
} from "../constants/constant";

import {
  uploadImage,
  getUserImages,
  incrementViewCount,
  fetchImage,
  fetchAllImages,
} from "../../api/api";

// Utility function to handle errors
const getErrorMessage = (error, defaultMessage) => error?.message || defaultMessage;

// Upload Image Action
export const uploadImageAction = (token, imageData) => async (dispatch) => {
  dispatch({ type: IMAGE_UPLOAD_REQUEST });

  try {
    const data = await uploadImage(token, imageData);
    dispatch({ type: IMAGE_UPLOAD_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: IMAGE_UPLOAD_FAILURE, error: getErrorMessage(error, "Failed to upload image.") });
  }
};

// Fetch User Images Action
export const getUserImagesAction = (token, userId) => async (dispatch) => {
  console.log("Fetching user images for user ID:", userId);
  dispatch({ type: GET_IMAGES_REQUEST });

  try {
    const data = await getUserImages(token, userId);
    dispatch({ type: GET_IMAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: GET_IMAGES_FAILURE, error: getErrorMessage(error, "Failed to fetch user images.") });
  }
};

// Increment View Count Action
export const incrementViewCountAction = (token, imageId) => async (dispatch) => {
  dispatch({ type: VIEW_COUNT_INCREMENT_REQUEST });

  try {
    const data = await incrementViewCount(token, imageId);
    dispatch({ type: VIEW_COUNT_INCREMENT_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: VIEW_COUNT_INCREMENT_FAILURE, error: getErrorMessage(error, "Failed to increment view count.") });
  }
};

// Fetch Single Image Action
export const fetchImageAction = (id, token) => async (dispatch) => {
  dispatch({ type: FETCH_IMAGE_REQUEST });

  try {
    const data = await fetchImage(id, token);
    dispatch({ type: FETCH_IMAGE_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_IMAGE_FAILURE, error: getErrorMessage(error, "Failed to fetch image.") });
  }
};

// Fetch All Images Action
export const fetchAllImagesAction = (token) => async (dispatch) => {
  dispatch({ type: FETCH_ALL_IMAGES_REQUEST });

  try {
    const data = await fetchAllImages(token);
    console.log("All images fetched successfully from action:", data);
    dispatch({ type: FETCH_ALL_IMAGES_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: FETCH_ALL_IMAGES_FAILURE, error: getErrorMessage(error, "Failed to fetch all images.") });
  }
};
