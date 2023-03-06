import React from 'react'
import PropTypes from "prop-types";
import styles from '@/styles/Form.module.css'

function InputGroup({title,type,name,placeholder,className,value,onChange,accept,labelClassname=""}) {
    return (
        <div>
            <div className={styles.formGroup}>
                <label htmlFor={name} className={labelClassname}>{title}</label>
                <input
                    id={name}
                    type={type}
                    name={name}
                    placeholder={placeholder}
                    className={className}
                    value={value}
                    onChange={onChange}
                    accept={accept}
                    multiple = {type === "file" ? true : false}
                     />
            </div>
        </div>
    )
}


InputGroup.propTypes = {
    title:PropTypes.string,
    type:PropTypes.string,
    name:PropTypes.string,
    placeholder:PropTypes.string,
    className:PropTypes.string,
    value:PropTypes.any,
    onChange:PropTypes.func
}

export default InputGroup