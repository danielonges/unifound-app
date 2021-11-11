import PropTypes from 'prop-types';
// material
import { Box } from '@mui/material';
import unifound from '../unifound.png';

// ----------------------------------------------------------------------

Logo.propTypes = {
  sx: PropTypes.object
};

export default function Logo({ sx }) {
  return <Box component="img" src={unifound} sx={{ width: 120, height: 40, ...sx }} />;
}
