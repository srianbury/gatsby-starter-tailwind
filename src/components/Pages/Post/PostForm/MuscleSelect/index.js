import * as React from "react";
import PropTypes from "prop-types";
import {
  OutlinedInput,
  InputLabel,
  MenuItem,
  ListItemText,
  Select,
  Checkbox,
  Box,
} from "@mui/material";
import { SelectedMuscleChips } from "./SelectedMuscleChips";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
    width: 1,
  },
};

const musclesGroups = [
  "Legs",
  "Abdominals",
  "Chest",
  "Back",
  "Arms",
  "Shoulders",
  "Calves",
  "Hamstrings",
  "Quadriceps",
  "Glutes",
  "Biceps",
  "Triceps",
  "Forearms",
];

const MuscleSelect = ({ selectedMuscles, setSelectedMuscles }) => {
  function removeMuscle(muscle) {
    setSelectedMuscles(cur => {
      let copy = { ...cur };
      delete copy[muscle];
      return copy;
    });
  }

  function handleChange(event) {
    const {
      target: { value },
    } = event;
    let muscleDict = {};
    const muscles = typeof value === "string" ? value.split(",") : value;
    for (const muscle of muscles) {
      muscleDict[muscle] = true;
    }
    setSelectedMuscles(muscleDict);
  }

  return (
    <Box
      sx={{
        width: 1,
      }}
    >
      <SelectedMuscleChips
        muscles={Object.keys(selectedMuscles)}
        removeMuscle={removeMuscle}
      />
      <InputLabel id="demo-multiple-checkbox-label">Muscle Groups</InputLabel>
      <Select
        labelId="demo-multiple-checkbox-label"
        id="demo-multiple-checkbox"
        multiple
        value={musclesGroups.filter(muscle => muscle in selectedMuscles)}
        onChange={handleChange}
        input={<OutlinedInput label="Muscles" />}
        renderValue={selected => selected.join(", ")}
        MenuProps={MenuProps}
        sx={{
          width: 1,
        }}
        variant="outlined"
      >
        {musclesGroups.map(muscle => (
          <MenuItem key={muscle} value={muscle}>
            <Checkbox checked={muscle in selectedMuscles} />
            <ListItemText primary={muscle} />
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};
MuscleSelect.propTypes = {
  selectedMuscles: PropTypes.object.isRequired,
  setSelectedMuscles: PropTypes.func.isRequired,
};

/**
 * @param {array} muscles
 * @return {object}
 */
function formatMuscles(muscles) {
  let formattedMuscles = {};
  for (const muscle of muscles) {
    formattedMuscles[muscle] = true;
  }
  return formattedMuscles;
}

export { MuscleSelect, SelectedMuscleChips, formatMuscles };
