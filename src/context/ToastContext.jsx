import React, { createContext, useContext, useState } from "react";

const ToastContext = createContext();

export function ToastProvider({ children }) {

const [message, setMessage] = useState("");

const showToast = (msg) => {

setMessage(msg);

setTimeout(() => {
setMessage("");
}, 2000);

};

return (

<ToastContext.Provider value={{ showToast }}>

{children}

{message && (

<div className="fixed bottom-5 right-5 bg-[#d98b8b] text-white px-5 py-3 rounded-xl shadow-lg z-50">

{message}

</div>

)}

</ToastContext.Provider>

);

}

export function useToast() {
return useContext(ToastContext);
}