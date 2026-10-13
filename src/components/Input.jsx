import React, { useId } from "react"

const Input = React.forwardRef( function Input({
    label,
    type = "text",
    className = "",
    ...props
}, ref){

    const id = useId();
    return (
        <div className="w-full">
            {label && <label 
            className="inline-block mb-1 pl-1"
            htmlFor = {id}>
                {label}
            </label>
            }
            <input type={type}
            className = {`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
            ref = {ref}
            {...props}
            id={id}
            />
        </div>
    )
})

export default Input


/*
forwardRef wraps the component so it can receive a second argument, ref.
label && ... shows the label only if passeded one. useId generates a unique ID
htmlFor={id} on the label and id={id} on the input connect them. Clicking the label focuses the input
*/