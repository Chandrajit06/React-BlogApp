import React, { useId } from "react"

function Select({
    options,
    label,
    className="",
    ...props
    }, ref){
        const id = useId();
    return (
        <div className="w-full">
            {label && <label htmlFor={id} className="inline-block mb-1 pl-1">
                {label}
                </label>}
            <select  
                {...props}
                id={id}
                ref={ref}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
                >
                    <option value="" disabled hidden>
                        {props.placeholder || "Select an option"}
                    </option>
                    {options?.map((option) => (
                        <option key={option} value={option}>
                            {option}
                        </option>
                    ))}
            </select>
        </div>
    )
}

export default React.forwardRef(Select)