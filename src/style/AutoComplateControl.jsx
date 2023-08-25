import React, { useState } from 'react'

export default function AutoComplateControl({ className, placeholder, children, value, list, onChange, renderItem }) {

const [isVisibile, setIsVisibile] = useState(false);

    return (
        <div className='grid gap-1'>
            <input onBlur={()=>setIsVisibile(false)} onFocus={()=>setIsVisibile(true)} placeholder={placeholder} onChange={(e) => onChange(e.target.value)} type='text' value={value} className={className} />
            <div className={'bg-white p-3 rounded-md !shadow-md'} hidden={!isVisibile}>
                {list?.map((item) => {
                   return <div onClick={()=>onChange(item)}>
                        {item}
                    </div>
                })}
            </div>
        </div>
    )
}
