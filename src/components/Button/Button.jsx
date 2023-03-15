import s from './Button.module.css';
import PropTypes from 'prop-types';

export const Button = ({ pagination }) => {
  return (
    <button type="button" className={s.Button} onClick={pagination}>
      Load more
    </button>
  );
};

Button.propTypes = {
  pagination: PropTypes.func,
};
