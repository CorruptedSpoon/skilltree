// a container component that wraps a component and creates a draggable box around it
import React from 'react';
import Draggable from 'react-draggable';
import './styles/DragWrapper.scss';

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
        
        const showIco = () => icos.forEach(ico => ico.classList.add('show'));
        const hideIco = () => icos.forEach(ico => ico.classList.remove('show'));

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
                        <svg className="ico"/>
                    </button>
                    <button className="min-button" onClick={buttonClick}>
                        <svg className="ico"/>
                    </button>
                    <button className="max-button" onClick={buttonClick}>
                        <svg className="ico"/>
                    </button>
                    <div className="content">{children}</div>
                </div>
            </div>
        </Draggable>
    );
}

export default DragWrapper;