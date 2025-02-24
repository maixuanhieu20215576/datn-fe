import React, { createContext, useState, useContext } from "react";

const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [session, setSession] = useState({
    user: {
      _id: user?._id,
      name: user?.username || "Guest",
      image: user?.avatar || "",
      email: user?.email || "",
      language: user?.language || "en",
    },
  });

  return (
    <SessionContext.Provider value={{ session, setSession }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => useContext(SessionContext);
