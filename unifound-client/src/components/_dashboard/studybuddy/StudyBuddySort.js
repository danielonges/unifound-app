import PropTypes from 'prop-types';
// material
import { MenuItem, TextField } from '@mui/material';

// ----------------------------------------------------------------------

StudyBuddySort.propTypes = {
  options: PropTypes.array,
  onSort: PropTypes.func
};

export default function StudyBuddySort({ options, onSort }) {
  return (
    <TextField select size="small" value="latest" onChange={onSort}>
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
