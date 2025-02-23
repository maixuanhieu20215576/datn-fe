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
import Link from "@mui/material/Link";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import { useSession } from "../../utils/SessionContext";

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
export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { t, i18n } = useTranslation();
  const { session, setSession } = useSession();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const loginResponse = await axios.post(
        "https://datn-be-3ju1.onrender.com/verify/login",
        {
          username: email,
          password: password,
        }
      );
      console.log(loginResponse);
      if (loginResponse.status === 200) {
        const { accessToken, user } = loginResponse.data;
        localStorage.setItem("accessToken", accessToken);
        await setSession({
          user: {
            name: user.username,
            image: user.avatar,
            email: user.email,
          },
        });
        await localStorage.setItem("user", JSON.stringify(user));
        const userInLocalStorage = JSON.parse(localStorage.getItem("user"));
        console.log("userInLocalStorage", userInLocalStorage);

        console.log("redirecting to home");
        setTimeout(() => navigate("/"), 100);
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
      setError(t("verifyError.incorrectUsernameOrPassword"));
    }
  };

  const handleLanguageChange = (e) => {
    console.log(e);
    e.preventDefault();
    i18n.changeLanguage(e.target.value);
  };
  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/register");
  };
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
          <h2 className="text-2xl font-bold mb-2">{t("login")}</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              fullWidth
              label={t("username")}
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                {t("password")}{" "}
              </InputLabel>
              <FilledInput
                sx={{ mb: 1 }}
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
              sx={{ m: 1 }}
            >
              {t("login")}
            </Button>
          </form>
          <Link
            fullWidth
            variant="text"
            sx={{ mt: 1 }}
            onClick={() =>
              alert("Chức năng quên mật khẩu chưa được triển khai.")
            }
            component="href"
            href="#"
            underline="hover"
            style={{ textAlign: "center", display: "block" }}
          >
            {t("forgotPassword")}
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ m: 2, maxWidth: "400px" }}
          onClick={handleRegisterClick}
        >
          {t("register")}
        </Button>
        <TextField
          id="outlined-select-language"
          select
          label="Select"
          defaultValue="en"
          helperText={t("chooseLanguage")}
          sx={{ mt: 2 }}
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
