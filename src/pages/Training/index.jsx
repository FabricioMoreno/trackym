import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  Box,
  Typography,
  Button,
  Grid,
  TextField,
  Paper,
  Stepper,
  Step,
  StepLabel,
  StepContent,
  Divider,
  useMediaQuery,
  Chip,
  useTheme,
} from "@mui/material";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid, GridActionsCellItem } from "@mui/x-data-grid";
import CustomCronometro from "../../components/CustomCronometro";
import Swal from "sweetalert2";
import FloatingTimer from "./components/FloatingTimer";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const TrainingPage = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [activeStep, setActiveStep] = useState(0);
  const timer_sets_default = location.state.timer_sets_default || 1;
  const timer_rest_default = location.state.timer_rest_default || 3;
  const [exercises, setExercises] = useState(location.state.exercices || []);

  const [isRestBetweenSets, setIsRestBetweenSets] = useState(true); // Toggle rest counter timer

  useEffect(() => {
    if (location.state.exercices && location.state.exercices?.length > 0) {
      setExercises(location.state.exercices);
    }
  }, [location]);

  // Estado inicial basado en los ejercicios recibidos
  const [exercisesData, setExercisesData] = useState(
    exercises.map((exercise) => ({
      ...exercise,
      currentSet: 1,
      reps: exercise.reps_default,
      weight: exercise.weight_default,
      completed_sets: [],
    }))
  );

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleFinishWorkout = async () => {
    console.log(exercisesData);
    try {
      const textToCopy = JSON.stringify(exercisesData, null, 2);

      await navigator.clipboard.writeText(textToCopy);

      // Alerta de éxito con estilos
      Swal.fire({
        title: "¡Copiado!",
        text: "Los datos del entrenamiento están en tu portapapeles",
        icon: "success",
        confirmButtonText: "OK",
        timer: 1500,
        timerProgressBar: true,
      });
    } catch (err) {
      console.error(err);
      // Alerta de error
      Swal.fire({
        title: "Error",
        text: "No se pudo copiar al portapapeles" + err,
        icon: "error",
        confirmButtonText: "Entendido",
      });
    }
  };

  const handleReset = (exerciseIndex) => {
    setExercisesData((prev) =>
      prev.map((ex, idx) =>
        idx === exerciseIndex
          ? { ...ex, reps: ex.reps_default, weight: ex.weight_default }
          : ex
      )
    );
  };

  const handleCompleteSet = (exerciseIndex) => {
    setExercisesData((prev) =>
      prev.map((ex, idx) => {
        if (idx !== exerciseIndex) return ex;

        // Usar valor del input o default si está vacío
        const repsValue = ex.reps === "" ? ex.reps_default : Number(ex.reps);
        const weightValue =
          ex.weight === "" ? ex.weight_default : Number(ex.weight);

        const newSet = {
          id: Date.now(),
          serie: ex.currentSet,
          reps: repsValue,
          weight: weightValue,
        };

        return {
          ...ex,
          currentSet: ex.currentSet + 1,
          reps: ex.reps_default, //Reset al valor por defecto
          weight: ex.weight_default,
          completed_sets: [...ex.completed_sets, newSet],
        };
      })
    );
  };

  const handleDeleteSet = (exerciseIndex, setId) => {
    setExercisesData((prev) =>
      prev.map((ex, idx) => {
        if (idx !== exerciseIndex) return ex;

        const updatedSets = ex.completed_sets.filter((set) => set.id !== setId);
        const maxSerie = Math.max(...updatedSets.map((set) => set.serie), 0);

        return {
          ...ex,
          currentSet: maxSerie + 1,
          completed_sets: updatedSets,
        };
      })
    );
  };

  const columns = [
    { field: "serie", headerName: "Serie", width: 100 },
    { field: "reps", headerName: "Reps", width: 100 },
    { field: "weight", headerName: "Peso (Kg)", width: 120 },
    {
      field: "actions",
      type: "actions",
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<DeleteIcon />}
          label="Delete"
          onClick={() => handleDeleteSet(activeStep, params.id)}
        />,
      ],
    },
  ];

  return (
    <Box sx={{ p: isMobile ? 1 : 3, maxWidth: 800, margin: "0 auto" }}>
      <Paper elevation={3} sx={{ p: isMobile ? 1 : 3, borderRadius: 2 }}>
        <Typography variant="h4" align="center" sx={{ mb: 3 }}>
          Entrenamiento Actual
        </Typography>

        <Stepper activeStep={activeStep} orientation="vertical">
          {exercisesData.map((exercise, index) => (
            <Step key={exercise.name}>
              <StepLabel
                optional={
                  <Typography variant="caption">
                    {exercise.muscular_group.join(", ")}
                  </Typography>
                }
                sx={{ cursor: "pointer" }}
                onClick={() => setActiveStep(index)}
              >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  {exercise.name}
                  <Chip
                    label={`${exercise.completed_sets.length}/${exercise.sets_default}`}
                    size="small"
                    color="primary"
                  />
                </Box>
              </StepLabel>

              <StepContent>
                <Box sx={{ mb: 2, height: 250, width: "100%" }}>
                  <DataGrid
                    rows={exercise.completed_sets}
                    columns={columns}
                    pageSizeOptions={[5]}
                    density={isMobile ? "compact" : "standard"}
                  />
                </Box>

                <Typography variant="subtitle1" gutterBottom>
                  Serie {exercise.currentSet}
                </Typography>

                <Grid container spacing={2} sx={{ mb: 2 }}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Repeticiones"
                      value={exercise.reps}
                      onChange={(e) =>
                        setExercisesData((prev) =>
                          prev.map((ex, idx) =>
                            idx === index ? { ...ex, reps: e.target.value } : ex
                          )
                        )
                      }
                      type="number"
                      placeholder={`Default: ${exercise.reps_default}`} // Muestra valor por defecto
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Peso (Kg)"
                      value={exercise.weight}
                      onChange={(e) =>
                        setExercisesData((prev) =>
                          prev.map((ex, idx) =>
                            idx === index
                              ? { ...ex, weight: e.target.value }
                              : ex
                          )
                        )
                      }
                      type="number"
                      placeholder={`Default: ${exercise.weight_default}`} // Muestra valor por defecto
                      inputProps={{ min: 0 }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <Button
                      variant="contained"
                      endIcon={<AddCircleOutlineIcon />}
                      onClick={() => handleCompleteSet(index)}
                      disabled={!exercise.reps || !exercise.weight}
                      size={isMobile ? "small" : "medium"}
                    >
                      Agregar
                    </Button>
                  </Grid>
                </Grid>

                <Box sx={{ mb: 3 }}>
                  <CustomCronometro
                    initialMinutes={
                      isRestBetweenSets
                        ? timer_sets_default
                        : timer_rest_default
                    }
                    size={isMobile ? 150 : 200}
                    color={isRestBetweenSets ? "red" : "blue"}
                  />
                  {/* <FloatingTimer/> */}
                  <Button
                    variant={isRestBetweenSets ? "contained" : "outlined"}
                    onClick={() => setIsRestBetweenSets(!isRestBetweenSets)}
                    color="secondary"
                    sx={{ mb: 2 }}
                  >
                    {isRestBetweenSets
                      ? "Descanso entre series"
                      : "Descanso entre reps"}
                  </Button>
                </Box>

                <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
                  <Button
                    variant="outlined"
                    startIcon={<RestartAltIcon />}
                    onClick={() => handleReset(index)}
                    size={isMobile ? "small" : "medium"}
                  >
                    Reiniciar
                  </Button>
                  <Button
                    variant="contained"
                    endIcon={<CheckCircleIcon />}
                    onClick={() => handleNext()}
                    size={isMobile ? "small" : "medium"}
                  >
                    Completar Serie
                  </Button>
                </Box>
              </StepContent>
            </Step>
          ))}
        </Stepper>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            disabled={activeStep === 0}
            onClick={handleBack}
            variant="outlined"
          >
            Anterior
          </Button>
          <Button
            variant="contained"
            onClick={
              activeStep === exercisesData.length - 1
                ? handleFinishWorkout
                : handleNext
            }
          >
            {activeStep === exercisesData.length - 1
              ? "Finalizar Entrenamiento"
              : "Siguiente"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default TrainingPage;
