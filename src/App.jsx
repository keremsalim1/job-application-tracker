import { useState, useEffect } from 'react'
import Home from './pages/Home.jsx'

function App() {
  // Tema: ilk açılışta LocalStorage'dan okunur, yoksa 'light'
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('theme') || 'light'
  })

  // Tema her değiştiğinde sayfaya uygula ve kaydet
  useEffect(() => {
    document.documentElement.setAttribute('data-bs-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  // Açık ↔ koyu geçişi
  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar bg-primary" data-bs-theme="dark">
        <div className="container">
          <span className="navbar-brand fw-bold">
            <i className="bi bi-briefcase-fill me-2"></i>
            Job Application Tracker
          </span>

          <button className="btn btn-outline-light btn-sm" onClick={toggleTheme}>
            {theme === 'light' ? (
              <>
                <i className="bi bi-moon-fill me-1"></i>
                Dark
              </>
            ) : (
              <>
                <i className="bi bi-sun-fill me-1"></i>
                Light
              </>
            )}
          </button>
        </div>
      </nav>

      {/* Sayfa içeriği */}
      <main className="flex-grow-1">
        <Home />
      </main>

      {/* Footer */}
      <footer className="bg-body-tertiary border-top py-3">
        <div className="container text-center text-muted small">
          © {new Date().getFullYear()} Job Application Tracker · Built with React & Bootstrap 5
        </div>
      </footer>
    </div>
  )
}

export default App