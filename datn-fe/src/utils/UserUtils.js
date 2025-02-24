export async function fetchUserData(userId) {
  try {
    const response = await fetch(`https://datn-be-3ju1.onrender.com/user/${userId}`);
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
