import React from "react";
import CustomReadableAccordion from "../../components/CustomReadableAccordion";
import infoTest from "../../assets/infoTest";
import { Box, Stack, Typography, Chip, Divider, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
const ExerciseDetail = ({ exercise }) => {
  return (
    <Box
      sx={{
        p: 2,
        mb: 1,
        borderRadius: 1,
        backgroundColor: "background.paper",
        boxShadow: 1,
      }}
    >
      <Stack spacing={1}>
        <Typography variant="subtitle1" fontWeight="medium">
          {exercise.name}
        </Typography>

        <Stack direction="row" spacing={2} alignItems="center">
          <Chip
            label={exercise.muscular_group.join(", ")}
            color="primary"
            size="small"
          />
          <Typography variant="body2">
            Series: {exercise.sets_default}
          </Typography>
          <Typography variant="body2">Reps: {exercise.reps_default}</Typography>
          <Typography variant="body2">
            Peso: {exercise.weight_default} kg
          </Typography>
        </Stack>
      </Stack>
      <Divider sx={{ mt: 1 }} />
    </Box>
  );
};

const Home = () => {
  const navigate = useNavigate();
  const infoWorkouts = infoTest || [];
  return (
    <Box sx={{ maxWidth: 800, mx: "auto", p: 2 }}>
      <h1>Entrenamientos hoy</h1>
      {infoWorkouts.data[0].entrenamientos.map((entrenamiento) => (
        <CustomReadableAccordion
          key={entrenamiento.id}
          title={`${entrenamiento.nombre} (${infoWorkouts.data[0].nombre})`}
          summarySx={{
            backgroundColor: "action.hover",
            borderBottom: "1px solid",
            borderColor: "divider",
          }}
          detailsSx={{ p: 0 }}
          sx={{ mb: 2 }}
        >
          <Box sx={{ p: 2, position: "relative" }}>
            <Button
              variant="contained"
              color="primary"
              endIcon={<ArrowForwardIcon />}
              onClick={() => navigate("/Training",{state:{
                "exercices": entrenamiento.exercices,
                "timer_sets_default":entrenamiento.timer_sets_default,
                "timer_rest_default":entrenamiento.timer_rest_default,
              }})}
              sx={{
                position: "absolute",
                right: 16,
                top: 16,
                borderRadius: 2,
                textTransform: "none",
                px: 3,
                py: 1,
                fontWeight: "bold",
                boxShadow: 2,
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-1px)",
                },
              }}
            >
              Comenzar
            </Button>
            <Stack
              spacing={1}
              mb={3}
              sx={{
                backgroundColor: "cadetblue",
                borderRadius: 2,
                p: 2,
                boxShadow: 1,
                mt: 6, // Espacio para el botón flotante
              }}
            >
              <Typography variant="body2">
                <strong>Tiempo entre sets:</strong>{" "}
                {entrenamiento.timer_sets_default} min
              </Typography>
              <Typography variant="body2">
                <strong>Tiempo de descanso:</strong>{" "}
                {entrenamiento.timer_rest_default} min
              </Typography>
            </Stack>

            {entrenamiento.exercices.map((exercise, index) => (
              <ExerciseDetail
                key={`${exercise.name}-${index}`}
                exercise={exercise}
              />
            ))}
          </Box>
        </CustomReadableAccordion>
      ))}
    </Box>
  );
};

export default Home;
