import './App.css';
import Visualization from './components/Skilltree';
import DragWrapper from './components/DragWrapper';
import Toolbar from './components/Toolbar';

function App() {
  return (
    <div className="App">
      <DragWrapper>
        {/* <Visualizatio */}
        <h1>Lorem Ipsum</h1>
        <p>Lorem ipsum Lorem ipsum<br/>Lorem ipsum Lorem ipsum<br/>Lorem ipsum Lorem ipsum<br/>Lorem ipsum</p>
      </DragWrapper>
      <Toolbar/>
    </div>
  );
}

export default App;
