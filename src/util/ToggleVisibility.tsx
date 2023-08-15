import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PropTypes from 'prop-types';
import { ToggleVisibilityProps } from '../types/form';

export const TogglePasswordVisibility: React.FC<ToggleVisibilityProps> = ({
  visible,
  setVisible,
}) => {
  return (
    <InputAdornment position="end">
      <IconButton onClick={() => setVisible(!visible)}>
        {visible ? <VisibilityOff /> : <Visibility />}
      </IconButton>
    </InputAdornment>
  );
};

TogglePasswordVisibility.propTypes = {
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
};
