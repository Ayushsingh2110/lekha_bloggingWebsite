import React, { useState } from "react";

const InputBox = ({ name, id, type, value, placeholder, icon }) => {

  const [PasswordVisibility, setPasswordVisibility] = useState(false);
  return (
    <>
      <div className="relative mb-4 w-[100%]">
        <input
          name={name}
          id={id}
          type={type == "password" ? PasswordVisibility ? "text" : "password" : type}
          value={value}
          placeholder={placeholder}
          className="input-box"
        />

        <i className={"fi " + icon + " input-icon"}></i>

        {
          type == "password" ? 
          <i className={"fi fi-rr-eye"+ (PasswordVisibility ? "" : "-crossed") +" input-icon left-[auto] right-4 cursor-pointer"}
          onClick={() => setPasswordVisibility(currentVal => !currentVal)}
          >
          </i> 
          : ""
        }
      </div>
    </>
  );
};

export default InputBox;
