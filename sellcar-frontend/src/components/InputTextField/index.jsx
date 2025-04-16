import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Thư viện icon
import "./InputTextField.css";

const InputWithIcon = ({ label, type, placeHolder, className, name,  onChange}) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => setShowPassword(!showPassword);

    return (
        <div className={"container--inp " + className}>
            <label>{label}</label>
            <div className="input-wrapper">
                {type === "textarea"? <textarea 
                    name={name}
                    onChange={onChange}
                    placeholder={placeHolder}
                    rows={5}
                    cols={50}
                ></textarea> : 
                
                <input 
                    name={name}
                    onChange={onChange}
                    type={type === "password" ? (showPassword ? "text" : "password") : type} 
                    placeholder={placeHolder}
                />}
                {type === "password" && (
                    <span className="icon" onClick={togglePassword}>
                        {showPassword ? <FaEyeSlash color="white" /> : <FaEye color="white" />}
                    </span>
                )}
            </div>
        </div>
    );
};

export default InputWithIcon;
