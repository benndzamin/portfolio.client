import './App.css'
import Navbar from './components/Navbar'

function App() {

  return (
          <main>
            <Navbar />
            <div
  id="background"
  className="
    relative bg-cover bg-center bg-no-repeat h-screen overflow-hidden

    before:content-[''] before:absolute before:inset-0
    before:bg-gradient-to-b before:from-black/30 before:to-black/70 before:z-10

    after:content-[''] after:absolute after:inset-0
    after:bg-[url('/grain.png')] after:bg-repeat after:bg-cover
    after:border after:border-red-500 after:bg-red-500 after:opacity-50

    after:opacity-20 after:mix-blend-overlay after:pointer-events-none after:z-20
  "
></div>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
              <p className="p-8">Ovdje ide tvoj sadržaj ispod navbara...</p>
          </main>
  )
}

export default App
