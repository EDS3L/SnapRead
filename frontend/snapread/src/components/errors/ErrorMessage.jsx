import PropTypes from 'prop-types';

const ErrorMessage = ({ value }) => {
  return (
    <div className="flex text-red-500 text-center m-2 p-2  bg-red-200 rounded-md">
      {value}
    </div>
  );
};

ErrorMessage.propTypes = {
  value: PropTypes.string.isRequired,
};

export default ErrorMessage;
