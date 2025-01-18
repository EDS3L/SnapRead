import PropTypes from 'prop-types';

const InvoiceErrorMessage = ({ value }) => {
  return (
    <div className="w-full absolute flex justify-center">
      <div className="flex text-red-500  m-2 p-2  bg-red-200 rounded-md absolute ">
        {value}
      </div>
    </div>
  );
};

InvoiceErrorMessage.propTypes = {
  value: PropTypes.string.isRequired,
};

export default InvoiceErrorMessage;
