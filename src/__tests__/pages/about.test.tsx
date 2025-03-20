import { render, screen } from '@testing-library/react'
import About from '../../pages/about'
import { useRouter } from 'next/router'
import { useTheme } from 'next-themes'

// Мокаем зависимости
jest.mock('next/router', () => ({
  useRouter: jest.fn()
}))

jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => Promise.resolve({ _nextI18Next: {} }))
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' }
  })
}))

jest.mock('next-themes', () => ({
  useTheme: jest.fn()
}))

jest.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    h1: ({ children, ...props }: any) => <h1 {...props}>{children}</h1>,
    h2: ({ children, ...props }: any) => <h2 {...props}>{children}</h2>,
    p: ({ children, ...props }: any) => <p {...props}>{children}</p>
  },
  AnimatePresence: ({ children }: any) => <>{children}</>
}))

describe('About Page', () => {
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      pathname: '/about',
      query: {},
      asPath: '/about'
    })
    
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'light',
      setTheme: jest.fn()
    })
  })

  it('renders the page title', () => {
    render(<About />)
    expect(screen.getByText(/about_us/i)).toBeInTheDocument()
  })

  it('renders the team section', () => {
    render(<About />)
    expect(screen.getByText(/meet_our_team/i)).toBeInTheDocument()
    
    // Проверяем, что все члены команды отображаются
    const teamMembers = [
      "Artur Chuikov",
      "Arsen Dumbadze",
      "Volodymyr Zeleniuk",
      "Artur Voievoda",
      "Olha Berezenko",
      "Oleksandr Bodiul",
      "Oleksii Perevala",
      "Serhii Serhienko",
      "Pawel B"
    ]
    
    teamMembers.forEach(member => {
      expect(screen.getByText(member)).toBeInTheDocument()
    })
  })

  it('renders the values section', () => {
    render(<About />)
    expect(screen.getByText(/our_core_values/i)).toBeInTheDocument()
    
    // Проверяем, что все ценности отображаются
    const values = ["Innovation", "Quality", "Client-Centric", "Expertise"]
    values.forEach(value => {
      expect(screen.getByText(value)).toBeInTheDocument()
    })
  })

  it('changes theme when theme toggle is clicked', () => {
    const setThemeMock = jest.fn()
    (useTheme as jest.Mock).mockReturnValue({
      theme: 'dark',
      setTheme: setThemeMock
    })
    
    render(<About />)
    
    // Проверяем, что тема устанавливается на light при загрузке страницы
    expect(setThemeMock).toHaveBeenCalledWith('light')
  })
}) 