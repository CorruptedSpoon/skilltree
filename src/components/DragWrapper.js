// a container component that wraps a component and creates a draggable box around it
import React from 'react';
import Draggable from 'react-draggable';
import './css/DragWrapper.css';

const DragWrapper = ({ children }) => {
    // ReactDOM.findDOMNode() is deprecated in StrictMode fix
    const nodeRef = React.useRef(null);

    const buttonClick = (e) => {
        const type = e.currentTarget.getAttribute('class');
        const container = nodeRef.current.querySelector('.container');
        
        if(type === 'close-button') {
            // add logic for close element
        } else if(type === 'min-button') {
            container.classList.add('minimized');
        } else if(type === 'max-button') {
            container.classList.remove('minimized');
        }
    };

    React.useEffect(() => {
        const dragWrapper = nodeRef.current;
        const icos = dragWrapper.querySelectorAll('.ico');
        const buttons = dragWrapper.querySelectorAll('button');
        
        const showIco = () => icos.forEach(ico => ico.style.display = 'block');
        const hideIco = () => icos.forEach(ico => ico.style.display = 'none');

        buttons.forEach(button => {
            button.addEventListener('mouseenter', showIco);
            button.addEventListener('mouseleave', hideIco);
        });
    }, []);

    return (
        <Draggable handle=".drag-handle" bounds="parent" nodeRef={nodeRef}>
            <div ref={nodeRef}>
                <div className="container">
                    <div className="drag-handle"/>
                    <button className="close-button" onClick={buttonClick}>
                        <div className="ico">×</div>
                    </button>
                    <button className="min-button" onClick={buttonClick}>
                        <div className="ico">−</div>
                    </button>
                    <button className="max-button" onClick={buttonClick}>
                        <div className="ico">+</div>
                    </button>
                    <div className="content">{children}</div>
                </div>
            </div>
        </Draggable>
    );
}

export default DragWrapper;