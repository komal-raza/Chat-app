import React from "react";

const GenderCheckbox = ({ selectedGender, onChange }) => {
  return (
    <div className="mt-2 flex gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedGender ==="male"? "selected":""}`}>
          <span className="text-base label-text">Male</span>
        </label>
        <input
          type="checkbox"
          className="checkbox border-slate-900"
          checked={selectedGender === "male"}
          onChange={() => onChange("male")}
        />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="" className={`label gap-2 cursor-pointer ${selectedGender ==="female"? "selected":""}`}>
          <span className="text-base label-text">Female</span>
        </label>
        <input
          type="checkbox"
          className="checkbox border-slate-900"
          checked={selectedGender === "female"}
          onChange={() => onChange("female")}
        />
      </div>
    </div>
  );
};

export default GenderCheckbox;
