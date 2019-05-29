// import React from "react";

// const Select = props => {
//   const { name, label, errors, value, onChange } = props;
//   // console.log(value);
//   return (
//     <div className="form-group">
//       <label htmlFor={name}>{label}</label>
//       <select className="form-control" id={name}>
//         {/* {console.log(
//           value.map(option => `<option >${option.name}</option>`).join("")
//         )} */}

//         {/* {value.map(option => `<option >${option.name}</option>`).join("")} */}
//         <option onClick={onChange(value[0])}>{value[0].name}</option>
//         <option onClick={onChange(value[1])}>{value[1].name}</option>
//         <option onClick={onChange(value[2])}>{value[2].name}</option>
//       </select>
//       {errors && <div className="alert alert-danger">{errors}</div>}
//     </div>
//   );
// };

// export default Select;

import React from "react";

const Select = ({ name, label, options, error, ...rest }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <select name={name} id={name} {...rest} className="form-control">
        <option value="" />
        {options.map(option => (
          <option key={option._id} value={option._id}>
            {option.name}
          </option>
        ))}
      </select>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default Select;
