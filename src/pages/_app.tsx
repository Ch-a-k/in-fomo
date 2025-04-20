import { AppProps } from "next/app";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import "../styles/globals.css";
import nextI18NextConfig from "../../next-i18next.config.js";
import { initLoadOptimizations } from "../utils/optimizeLoad";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false);

  // Инициализируем оптимизации загрузки
  useEffect(() => {
    setMounted(true);

    // Инициализируем оптимизации загрузки после монтирования компонента
    if (typeof window !== "undefined") {
      initLoadOptimizations();
    }
  }, []);

  // Эффект для управления Save-Data
  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReducedData = () => {
      if ("connection" in navigator) {
        const conn = (navigator as any).connection;
        if (conn && conn.saveData) {
          document.documentElement.classList.add("save-data");
          return true;
        }
      }
      return false;
    };

    // Проверяем, является ли устройство iOS с нижней панелью навигации
    const isIOSWithSafeArea = () => {
      // Проверка на iOS
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) &&
        !(window as any).MSStream;

      // Проверка на поддержку safe-area-inset
      if (isIOS) {
        // Если iOS, добавляем спец. класс для viewport-fit
        document.documentElement.classList.add("ios-device");

        // Для iPhone X и выше
        const aspectRatio = window.screen.width / window.screen.height;
        return (
          isIOS &&
          // iPhone X/XS, iPhone 12/13 Mini
          (aspectRatio.toFixed(2) === (9 / 19.5).toFixed(2) ||
            // iPhone XS Max, iPhone XR, iPhone 11/12/13
            aspectRatio.toFixed(2) === (9 / 19.5).toFixed(2) ||
            // iPhone 12/13 Pro Max
            aspectRatio.toFixed(2) === (9 / 19.5).toFixed(2))
        );
      }

      return false;
    };

    // Применяем нужные классы
    if (isIOSWithSafeArea()) {
      document.documentElement.classList.add("has-safe-area");
    }

    // Применяем оптимизации для экономии данных
    if (prefersReducedData()) {
      // Удаляем анимации и тяжелые эффекты для экономии данных
      // Но не добавляем дублирующий viewport мета-тег
      const style = document.createElement("style");
      style.textContent = `
        @media (prefers-reduced-data: reduce) {
          *, *::before, *::after {
            animation-duration: 0.001ms !important;
            transition-duration: 0.001ms !important;
          }
        }
      `;
      document.head.appendChild(style);
    }
  }, []);

  if (!mounted) {
    return (
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <div className="min-h-screen bg-white dark:bg-[#121212]" />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Layout footerVariant={pageProps.footerVariant || "design1"}>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}

export default appWithTranslation(MyApp, nextI18NextConfig);
