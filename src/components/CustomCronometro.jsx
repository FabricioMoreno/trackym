import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import Countdown from "react-countdown";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  TextField,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import Replay from "@mui/icons-material/Replay";
import AccessTime from "@mui/icons-material/AccessTime";

const Cronometro = ({
  initialMinutes = 3,
  showTimeInput = false,
  onTimeChange,
  color = "primary",
  size = 200,
  autoStart = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const countdownRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [key, setKey] = useState(0);
  const [localMinutes, setLocalMinutes] = useState(initialMinutes);
  const [showInput, setShowInput] = useState(showTimeInput);

  useEffect(() => {
    setLocalMinutes(initialMinutes);
  }, [initialMinutes]);

  const initialTime = localMinutes * 60;

  const handleComplete = () => {
    setIsPlaying(false);
  };

  const handleMinutesChange = (minutes) => {
    setLocalMinutes(minutes);
    onTimeChange?.(minutes);
  };

  const renderer = ({ minutes, seconds, totalMillis, api }) => {
    const progress = (totalMillis / (initialTime * 1000)) * 100;
    const timeString = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;

    return (
      <Box
        sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
      >
        {/* Contador principal */}
        <Box sx={{ position: "relative", display: "inline-flex" }}>
          <CircularProgress
            variant="determinate"
            value={progress}
            size={isMobile ? size * 0.8 : size}
            thickness={2}
            sx={{ color: `${color}` }}
          />

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              bottom: 0,
              right: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography variant={isMobile ? "h4" : "h2"}>
              {timeString}
            </Typography>

            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
              <IconButton
                color={color}
                onClick={() => {
                  if (isPlaying) {
                    api.pause();
                  } else {
                    api.start();
                  }
                  setIsPlaying(!isPlaying);
                }}
              >
                {isPlaying ? (
                  <Pause fontSize="large" />
                ) : (
                  <PlayArrow fontSize="large" />
                )}
              </IconButton>

              <IconButton
                color={color}
                onClick={() => {
                  setKey((prev) => prev + 1);
                  setIsPlaying(false);
                }}
              >
                <Replay fontSize="large" />
              </IconButton>
            </Stack>
          </Box>
        </Box>

        {/* Input para cambiar tiempo */}
        {showInput && (
          <Box sx={{ mt: 3, width: "100%", maxWidth: 200 }}>
            <TextField
              fullWidth
              label="Minutos"
              type="number"
              variant="outlined"
              value={localMinutes}
              onChange={(e) => {
                const value = Math.max(1, Math.min(60, e.target.value));
                handleMinutesChange(value);
              }}
              inputProps={{ min: 1, max: 60 }}
            />
          </Box>
        )}

        {/* Botón para mostrar/ocultar input */}
        <Button
          variant="outlined"
          color={color}
          startIcon={<AccessTime />}
          onClick={() => setShowInput(!showInput)}
          sx={{ mt: 3 }}
        >
          {showInput ? "Ocultar ajustes" : "Cambiar tiempo"}
        </Button>
      </Box>
    );
  };

  return (
    <Box sx={{ p: 2 }}>
      <Countdown
        key={key}
        ref={countdownRef}
        date={Date.now() + initialTime * 1000}
        renderer={renderer}
        autoStart={autoStart}
        onComplete={handleComplete}
      />
    </Box>
  );
};

export default Cronometro;
