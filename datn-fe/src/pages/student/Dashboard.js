import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dashboardImage from "../../img/Screenshot 2025-02-24 145148.png";
export default function Dashboard() {
  return (
    <Box
      sx={{
        animation: "zoomIn 0.5s ease-in-out",
        width: "100%",
        height: "100%",
        backgroundColor: "#fff7eb",
      }}
    >
      <Box sx={{ m: 3 }}>
        <img
          src={dashboardImage}
          alt="Description"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
    </Box>
  );
}
