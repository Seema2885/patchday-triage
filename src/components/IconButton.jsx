import React from "react";

export const IconButton = ({ label, children, onClick, className = "" }) => (
  <button
    className={`icon-btn ${className}`}
    aria-label={label}
    title={label}
    onClick={onClick}
  >
    {children}
  </button>
);
