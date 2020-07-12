import React from "react";
import classnames from "classnames";
import Proptypes from "prop-types";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  type,
  onChange,
  icon,
}) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          <i className={icon} />
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        placeholder={placeholder}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

InputGroup.propTypes = {
  name: Proptypes.string.isRequired,
  value: Proptypes.string.isRequired,
  onChange: Proptypes.func.isRequired,
  placeholder: Proptypes.string,
  type: Proptypes.string,
  error: Proptypes.string,
  icon: Proptypes.string,
};

InputGroup.defaultProps = {
  type: "text",
};

export default InputGroup;
