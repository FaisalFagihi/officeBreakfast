import React, { useState } from 'react'

export default function AutoComplateControl({ className, placeholder, children, value, list, onChange, renderItem }) {

    const [inputFocus, setInputFocus] = useState(false);
    const [listFocus, setListFocus] = useState(false);
    return (
        <div className={'grid gap-1 relative w-full'} onBlur={() => setInputFocus(false)}>
            <input type="text" autoComplete="false" onFocus={() => setInputFocus(true)} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} value={value} className={className} />
            <div on={() => setListFocus(false)} onMouseLeave={() => setListFocus(false)} onTouchStart={() => setListFocus(true)} onMouseEnter={() => setListFocus(true)} className={'absolute top-11 bg-white rounded-md py-1 !shadow-md w-full'} hidden={(!inputFocus && !listFocus) || !list?.length > 0 || !value}>
                {list?.map((item) => {
                    return <div className='cursor-pointer hover:bg-borderGray p-2' onClick={() => { onChange(item) }}>
                        {renderItem ? renderItem(item) : item}
                    </div>
                })}
            </div>
        </div>
    )
}
