import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import Button from "@mui/material/Button";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Avatar } from "@mui/material";
import axios from "axios";
import imageCompression from "browser-image-compression";
import { useSession } from "../../utils/SessionContext";
import { fetchUserData } from "../../utils/UserUtils";

const languageMap = [
  { value: "en", label: "English" },
  { value: "vi", label: "Vietnamese" },
];

export default function Setting() {
  const { session, setSession } = useSession();
  const [userSetting, setUserSetting] = React.useState(null);
  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchUserData(session.user._id);
        setUserSetting(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    if (session?.user?._id) {
      fetchData();
    }
  }, [session?.user?._id]);

  const user = JSON.parse(localStorage.getItem("user"));
  const [expanded, setExpanded] = React.useState(false);
  const [language, setLanguage] = React.useState("en"); // Default value
  const [email, setEmail] = React.useState("example@gmail.com");
  const [isEditing, setIsEditing] = React.useState(false);
  const [isAvatarEditing, setAvatarIsEditing] = React.useState(false);
  const [avatar, setAvatar] = React.useState(
    "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
  );
  const [previewAvatar, setPreviewAvatar] = React.useState(
    "https://as1.ftcdn.net/v2/jpg/05/16/27/58/1000_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
  );

  React.useEffect(() => {
    if (userSetting) {
      console.log(userSetting);
      setLanguage(userSetting.language);
      setEmail(userSetting.email);
      setAvatar(userSetting.avatar);
      setPreviewAvatar(userSetting.avatar);
    }
  }, [userSetting]);

  const fileInputRef = React.useRef(null);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const toggleEdit = () => {
    if (isEditing && !validateEmail(email)) {
      alert("Invalid email address");
      return;
    }
    setIsEditing((prev) => !prev);
  };

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleAvatarChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const options = {
        maxSizeMB: 1, // Giảm xuống dưới 1MB
        maxWidthOrHeight: 1024, // Giới hạn chiều rộng/cao
        useWebWorker: true,
      };
      try {
        const compressedFile = await imageCompression(file, options);
        setAvatar(compressedFile); // Lưu file đã nén
        const previewURL = URL.createObjectURL(compressedFile);
        setPreviewAvatar(previewURL); // Xem trước
      } catch (error) {
        console.log("Lỗi khi nén ảnh:", error);
      }
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleLanguageOnChange = (event) => {
    setLanguage(event.target.value);
  };
  const handleEditClick = () => {
    if (isEditing) {
      // Nếu đang ở chế độ chỉnh sửa, lưu lại ảnh
      setIsEditing(false);
    } else {
      // Mở hộp thoại chọn ảnh
      fileInputRef.current.click();
    }
  };

  const handleSaveSettings = async () => {
    const formData = new FormData();
    formData.append("email", email || user.email);
    formData.append("language", language || user.language);
    formData.append("image", avatar || user.avatar); // avatarFile là file ảnh bạn chọn
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/user`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            userId: user._id,
          },
          timeout: 5000,
        }
      );
      setSession({
        user: {
          _id: response.data.updatedUser._id,
          name: response.data.updatedUser.username,
          image: response.data.updatedUser.avatar,
          email: response.data.updatedUser.email,
          language: response.data.updatedUser.language,
        },
      });
      alert("Cài đặt đã được lưu thành công!");
    } catch (error) {
      alert("Đã xảy ra lỗi khi lưu cài đặt!", error);
    }
  };
  React.useEffect(() => {
    return () => {
      if (previewAvatar) URL.revokeObjectURL(previewAvatar);
    };
  }, [previewAvatar]);

  return (
    <Box sx={{ p: 3, ml: 3, mt: 3 }}>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            component="span"
            sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
          >
            General settings
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" alignItems="center">
            <Typography sx={{ mr: 20 }}>Language:</Typography>
            <TextField
              id="outlined-select-language"
              select
              value={language}
              onChange={handleLanguageOnChange}
            >
              {languageMap.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </Box>
        </AccordionDetails>
      </Accordion>

      <Accordion
        expanded={expanded === "panel2"}
        onChange={handleChange("panel2")}
        sx={{ mt: 3 }}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography
            component="span"
            sx={{ width: "33%", flexShrink: 0, fontWeight: "bold" }}
          >
            User information
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" alignItems="center">
            <Typography sx={{ pr: 20 }}>Email:</Typography>
            <TextField
              id="outlined-email"
              variant="outlined"
              value={email}
              onChange={handleEmailChange}
              disabled={!isEditing}
              sx={{ mr: 2, width: 300 }}
            />
            <Button
              variant="contained"
              color={isEditing ? "success" : "primary"}
              onClick={toggleEdit}
            >
              {isEditing ? "Save" : "Edit"}
            </Button>
          </Box>
          <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
            <Typography sx={{ mb: 2, mr: 20 }}>Avatar:</Typography>
            <Avatar
              alt="User Avatar"
              src={previewAvatar || user.avatar}
              sx={{ width: 150, height: 150, mb: 2, mr: 20 }}
            />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <Button
              variant="contained"
              color={isAvatarEditing ? "success" : "primary"}
              onClick={handleEditClick}
            >
              {isAvatarEditing ? "Save" : "Edit"}
            </Button>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Box display="flex" justifyContent="center" mt={4}>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSaveSettings}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
}
