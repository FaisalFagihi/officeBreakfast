import React from 'react'
import './NumericUpDown.jsx.css'
import { useState, useEffect } from 'react'
export default function NumericUpDown({ value = 1, min = 1, max = 10, step = 1, setValue: setValue }) {
    return (
        <div className='NumericUpDownBody'>
            <div className='NumericUpDownButton left' onClick={() => {
                if ((value - step) >= min)
                    setValue(value - step);
            }}>-</div>
            <div className='NumericUpDownValue'>{value}</div>
            <div className='NumericUpDownButton right' onClick={() => {
                if ((value + 1) <= max)
                    setValue(value + step);
            }}>+</div>
        </div>
    )
}
