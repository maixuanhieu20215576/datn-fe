import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import dashboardImage from "../../img/pexels-jupen-734168.jpg";
export default function Dashboard() {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        p: 2,
        animation: "fadeIn 1s ease-in-out",
      }}
    >
      <Box
        sx={{
          animation: "zoomIn 0.5s ease-in-out",
        }}
      >
        <img
          src={dashboardImage}
          alt="Description"
          style={{ width: "80%", height: "auto" }}
        />
      </Box>
      <Box sx={{padding: 2} }>
        {" "}
        <Typography
          sx={{
            textAlign: "left",
            p: 1,
            animation: "slideInLeft 1s ease-in-out",
            color: "primary.main",
          }}
        >
          Our website is an online platform designed for learners of all levels,
          from beginners to those looking to enhance their speaking and writing
          skills in English. With a wide variety of lessons, diverse vocabulary,
          and quizzes to help you practice, we are committed to providing an
          engaging and effective learning environment.
        </Typography>
        <Typography
          sx={{
            fontWeight: "bold",
            fontSize: "1.5em",
            textAlign: "left",
            animation: "slideInRight 1s ease-in-out",
            color: "secondary.main",
          }}
        >
          Join us now to improve your language skills and open up new
          opportunities for learning and career growth! 💐
        </Typography>
      </Box>
    </Box>
  );
}
