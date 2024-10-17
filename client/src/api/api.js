const API_URL = "http://localhost:5000";

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
      const errorText = await response.text();
      console.error("Signup failed:", errorText);
      throw new Error(errorText || "Signup failed");
    }

    const data = await response.json();
    console.log("Signup successful:", data);
    return data;
  } catch (error) {
    console.error("Error during signup:", error);
    throw error;
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
        const errorText = await response.text();
        console.error("Login failed:", errorText);
        throw new Error(errorText || "Login failed");
      }
  
      const data = await response.json();
      console.log("Login successful:", data);
      console.log("Token:", data.token, "UserId:", data.user.id);
      return { token: data.token, userId: data.user.id };
    } catch (error) {
      console.error("Error during login:", error);
      throw error;
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
      const errorText = await response.text();
      console.error("Image upload failed:", errorText);
      throw new Error(errorText || "Image upload failed");
    }

    const data = await response.json();
    console.log("Image uploaded successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during image upload:", error);
    throw error;
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
        const errorText = await response.text();
        console.error("Failed to fetch images:", errorText);
        throw new Error(errorText || "Failed to fetch images");
      }
  
      const data = await response.json();
      console.log("User images fetched successfully:", data);
      return data;
    } catch (error) {
      console.error("Error during fetching user images:", error);
      throw error;
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
      const errorText = await response.text();
      console.error("Failed to increment view count:", errorText);
      throw new Error(errorText || "Failed to increment view count");
    }

    const data = await response.json();
    console.log("View count incremented successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during view count increment:", error);
    throw error;
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
      const errorText = await response.text();
      console.error("Failed to fetch image:", errorText);
      throw new Error(errorText || "Failed to fetch image");
    }

    const data = await response.json();
    console.log("Image fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during fetching image:", error);
    throw error;
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
      const errorText = await response.text();
      console.error("Failed to fetch images:", errorText);
      throw new Error(errorText || "Failed to fetch images");
    }

    const data = await response.json();
    console.log("Images fetched successfully:", data);
    return data;
  } catch (error) {
    console.error("Error during fetching images:", error);
    throw error;
  }
};
