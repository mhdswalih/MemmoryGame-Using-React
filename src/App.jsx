import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Level1 from './components/Levels/Level1';
import Level2 from './components/Levels/Level2';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Level1 />} />
        <Route path='/level-2' element={<Level2 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;