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

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    console.log(email, password);
    e.preventDefault();
    if (email === "admin@example.com" && password === "password123") {
      alert("Đăng nhập thành công!");
    } else {
      setError("Email hoặc mật khẩu không đúng.");
    }
  };

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const handleMouseDownPassword = (event) => event.preventDefault();
  const handleMouseUpPassword = (event) => event.preventDefault();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh", // Chiếm toàn bộ chiều cao màn hình
        // Màu nền nhẹ
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          p: "16px 24px 24px 24px", // Padding top, right, bottom, left
          borderRadius: 2,
          boxShadow: 3,
          width: "100%", // Đảm bảo responsive
          maxWidth: "400px", // Giới hạn chiều rộng
        }}
      >
        <h2 className="text-2xl font-bold mb-2">Đăng nhập</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          {/* Input Email */}
          <TextField
            fullWidth
            label="Email"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Input Password */}
          <FormControl fullWidth variant="filled">
            <InputLabel htmlFor="filled-adornment-password">
              Mật khẩu
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
                textAlign: "center",
              }}
            >
              {error}
            </p>
          )}

          {/* Button Login */}
          <Button
            fullWidth
            variant="contained"
            endIcon={<LoginIcon />}
            type="submit"
            sx={{mt: 1}}
          >
            Đăng nhập
          </Button>
        </form>
      </Box>
    </Box>
  );
}
