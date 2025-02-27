import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import backgroundImage from "../../img/Screenshot 2025-02-24 163710.png";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Flag from "react-world-flags";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import SendIcon from "@mui/icons-material/Send";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import UndoIcon from "@mui/icons-material/Undo";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid2";

const StyledTypography = styled(Typography)({
  color: "#636e72",
  fontWeight: "bold", // If you want the text to be bold
});

const languageWithFlagMap = {
  Vietnamese: <Flag code="VN" style={{ maxHeight: 20, marginRight: 10 }} />,
  English: <Flag code="US" style={{ maxHeight: 20, marginRight: 10 }} />,
  Japanese: <Flag code="JP" style={{ maxHeight: 20, marginRight: 10 }} />,
  Korean: <Flag code="KR" style={{ maxHeight: 20, marginRight: 10 }} />,
  Spanish: <Flag code="ES" style={{ maxHeight: 20, marginRight: 10 }} />,
  French: <Flag code="FR" style={{ maxHeight: 20, marginRight: 10 }} />,
  German: <Flag code="DE" style={{ maxHeight: 20, marginRight: 10 }} />,
  Chinese: <Flag code="CN" style={{ maxHeight: 20, marginRight: 10 }} />,
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function ApplyTeaching() {
  const [teachingLanguage, setTeachingLanguage] = React.useState("");
  const [CV, setCV] = React.useState(null);
  const [previewCVName, setPreviewCVName] = React.useState("Upload Your CV");
  const [CvError, setCvError] = React.useState("");
  const [teachingCommitment, setTeachingCommitment] = React.useState("");
  const [isChecked, setIsChecked] = React.useState(false);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [languageSkills, setLanguageSkills] = React.useState("");

  const handleSendClick = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCompleteSubmittion = () => {
    setDialogOpen(false);
  };
  const handleTeachingLanguageChange = (event) => {
    console.log(event);
    setTeachingLanguage(event.target.value);
  };

  const handleTeachingCommitmentChange = (event) => {
    setTeachingCommitment(event.target.value);
  };

  const handleChecked = () => {
    setIsChecked(!isChecked);
  };

  const handleCVChange = (event) => {
    if (
      event.target.files[0].type !== "application/pdf" &&
      event.target.files[0].type !== "application/msword" &&
      event.target.files[0].type !==
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      setCvError("Please upload a valid CV file (pdf, doc, docx)");
      return;
    }
    if (event.target.files[0].size > 5000000) {
      setCvError("Please upload a file smaller than 5MB");
      return;
    }
    setCV(event.target.files);
    const previewCVNameBefore = event.target.files[0].name;
    setPreviewCVName("... " + previewCVNameBefore.slice(-15));
  };

  const handleLanguageSkillsChange = (event) => {
    setLanguageSkills(event.target.value);
  };
  return (
    <Box
      sx={{
        backgroundColor: "#fff7eb",
        height: "100vh",
        overflow: "auto",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        pb: 5,
      }}
    >
      <Box sx={{ m: 3 }}>
        <img
          src={backgroundImage}
          alt="Description"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <StyledTypography
        variant="h6"
        align="left"
        sx={{ ml: 10, mr: 10, mb: 3 }}
      >
        When registering as a teacher at a language center, individuals are
        responsible for providing accurate information about their
        qualifications, following teaching guidelines, maintaining
        professionalism, being punctual, and actively supporting students'
        learning progress.
      </StyledTypography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <StyledTypography sx={{}}>Teaching language:</StyledTypography>
        <FormControl sx={{ m: 1, width: "20vw" }}>
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select
            value={teachingLanguage}
            label="Teaching Language"
            onChange={handleTeachingLanguageChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 250, // Limit the height of dropdown to make it scrollable if needed
                },
              },
              anchorOrigin: {
                vertical: "bottom", // Ensure the dropdown opens from the bottom
                horizontal: "left", // Align dropdown to the left (or use 'center' or 'right' as needed)
              },
              transformOrigin: {
                vertical: "top", // Ensure the dropdown is positioned correctly relative to the select box
                horizontal: "left",
              },
            }}
          >
            {Object.entries(languageWithFlagMap).map(
              ([languageName, flag], index) => {
                return (
                  <MenuItem
                    key={index}
                    value={languageName} // You should probably use languageName as value
                    sx={{ display: "flex" }}
                  >
                    {flag} {languageName}
                  </MenuItem>
                );
              }
            )}
          </Select>
        </FormControl>
        <IconButton variant="contained">
          <AddIcon />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <StyledTypography>Teaching commitment: </StyledTypography>
        <FormControl sx={{ width: "20vw", mt: 3, mr: 4, mb: 4, ml: 2 }}>
          <InputLabel id="demo-simple-select-label">Commitment</InputLabel>
          <Select
            value={teachingCommitment}
            label="Teaching commitment"
            onChange={handleTeachingCommitmentChange}
            MenuProps={{
              PaperProps: {
                sx: {
                  maxHeight: 250, // Limit the height of dropdown to make it scrollable if needed
                },
              },
              anchorOrigin: {
                vertical: "bottom", // Ensure the dropdown opens from the bottom
                horizontal: "left", // Align dropdown to the left (or use 'center' or 'right' as needed)
              },
              transformOrigin: {
                vertical: "top", // Ensure the dropdown is positioned correctly relative to the select box
                horizontal: "left",
              },
            }}
          >
            <MenuItem value="partTime">Part-time</MenuItem>
            <MenuItem value="fullTime">Full-time</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        <StyledTypography>Language skills: </StyledTypography>

        <TextField
          helperText="e.g: 750 TOEIC, 7.0 IELTS, etc."
          id="outlined-multiline-static"
          label="Language skills"
          sx={{ width: "20vw", ml: 3, mb: 2 }}
          multiline
          rows={4}
          value={languageSkills}
          onChange={handleLanguageSkillsChange}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
        <StyledTypography sx={{ fontWeight: "bold" }}>
          Your certificates:{" "}
        </StyledTypography>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          sx={{
            width: "20vw",
            ml: 3,
            backgroundColor: "#a29bfe",
            transition: "background-color 0.2s ease-in-out", // Hiệu ứng chuyển đổi màu
            "&:hover": {
              backgroundColor: "#00cec9", // Màu xanh lá khi hover
            },
          }}
        >
          {previewCVName}
          <VisuallyHiddenInput
            type="file"
            onChange={handleCVChange}
            multiple
            //   style={{ display: "none" }}
          />
        </Button>
      </Box>
      {CvError && (
        <Typography color="error">
          Please upload a valid CV file (pdf, doc, docx)
        </Typography>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          alignContent: "center",
          justifyContent: "center",
        }}
      >
        {" "}
      </Box>
      <FormControlLabel
        sx={{ marginTop: 2 }}
        control={
          <Checkbox
            checked={isChecked}
            onChange={handleChecked}
            sx={{ "&.Mui-checked": { color: "#a29bfe" } }}
          />
        }
        label="I guarantee that my certificates are authentic and valid."
      />
      <Button
        variant="contained"
        endIcon={<SendIcon />}
        sx={{
          backgroundColor: "#a29bfe",
          m: 3,
          transition: "background-color 0.2s ease-in-out", // Hiệu ứng chuyển đổi màu
          "&:hover": {
            backgroundColor: "#00cec9", // Màu xanh lá khi hover
          },
        }}
        onClick={handleSendClick}
      >
        Send
      </Button>
      <Dialog
        open={dialogOpen}
        onClose={handleDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            When you submit your application, you will not be able to modify it.
            Are you sure you want to submit it?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleDialogClose}
            sx={{ color: "#ff7675", fontWeight: "bold" }}
          >
            Undo
            <UndoIcon sx={{ ml: 1 }} />
          </Button>
          <Button
            onClick={handleCompleteSubmittion}
            sx={{ color: "#00b894", fontWeight: "bold" }}
            autoFocus
          >
            Send
            <SendIcon sx={{ ml: 1 }} />
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
