import PropTypes from "prop-types";

function SelectField({className,value,onChange,options=[]}) {
  return (
    <div>
        <select value={value} onChange={onChange} className={className}>
            {options.map(option => {
                return (
                    <option key={option} value={option}>{option}</option>
                )
            })}
        </select>
    </div>
  )
}


SelectField.propTypes = {
  className: PropTypes.string,
  value: PropTypes.any,
  onChange:PropTypes.func,
  options:PropTypes.array
} 
export default SelectField