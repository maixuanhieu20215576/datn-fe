export async function fetchUserData(userId) {
  try {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`);
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const userInfo = await response.json();
    console.log("userInfo", userInfo);
    return userInfo;
  } catch (error) {
    console.error("Failed to fetch user info:", error);
    throw error;
  }
}
