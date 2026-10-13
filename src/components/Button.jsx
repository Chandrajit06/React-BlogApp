function Button({
    children, 
    type = "button",
    bgColor = "bg-blue-600",
    textColor = "text-white",
    className = "",
    ...props
    }){

    return (
        <button 
            type={type}
            className={`px-4 py-2 rounded-lg ${bgColor} ${textColor} ${className}`}
            {...props}>
        {children}
        </button>
    )
}

export default Button

/*
children is whatever put between the tags. In <Button>Login</Button>, children is "Login".
className lets to add extra classes for one-off tweaks, like margins.
...props is the rest operator. It collects every other prop passed (onClick, disabled, id, etc.) into one object.
*/