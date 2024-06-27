import React from 'react';
import './css/Toolbar.css';

const Toolbar = () => {
    const toolClick = (e) => {
        console.log(e);
    };

    return (
        <div className="toolbar">
            <button id="test-tool1" className="tool-button" onClick={toolClick}></button>
            <button id="test-tool2" className="tool-button" onClick={toolClick}></button>
            <button id="test-tool3" className="tool-button" onClick={toolClick}></button>
        </div>
    );
};

export default Toolbar;