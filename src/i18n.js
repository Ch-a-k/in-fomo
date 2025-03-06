import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next) // передаем i18next в react-i18next
  .init({
    resources: {
      en: {
        translation: {
          "portfolio": {
            "title": "Portfolio",
            "viewProject": "View Project",
            "projects": [
              {
                "title": "DeFi Platform",
                "description": "Decentralized finance platform with smart contracts",
                "link": "https://project1.com",
                "image": "/images/project1.jpg",
                "category": "Web-3"
              },
              {
                "title": "AI Chat Assistant",
                "description": "Advanced chatbot powered by machine learning",
                "link": "https://project2.com",
                "image": "/images/project2.jpg",
                "category": "AI Solutions"
              }
            ]
          },
          "about": {
            "title": "About Me",
            "subtitle": "Passionate developer with expertise in modern web technologies and blockchain development",
            "heroImage": "/images/profile.jpg",
            "longDescription": "I am a passionate developer with extensive experience in creating modern web applications, blockchain solutions, and AI-powered systems. My goal is to deliver high-quality software that solves real-world problems and provides exceptional user experiences.",
            "skills": {
              "title": "Skills & Expertise",
              "items": [
                {
                  "name": "Frontend Development",
                  "description": "React, Next.js, TypeScript"
                },
                {
                  "name": "Backend Development",
                  "description": "Node.js, Python, Go"
                },
                {
                  "name": "Blockchain",
                  "description": "Solidity, Web3.js, Ethers.js"
                },
                {
                  "name": "DevOps",
                  "description": "Docker, AWS, CI/CD"
                }
              ]
            },
            "experience": {
              "title": "Professional Experience",
              "items": [
                {
                  "period": "2021 - Present",
                  "role": "Senior Full Stack Developer",
                  "company": "Tech Company",
                  "description": "Leading development of enterprise applications..."
                },
                {
                  "period": "2018 - 2021",
                  "role": "Blockchain Developer",
                  "company": "Crypto Startup",
                  "description": "Developed smart contracts and DeFi applications..."
                }
              ]
            }
          },
          "contact": {
            "general_title": "General Inquiries",
            "dev_title": "Development Department",
            "careers_title": "Careers Department",
            "name_placeholder": "Your Name",
            "contact_placeholder": "Your Contact Info",
            "message_placeholder": "Your Message",
            "characters_left": "characters left",
            "sending": "Sending...",
            "send_message": "Send Message",
            "success_message": "Message sent successfully!",
            "error_message": "Error sending message. Please try again."
          },
          "our_core_values": "Our Core Values",
          "meet_our_team": "meet_our_team",
          "join_our_team": "join_our_team",
          "join_team_text": "We're always looking for talented individuals to join our team. If you're passionate about technology and innovation, we'd love to hear from you!",
          "get_in_touch": "get_in_touch",
          "toggle_theme": "Toggle theme",
          "close_menu": "Close menu",
          "open_menu": "Open menu",
          "appearance": "Appearance",
          "light": "Light",
          "dark": "Dark",
          "light_mode": "Light Mode",
          "dark_mode": "Dark Mode",
          "system_mode": "System Mode",
          "ready_to_start": "Ready to Start Your Project?",
          "contact_us": "contact_us",
          "contact_description": "Contact us today to discuss how we can help bring your ideas to life with our expertise and innovative solutions."
        }
      },
      ru: {
        translation: {
          "portfolio": {
            "title": "Портфолио",
            "viewProject": "Смотреть проект",
            "projects": [
              {
                "title": "DeFi Платформа",
                "description": "Децентрализованная финансовая платформа со смарт-контрактами",
                "link": "https://project1.com",
                "image": "/images/project1.jpg",
                "category": "Web-3"
              },
              {
                "title": "AI Чат-ассистент",
                "description": "Продвинутый чатбот на основе машинного обучения",
                "link": "https://project2.com",
                "image": "/images/project2.jpg",
                "category": "AI Solutions"
              }
            ]
          },
          "about": {
            "title": "Обо мне",
            "subtitle": "Увлеченный разработчик с опытом в современных веб-технологиях и блокчейн-разработке",
            "heroImage": "/images/profile.jpg",
            "longDescription": "Я увлеченный разработчик с обширным опытом создания современных веб-приложений, блокчейн-решений и систем на базе искусственного интеллекта. Моя цель — создавать качественное программное обеспечение, которое решает реальные проблемы и обеспечивает исключительный пользовательский опыт.",
            "skills": {
              "title": "Навыки и экспертиза",
              "items": [
                {
                  "name": "Frontend Разработка",
                  "description": "React, Next.js, TypeScript"
                },
                {
                  "name": "Backend Разработка",
                  "description": "Node.js, Python, Go"
                },
                {
                  "name": "Блокчейн",
                  "description": "Solidity, Web3.js, Ethers.js"
                },
                {
                  "name": "DevOps",
                  "description": "Docker, AWS, CI/CD"
                }
              ]
            },
            "experience": {
              "title": "Профессиональный опыт",
              "items": [
                {
                  "period": "2021 - Настоящее время",
                  "role": "Старший Full Stack Разработчик",
                  "company": "Технологическая компания",
                  "description": "Руководство разработкой корпоративных приложений..."
                },
                {
                  "period": "2018 - 2021",
                  "role": "Блокчейн-разработчик",
                  "company": "Крипто-стартап",
                  "description": "Разработка смарт-контрактов и DeFi приложений..."
                }
              ]
            }
          },
          "contact": {
            "general_title": "Общие вопросы",
            "dev_title": "Отдел разработки",
            "careers_title": "Отдел карьеры",
            "name_placeholder": "Ваше имя",
            "contact_placeholder": "Ваши контактные данные",
            "message_placeholder": "Ваше сообщение",
            "characters_left": "осталось символов",
            "sending": "Отправка...",
            "send_message": "Отправить сообщение",
            "success_message": "Сообщение успешно отправлено!",
            "error_message": "Ошибка при отправке сообщения. Пожалуйста, попробуйте еще раз."
          },
          "our_core_values": "Наши основные ценности",
          "meet_our_team": "meet_our_team",
          "join_our_team": "join_our_team",
          "join_team_text": "Мы всегда ищем талантливых людей, чтобы присоединиться к нашей команде. Если вы увлечены технологиями и инновациями, мы будем рады услышать от вас!",
          "get_in_touch": "get_in_touch",
          "toggle_theme": "Переключить тему",
          "close_menu": "Закрыть меню",
          "open_menu": "Открыть меню",
          "appearance": "Внешний вид",
          "light": "Светлая",
          "dark": "Темная",
          "light_mode": "Светлый режим",
          "dark_mode": "Темный режим",
          "system_mode": "Системный режим",
          "ready_to_start": "Готовы начать свой проект?",
          "contact_us": "contact_us",
          "contact_description": "Свяжитесь с нами сегодня, чтобы обсудить, как мы можем помочь реализовать ваши идеи с нашей экспертизой и инновационными решениями."
        }
      },
      pl: {
        translation: {
          "tagline": "Innowacyjne rozwiązania IT",
          "meta_description": "IN-FOMO oferuje innowacyjne rozwiązania IT do transformacji Twojego biznesu w dzisiejszym cyfrowym świecie.",
          "home": "Strona główna",
          "services": "Usługi",
          "portfolio": "Portfolio",
          "about": "O nas",
          "contact": "Kontakt",
          "get_in_touch": "Skontaktuj się",
          "footer_copyright": " 2025 IN-FOMO. Wszelkie prawa zastrzeżone.",
          "footer_privacy": "Polityka prywatności",
          "footer_terms": "Warunki korzystania",
          "select_language": "Wybierz język",
          "toggle_theme": "Przełącz motyw",
          "close_menu": "Zamknij menu",
          "open_menu": "Otwórz menu",
          "appearance": "Wygląd",
          "light": "Jasny",
          "dark": "Ciemny",
          "light_mode": "Jasny motyw",
          "dark_mode": "Ciemny motyw",
          "system_mode": "Motyw systemowy",
          "all_rights_reserved": "Wszelkie prawa zastrzeżone",
          "privacy_policy": "Polityka prywatności",
          "terms_of_service": "Warunki korzystania",
          "ready_to_start": "Gotowy do rozpoczęcia projektu?",
          "contact_us": "Skontaktuj się z nami",
          "contact_description": "Skontaktuj się z nami już dziś, aby omówić, jak możemy pomóc w realizacji Twoich pomysłów dzięki naszej wiedzy i innowacyjnym rozwiązaniom."
        }
      },
      uk: {
        translation: {
          "tagline": "Інноваційні IT-рішення",
          "meta_description": "IN-FOMO пропонує інноваційні IT-рішення для трансформації вашого бізнесу в сучасному цифровому світі.",
          "home": "Головна",
          "services": "Послуги",
          "portfolio": "Портфоліо",
          "about": "Про нас",
          "contact": "Контакти",
          "get_in_touch": "Зв'язатися",
          "toggle_theme": "Перемкнути тему",
          "close_menu": "Закрити меню",
          "open_menu": "Відкрити меню",
          "footer_copyright": " 2025 IN-FOMO. Усі права захищені.",
          "footer_privacy": "Політика конфіденційності",
          "footer_terms": "Умови використання",
          "select_language": "Вибрати мову",
          "appearance": "Оформлення",
          "light": "Світла",
          "dark": "Темна",
          "light_mode": "Світла тема",
          "dark_mode": "Темна тема",
          "system_mode": "Системна тема",
          "all_rights_reserved": "Усі права захищені",
          "privacy_policy": "Політика конфіденційності",
          "terms_of_service": "Умови використання",
          "ready_to_start": "Готові почати свій проект?",
          "contact_us": "Зв'яжіться з нами",
          "contact_description": "Зв'яжіться з нами сьогодні, щоб обговорити, як ми можемо допомогти втілити ваші ідеї в життя за допомогою нашого досвіду та інноваційних рішень."
        }
      }
    },
    lng: 'en', // язык по умолчанию
    fallbackLng: 'en', // язык, который будет использоваться, если перевод не найден
    interpolation: {
      escapeValue: false, // React уже экранирует значения
    },
  });

export default i18n;