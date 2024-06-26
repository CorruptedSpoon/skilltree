// a container component that wraps a component and creates a draggable box around it
import React from 'react';
import Draggable from 'react-draggable';
import './css/DragWrapper.css';

const DragWrapper = ({ children }) => {

    return (
        <Draggable handle=".drag-handle" bounds="parent">
            <div>
                <div className="drag-handle"/>
                <button className="close-button">
                    <div className="ico">×</div>
                </button>
                <button className="min-button">
                    <div className="ico">-</div>
                </button>
                <button className="max-button">
                    <div className="ico">+</div>
                </button>
                {children}
            </div>
        </Draggable>
    );
}

export default DragWrapper;