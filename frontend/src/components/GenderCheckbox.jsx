import React from "react";

const GenderCheckbox = () => {
  return (
    <div className="flex gap-2">
      <div className="flex gap-2 items-center">
        <label htmlFor="" className={`label gap-2 cursor-pointer `}>
          <span className="text-base label-text">Male</span>
        </label>
        <input type="checkbox" className="checkbox border-slate-900" />
      </div>
      <div className="flex gap-2 items-center">
        <label htmlFor="" className={`label gap-2 cursor-pointer `}>
          <span className="text-base label-text">Female</span>
        </label>
        <input type="checkbox" className="checkbox border-slate-900" />
      </div>
    </div>
  );
};

export default GenderCheckbox;
