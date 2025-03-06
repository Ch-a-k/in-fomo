import { render, screen, waitFor } from '@testing-library/react'
import { RouterContext } from 'next/dist/shared/lib/router-context'
import { createMockRouter } from '../../test-utils/createMockRouter'
import About from '../../pages/about'

// Интеграционный тест с настоящими компонентами
jest.mock('next-i18next/serverSideTranslations', () => ({
  serverSideTranslations: jest.fn(() => Promise.resolve({ _nextI18Next: {} }))
}))

jest.mock('next-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { language: 'en' }
  })
}))

describe('About Page Integration', () => {
  it('navigates to other pages when links are clicked', async () => {
    const router = createMockRouter({ pathname: '/about' })
    
    render(
      <RouterContext.Provider value={router}>
        <About />
      </RouterContext.Provider>
    )
    
    // Находим ссылку на страницу контактов
    const contactLink = screen.getByText('contact')
    contactLink.click()
    
    // Проверяем, что router.push был вызван с правильным путем
    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith('/contact', expect.anything(), expect.anything())
    })
  })
  
  it('renders with correct theme classes', () => {
    const router = createMockRouter({ pathname: '/about' })
    
    render(
      <RouterContext.Provider value={router}>
        <About />
      </RouterContext.Provider>
    )
    
    // Проверяем, что классы темы применяются правильно
    const mainElement = screen.getByRole('main')
    expect(mainElement).toHaveClass('bg-white')
    expect(mainElement).toHaveClass('text-gray-800')
  })
}) 