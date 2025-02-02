import { ClipLoader } from "react-spinners";
import PropTypes from "prop-types";

const override = {
  display: "flex",
  margin: "100px auto",
};

const Spinner = ({ loading }) => {
  return (
    <div className="absolute bg-white bg-opacity-60 z-50 h-full w-full flex items-center justify-center">
      <ClipLoader
        color="#4338ca"
        loading={loading}
        cssOverride={override}
        size={250}
      />
      {/* dodać tekst pod spinnerze */}
    </div>
  );
};

Spinner.propTypes = {
  loading: PropTypes.string.isRequired,
};

export default Spinner;
