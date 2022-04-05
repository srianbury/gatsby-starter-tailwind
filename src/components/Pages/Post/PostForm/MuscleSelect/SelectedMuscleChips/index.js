import * as React from "react";
import PropTypes from "prop-types";
import { Chip } from "@mui/material";

const SelectedMuscleChips = ({ muscles, removeMuscle }) => {
  if (muscles.length === 0) {
    return null;
  }

  return (
    <div>
      {muscles.map(muscle => (
        <Chip
          key={muscle}
          label={muscle}
          variant="outlined"
          sx={{ margin: 0.5 }}
          onClick={removeMuscle ? () => removeMuscle(muscle) : undefined}
        />
      ))}
    </div>
  );
};
SelectedMuscleChips.propTypes = {
  muscles: PropTypes.array,
  removeMuscle: PropTypes.func,
};
SelectedMuscleChips.defaultProps = {
  muscles: [],
};

export { SelectedMuscleChips };
