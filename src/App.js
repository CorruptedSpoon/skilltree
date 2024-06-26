import './App.css';
import Visualization from './components/Skilltree';
import DragWrapper from './components/DragWrapper';

function App() {
  return (
    <div className="App">
      <DragWrapper>
        <Visualization />
      </DragWrapper>
    </div>
  );
}

export default App;
