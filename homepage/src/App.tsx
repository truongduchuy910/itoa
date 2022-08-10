import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <h1 style={{ textTransform: 'uppercase' }}>
        I<span style={{ color: 'var(--color-delta)' }}>to</span>a
      </h1>
      <h2>Intelligent to archivement</h2>
      <ul>
        <li>Trần Ngọc Huy - backend</li>
        <li>Nguyễn Tấn Hiệp - fontend</li>
        <li>Nguyễn Huỳnh Quang - tester</li>
      </ul>
      <hr />
      <footer>
        <code>copyright of itoa coporation 2022</code>
      </footer>
    </div>
  );
}

export default App;
