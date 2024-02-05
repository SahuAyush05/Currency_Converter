import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Header from './Components/Header'
import Card from './Components/Card'
import Convert from './Components/Conver'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      {/* <Card/> */}
      <Header/>
      <Convert/>
    </>
  )
}

export default App
