import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Navbar'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="top-0 left-0 min-h-screen bg-fixed bg-center bg-cover" style={{ backgroundImage: "url('/src/assets/bg-photo-listing.jpg')" }}>
            <Navbar />
            <main className="mt-[300px] p-8">
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                {/* Dodaj dosta teksta ili komponenti da bi testirao scroll */}
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
                <p>Ovdje ide tvoj sadržaj ispod navbara...</p>
            </main>
        </div>
  )
}

export default App
