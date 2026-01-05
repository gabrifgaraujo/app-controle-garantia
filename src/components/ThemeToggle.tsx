import { useEffect, useState } from 'react'
import '../style/ThemeToggle.css'
import darkModeIcon from '../assets/dark-mode.png'
import lightModeIcon from '../assets/light-mode.png'

type Theme = 'light' | 'dark'

const ThemeToggle = () => {
  const [theme, setTheme] = useState<Theme>('light')


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null

    if (savedTheme === 'dark') {
      document.body.classList.add('dark')
      setTheme('dark')
    }
  }, [])

  const toggleTheme = () => {
    const isDark = document.body.classList.toggle('dark')
    const newTheme: Theme = isDark ? 'dark' : 'light'

    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button className="theme-toggle" onClick={toggleTheme}>
      <img
      
        src={theme === 'dark' ? lightModeIcon : darkModeIcon}
        alt={theme === 'dark' ? 'Mudar para modo claro' : 'Mudar para modo escuro'}
      />
      <span>Alterar Tema</span>
    </button>
  )
}

export default ThemeToggle
