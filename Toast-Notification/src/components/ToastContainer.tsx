import React, {useState, useRef} from "react";

type Toast = {
    id: number;
    message: string;
    type: "success" | "info" | "warning" | "error";
}

export default function ToastContainer() {
    const [toasts, setToasts] = useState<never[]>([]);
    const timerRef = useRef({});
    const handleClose = (id: number) => {
        clearTimeout(timerRef.current[id]);
        delete timerRef.current[id];

        setToasts((prevToasts) => {
            const filteredArr = prevToasts.filter((toast) => {
                return toast.id !== id;
            });
            return filteredArr;
        })
    }
    const handleAdd = (message: string, type: Toast["type"]) => {
        const id = new Date().getTime();
        const newToasts = [...toasts, {id, message, type}];
        setToasts(newToasts);
        timerRef.current[id] = setTimeout(() => handleClose(id), 5000)
    }
    return (
        <div className="container">
            <div className="toast-container">
                {
                    toasts.map(({ id, message, type}) => {
                        return (
                            <div key={id} className={`toast ${type}`}>{message} <span onClick={() => handleClose(id)}>x</span></div>
                        )
                    })
                }
            </div>
            <div className="btn-container">
                <button onClick={() => handleAdd("Successs", "success")} className="btn">Success Toast</button>
                <button onClick={() => handleAdd("Info", "info")} className="btn">Info Toast</button>
                <button onClick={() => handleAdd("Warning", "warning")} className="btn">Warning Toast</button>
                <button onClick={() => handleAdd("Error", "error")} className="btn">Error Toast</button>
            </div>
        </div>
    )
}