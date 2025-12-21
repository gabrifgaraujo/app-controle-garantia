import './ThemeToggle.css'
import darkModeIcon from '../assets/dark-mode.png'

const ThemeToggle = () => {
  const toggleTheme = () => {
    document.body.classList.toggle('dark')

    const isDark = document.body.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <img src={darkModeIcon} alt="Alternar tema" />
    </button>
  )
}

export default ThemeToggle
