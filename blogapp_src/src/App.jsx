import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClassComponent from './ClassComponent';

  
  const App=()=>{
    const [count, setCount] = useState(0);
    const increment =()=>
    {
      setCount(count + 1);
    };
    const decrement=()=>{
      setCount(count - 1);
    };

    return (
      <div>
      <h2>React Class and Funtional Component </h2>
      <p> Count:{count}</p>
      <button onClick={increment}>Increase</button>
      <button onClick={decrement}>Decrease</button>
      <ClassComponent/>
      </div>
    )
  }
  


export default App
