const infoTest = {
  data: [
    {
      id: 1,
      nombre: "Rutina Hipertrofia",
      entrenamientos: [
        {
          id: 1,
          nombre: "Entrenamiento Pecho + Espalda",
          timer_sets_default: 1,
          timer_rest_default: 3,
          exercices: [
            {
              name: "Prees inclinado con barra",
              muscular_group: ["Pecho"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 15,
              completed_sets: [],
            },

            {
              name: "Wide chest press",
              muscular_group: ["Pecho"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 15,
              completed_sets: [],
            },

            {
              name: "Press plano con mancuernas",
              muscular_group: ["Pecho"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 45,
              completed_sets: [],
            },

            {
              name: "Jalón dorsal",
              muscular_group: ["Espalda"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 45,
              completed_sets: [],
            },
            {
              name: "Jalón dorsal tras nuca",
              muscular_group: ["Espalda"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 35,
              completed_sets: [],
            },
            {
              name: "Espalda de pie",
              muscular_group: ["Espalda"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 15,
              completed_sets: [],
            },
            //   {
            //     "nombre": "Dominadas",
            //     "grupo_muscular": "Espalda",
            //     "series": [
            //       { "repeticiones": 6, "peso": "Cuerpo" },
            //       { "repeticiones": 6, "peso": "Cuerpo" }
            //     ]
            //   }
          ],
        },
        {
          id: 2,
          nombre: "Rutina Hombros + Brazos",
          timer_sets_default: 1,
          timer_rest_default: 3,
          exercices: [
            {
              name: "Press de hombro",
              muscular_group: ["Hombros"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 35,
              completed_sets: [],
            },
            {
              name: "Elevaciones laterales",
              muscular_group: ["Hombros"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 20,
              completed_sets: [],
            },
            {
              name: "Elevaciones frontales",
              muscular_group: ["Hombros"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 20,
              completed_sets: [],
            },
            {
              name: "Extensión de tríceps unilateral",
              muscular_group: ["Tríceps"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 9,
              completed_sets: [],
            },
            {
              name: "Extensión de tríceps sobre la cabeza",
              muscular_group: ["Tríceps"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 24,
              completed_sets: [],
            },
            {
              name: "Curl martillo bajo",
              muscular_group: ["Bíceps"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 29,
              completed_sets: [],
            },
          ],
        },
        {
          id: 3,
          nombre: "Rutina Pecho + Espalda 2",
          timer_sets_default: 1,
          timer_rest_default: 3,
          exercices: [
            {
              name: "Cruce de poleas alta",
              muscular_group: ["Pecho"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 19,
              completed_sets: [],
            },
            {
              name: "Cruce de poleas baja",
              muscular_group: ["Pecho"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 19,
              completed_sets: [],
            },
            {
              name: "Pull over",
              muscular_group: ["Espalda"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 19,
              completed_sets: [],
            },
            {
              name: "Press inclinado mancuerna",
              muscular_group: ["Pecho"],
              sets_default: 4,
              reps_default: 8,
              weight_default: 45,
              completed_sets: [],
            },
            {
              name: "Remo en punta",
              muscular_group: ["Espalda"],
              sets_default: 4,
              reps_default: 8,
              weight_default: 30,
              completed_sets: [],
            },
            {
              name: "Remo dorsal",
              muscular_group: ["Espalda"],
              sets_default: 4,
              reps_default: 12,
              weight_default: 15,
              completed_sets: [],
            },
          ],
        },
      ],
    },
  ],
};

export default infoTest;
