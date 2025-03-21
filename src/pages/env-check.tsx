import { GetServerSideProps } from 'next';
import { useState, useEffect } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface EnvCheckProps {
  serverEnv: {
    NEXT_PUBLIC_SITE_URL: string | null;
    NODE_ENV: string | null;
  };
}

export default function EnvCheck({ serverEnv }: EnvCheckProps) {
  const [clientEnv, setClientEnv] = useState<{
    NEXT_PUBLIC_SITE_URL: string | null;
    NODE_ENV: string | null;
  }>({
    NEXT_PUBLIC_SITE_URL: null,
    NODE_ENV: null,
  });

  useEffect(() => {
    // Проверяем переменные окружения на клиенте
    setClientEnv({
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
      NODE_ENV: process.env.NODE_ENV || null,
    });
  }, []);

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Проверка переменных окружения</h1>
      
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Переменные на сервере (SSR):</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="mb-2">
            <span className="font-semibold">NEXT_PUBLIC_SITE_URL:</span>{' '}
            {serverEnv.NEXT_PUBLIC_SITE_URL ? (
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {serverEnv.NEXT_PUBLIC_SITE_URL}
              </code>
            ) : (
              <span className="text-red-500">Не задана</span>
            )}
          </div>
          <div>
            <span className="font-semibold">NODE_ENV:</span>{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {serverEnv.NODE_ENV}
            </code>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-4">Переменные на клиенте (браузер):</h2>
        <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
          <div className="mb-2">
            <span className="font-semibold">NEXT_PUBLIC_SITE_URL:</span>{' '}
            {clientEnv.NEXT_PUBLIC_SITE_URL ? (
              <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
                {clientEnv.NEXT_PUBLIC_SITE_URL}
              </code>
            ) : (
              <span className="text-red-500">Не задана</span>
            )}
          </div>
          <div>
            <span className="font-semibold">NODE_ENV:</span>{' '}
            <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">
              {clientEnv.NODE_ENV}
            </code>
          </div>
        </div>
      </div>
      
      <div className="mt-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Важно!</h3>
        <p>
          Переменная <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">NEXT_PUBLIC_SITE_URL</code>{' '}
          должна быть задана в настройках проекта на Vercel в разделе &quot;Environment Variables&quot;.
        </p>
        <p className="mt-2">
          Пример значения: <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded">https://in-fomo.com</code>
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ locale = 'en' }) => {
  const translations = await serverSideTranslations(locale, ['common']);
  
  return {
    props: {
      ...translations,
      serverEnv: {
        NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || null,
        NODE_ENV: process.env.NODE_ENV || null,
      },
    },
  };
}; 