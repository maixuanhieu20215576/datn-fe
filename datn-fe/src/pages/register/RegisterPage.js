import * as React from "react";
import { useState } from "react";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import FilledInput from "@mui/material/FilledInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Button from "@mui/material/Button";
import LoginIcon from "@mui/icons-material/Login";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";

const language = [
  {
    value: "en",
    label: "English",
  },
  {
    value: "vi",
    label: "Vietnamese",
  },
];

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();

  const navigate = useNavigate();
  const handleLanguageChange = (e) => {
    console.log(e);
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };
  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== retypePassword) {
        setError(t("verifyError.passwordsNotMatch"));
        return;
      }
      if (password.length < 6) {
        setError(t("verifyError.passwordMinLength"));
        return;
      }
      const registerResponse = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/verify/register`,
        {
          username: email,
          password: password,
        }
      );
      if (registerResponse.data.user) {
        navigate("/login");
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
      setError(error.response.data.message);
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            bgcolor: "white",
            p: "16px 24px 24px 24px",
            borderRadius: 2,
            boxShadow: 3,
            width: "100%",
            maxWidth: "400px",
            justifyItems: "center",
          }}
        >
          <h2 className="text-2xl font-bold mb-2">{t("register")}</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <TextField
              fullWidth
              label={t("username")}
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                {t("password")}{" "}
              </InputLabel>
              <FilledInput
                sx={{ mb: 2 }}
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                {t("retypePassword")}{" "}
              </InputLabel>
              <FilledInput
                sx={{ mb: 2 }}
                id="filled-adornment-password"
                type={showPassword ? "text" : "password"}
                value={retypePassword}
                onChange={(e) => setRetypePassword(e.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      onMouseUp={handleMouseUpPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            {error && (
              <p
                style={{
                  color: "red",
                }}
              >
                {error}
              </p>
            )}
            <Button
              fullWidth
              variant="contained"
              endIcon={<LoginIcon />}
              type="submit"
              //sx={{ mt: 2 }}
            >
              {t("register")}
            </Button>
          </form>
        </Box>
        <TextField
          id="outlined-select-currency"
          select
          label="Select"
          defaultValue="en"
          helperText={t("chooseLanguage")}
          sx={{ mt: 3 }}
          onChange={handleLanguageChange}
        >
          {language.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>
    </div>
  );
}
