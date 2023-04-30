import React from 'react';

function Button({onClick , name}) {
    return (
        <button
        onClick={onClick} 
        className="bg-gray-dark text-white py-2 px-4 rounded-md hover:bg-gray-light">
            {name}
        </button>
    );
}

export default Button;