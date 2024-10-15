import React from 'react';
import './InputBar.css';

function InputBar({
                      label,
                      value,
                      onChange,
                      placeholder,
                      type = 'text',
                      className = '',
                  }) {
    return (
        <div className={`input-bar-container ${className}`}>
            {label && <label className="input-bar-label">{label}</label>}
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className="input-bar-field"
            />
        </div>
    );
}

export default InputBar;


