import React, { useState, useRef, useEffect } from "react";
import Countdown from "react-countdown";
import {
  Box,
  IconButton,
  Typography,
  CircularProgress,
  Button,
  useMediaQuery,
  useTheme,
  Stack,
  Fade,
} from "@mui/material";
import PlayArrow from "@mui/icons-material/PlayArrow";
import Pause from "@mui/icons-material/Pause";
import Replay from "@mui/icons-material/Replay";
import AccessTime from "@mui/icons-material/AccessTime";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MultiSectionDigitalClock } from "@mui/x-date-pickers/MultiSectionDigitalClock";
import dayjs from "dayjs";
import bellNotificationSound from '/src/assets/audios/bellNotification.wav';
import Swal from 'sweetalert2';

const CustomCronometro = ({
  initialMinutes = 3,
  initialSeconds = 0,
  onTimeChange,
  color = "primary",
  size = 200,
  autoStart = false,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const countdownRef = useRef(null);
  const audioRef = useRef(null);

  // Estados
  const [isPlaying, setIsPlaying] = useState(autoStart);
  const [key, setKey] = useState(0);
  const [showPicker, setShowPicker] = useState(false);
  const [currentInitialTime, setCurrentInitialTime] = useState(
    initialMinutes * 60 + initialSeconds
  );
  const [timeValue, setTimeValue] = useState(
    dayjs()
      .startOf("day")
      .set("minute", initialMinutes)
      .set("second", initialSeconds)
  );
  const [tempTime, setTempTime] = useState(timeValue);

  useEffect(() => {
    const totalSeconds = initialMinutes * 60 + initialSeconds;
    const newTime = dayjs()
      .startOf("day")
      .set("minute", initialMinutes)
      .set("second", initialSeconds);

    setCurrentInitialTime(totalSeconds);
    setTimeValue(newTime);
    setTempTime(newTime);
  }, [initialMinutes, initialSeconds]);

  const handleAudioControl = (action = 'play') => {
    if (!audioRef.current) {
      audioRef.current = new Audio(bellNotificationSound);
      audioRef.current.loop = true;
    }
    audioRef.current[action]();
  };

  const handleComplete = () => {
    setIsPlaying(false);
    handleAudioControl('play');

    Swal.fire({
      title: '¡Tiempo completado!',
      html: 'Haz click para detener la alarma',
      icon: 'warning',
      confirmButtonText: 'OK',
      allowOutsideClick: false,
      willClose: () => handleAudioControl('pause')
    });
  };

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleConfirmTime = () => {
    const totalSeconds = (tempTime.minute() * 60) + tempTime.second();

    setTimeValue(tempTime);
    setCurrentInitialTime(totalSeconds);
    onTimeChange?.(totalSeconds);
    setKey(prev => prev + 1);
    setShowPicker(false);
  };

  const renderer = ({ minutes, seconds, total, api }) => {
    const progress = (total / (currentInitialTime * 1000)) * 100;
    const timeString = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <Box sx={{ position: "relative", display: "inline-flex" }}>
            <CircularProgress
              variant="determinate"
              value={100}
              size={isMobile ? size * 0.8 : size}
              thickness={4}
              sx={{
                color: theme.palette.mode === "dark"
                  ? "rgba(255, 255, 255, 0.1)"
                  : "rgba(0, 0, 0, 0.1)",
                position: "absolute"
              }}
            />

            <CircularProgress
              variant="determinate"
              value={progress}
              size={isMobile ? size * 0.8 : size}
              thickness={4}
              sx={{
                color: theme.palette[color]?.main || theme.palette.primary.main,
                transition: "stroke-dashoffset 0.5s linear",
                "& .MuiCircularProgress-circle": {
                  strokeLinecap: "round",
                }
              }}
            />

            <Box sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}>
              {showPicker ? (
                <Fade in={showPicker}>
                  <Box sx={{
                    width: "100%",
                    maxWidth: 300,
                    height: 250,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'absolute',
                    zIndex: 1,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: 4,
                    boxShadow: 3,
                    '& .MuiMultiSectionDigitalClockSection-root': {
                      maxHeight: 200,
                      overflowY: 'auto',
                      scrollbarWidth: 'thin',
                      '&::-webkit-scrollbar': {
                        width: '6px',
                      },
                      '&::-webkit-scrollbar-thumb': {
                        backgroundColor: theme.palette.action.disabled,
                        borderRadius: 3,
                      },
                    }
                  }}>
                    <MultiSectionDigitalClock
                      value={tempTime}
                      onChange={setTempTime}
                      ampm={false}
                      timeSteps={{ minutes: 1, seconds: 1 }}
                      views={['minutes', 'seconds']}
                      sx={{ '& .MuiList-root': { gap: '8px' } }}
                    />
                  </Box>
                </Fade>
              ) : (
                <>
                  <Typography
                    variant={isMobile ? "h4" : "h2"}
                    sx={{
                      fontFamily: 'monospace',
                      fontWeight: 'bold',
                      color: theme.palette.text.primary,
                    }}
                  >
                    {timeString}
                  </Typography>

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <IconButton
                      color={color}
                      onClick={() => {
                        isPlaying ? api.pause() : api.start();
                        setIsPlaying(!isPlaying);
                      }}
                    >
                      {isPlaying ? <Pause fontSize="large" /> : <PlayArrow fontSize="large" />}
                    </IconButton>

                    <IconButton
                      color={color}
                      onClick={() => setKey(prev => prev + 1)}
                    >
                      <Replay fontSize="large" />
                    </IconButton>
                  </Stack>
                </>
              )}
            </Box>
          </Box>

          <Box sx={{ mt: 3, width: "100%", textAlign: "center" }}>
            {showPicker ? (
              <Stack direction="row" spacing={2} justifyContent="center">
                <Button
                  variant="contained"
                  color={color}
                  onClick={handleConfirmTime}
                >
                  Aplicar
                </Button>
                <Button
                  variant="outlined"
                  color={color}
                  onClick={() => setShowPicker(false)}
                >
                  Cancelar
                </Button>
              </Stack>
            ) : (
              <Button
                variant="outlined"
                color={color}
                startIcon={<AccessTime />}
                onClick={() => {
                  setIsPlaying(false);
                  api?.pause();
                  setShowPicker(true);
                }}
              >
                Ajustar tiempo
              </Button>
            )}
          </Box>
        </Box>
      </LocalizationProvider>
    );
  };

  return (
    <Box sx={{
      p: 3,
      borderRadius: 4,
      backgroundColor: theme.palette.background.default,
      boxShadow: theme.shadows[3],
    }}>
      <Countdown
        key={key}
        ref={countdownRef}
        date={Date.now() + currentInitialTime * 1000}
        renderer={renderer}
        autoStart={autoStart}
        onComplete={handleComplete}
      />
    </Box>
  );
};


export default React.memo(CustomCronometro);