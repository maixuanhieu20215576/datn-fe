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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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

      if (loginResponse.data.success) {
        alert("Đăng nhập thành công!");
      }
    } catch (error) {
      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
      setError("Incorrect username or password");
    }
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
          <h2 className="text-2xl font-bold mb-2">Log in</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password{" "}
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
              Log in{" "}
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
            Forgot password?
          </Link>
        </Box>
        <Button
          fullWidth
          variant="contained"
          color="secondary"
          sx={{ m: 2, maxWidth: "400px" }}
          onClick={handleRegisterClick}
        >
          Register
        </Button>
      </Box>
    </div>
  );
}
