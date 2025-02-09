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

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      if (password !== retypePassword) {
        setError("Passwords do not match");
        return;
      }
      if (password.length < 6) {
        setError("Password must be at least 6 characters");
        return;
      }
      const registerResponse = await axios.post(
        "https://datn-be-3ju1.onrender.com/verify/register",
        {
          username: email,
          password: password,
        }
      );
      if (registerResponse.data.user) {
        navigate("/login");
      }
    } catch (error) {
      console.log(error);

      console.error(
        "Lỗi đăng nhập:",
        error.response ? error.response.data : error.message
      );
      console.log(error);
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
          <h2 className="text-2xl font-bold mb-2">Register</h2>
          <form onSubmit={handleRegister} className="space-y-4">
            <TextField
              fullWidth
              label="Email"
              variant="filled"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth variant="filled">
              <InputLabel htmlFor="filled-adornment-password">
                Password{" "}
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
                Retype password{" "}
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
              Register{" "}
            </Button>
          </form>
        </Box>
      </Box>
    </div>
  );
}
