import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";

const CoursesList = [
  {
    image: "image1.jpg",
    title: "title1",
    description: "description1",
  },
  {
    image: "image2.jpg",
    title: "title2",
    description: "description2",
  },
  {
    image: "image2.jpg",
    title: "title2",
    description: "description2",
  },
  {
    image: "image2.jpg",
    title: "title2",
    description: "description2",
  },
  {
    image: "image2.jpg",
    title: "title2",
    description: "description2",
  },
];

function CourseCard({ course }) {
  return (
    <Card sx={{ width: 345, m: 2 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={course.image}
          alt={course.title}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {course.description}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default function Courses() {
  return (
    <Box
      sx={{ display: "flex", flexWrap: "wrap", justifyContent: "left", m: 3 }}
    >
      {CoursesList.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </Box>
  );
}
