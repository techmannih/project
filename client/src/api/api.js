const API_URL = "https://project-hnh2.onrender.com";

export const signup = async (username, password) => {
  console.log("Signup request received:", { username, password });

  try {
    const response = await fetch(`${API_URL}/api/auth/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Signup failed. Please try again." };
      }
      console.error("Signup failed:", errorData.message || "Unknown error");
      throw new Error(errorData.message || "Signup failed");
    }

    const data = await response.json();
    console.log("Signup successful:", data);
    return data;
  } catch (error) {
    console.error("Error during signup:", error.message || error);
    throw new Error(error.message || "An error occurred during signup");
  }
};

export const login = async (username, password) => {
    console.log("Login request received:", { username });
  
    try {
      const response = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (!response.ok) {
        let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Login failed. Please try again." };
      }
      console.error("Login failed:", errorData.message || "Unknown error");
      throw new Error(errorData.message || "Login failed");
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
      console.log("Token:", data.token, "UserId:", data.user.id);
      return { token: data.token, userId: data.user.id };
    } catch (error) {
      console.error("Error during login:", error.message);
      throw new Error(error.message || "An error occurred during login");
    }
  };
  

export const uploadImage = async (token, imageData) => {
  console.log("Image upload request received");
  
  try {
    const response = await fetch(`${API_URL}/api/images/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: imageData,
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Image upload failed. Please try again." };
      }
      console.error("Image upload failed:", errorData.message || "Unknown error");
      throw new Error(errorData.message || "Image upload failed");
    }

    const data = await response.json();
    console.log("Image uploaded successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during image upload:", error.message || "An error occurred");
    throw new Error(error.message || "An error occurred during image upload");
  }
};

export const getUserImages = async (token, userId) => {
    console.log("Fetching user images request received for user ID:", userId);
  
    try {
      const response = await fetch(`${API_URL}/api/images/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
  
      if (!response.ok) {
        let errorData;
        try {
          errorData = await response.json();
        } catch (parseError) {
          errorData = { message: "Failed to fetch images. Please try again." };
        }
        console.error("Failed to fetch images:", errorData.message || "Unknown error");
        throw new Error(errorData.message || "Failed to fetch images");
      }
  
      const data = await response.json();
      console.log("User images fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error during fetching user images:", error.message || "An error occurred");
      throw new Error(error.message || "An error occurred during fetching user images");
    }
  };
  

export const incrementViewCount = async (token, imageId) => {
  console.log("Incrementing view count:", imageId);

  try {
    const response = await fetch(`${API_URL}/api/images/${imageId}/view`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Failed to increment view count. Please try again." };
      }
      console.error("Failed to increment view count:", errorData.message || "Unknown error");
      throw new Error(errorData.message || "Failed to increment view count");
    }

    const data = await response.json();
    console.log("View count incremented successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during view count increment:", error.message || "An error occurred");
    throw new Error(error.message || "An error occurred during view count increment");
  }
};

export const fetchImage = async (id, token) => {
  console.log("Fetching image:", id);

  try {
    const response = await fetch(`${API_URL}/api/images/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Failed to fetch image. Please try again." };
      }

      console.error("Failed to fetch image:", errorData.message || "Unknown error");
      throw new Error(errorData.message || "Failed to fetch image");
    }

    const data = await response.json();
    console.log("Image fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during fetching image:", error.message || "An error occurred");
    throw new Error(error.message || "An error occurred during fetching image");
  }
};

export const fetchAllImages = async (token) => {
  console.log("Fetching all images");

  try {
    const response = await fetch(`${API_URL}/api/images/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch (parseError) {
        errorData = { message: "Failed to fetch images. Please try again." };
      }
      console.error("Failed to fetch images:", errorData.message || "Unknown error");
      throw new Error(errorData.message || "Failed to fetch images");
    }

    const data = await response.json();
    console.log("Images fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during fetching images:", error.message || "An error occurred");
    throw new Error(error.message || "An error occurred during fetching images");
  }
};
