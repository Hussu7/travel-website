import React from "react";
import { Link } from "react-router-dom";

const Button = ({ text,link }) => {
  return (
    <button>
      <Link
        to={link}
        className="bg-yellow-400 text-gray-900 font-semibold px-6 py-3 rounded-lg hover:bg-yellow-300 transition-colors"
      >
        {text}
      </Link>
    </button>
  );
};

export default Button;
