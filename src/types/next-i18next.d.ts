declare module 'next-i18next' {
  import { i18n, TFunction, InitOptions } from 'i18next';
  import { NextRouter } from 'next/router';
  
  export interface UserConfig {
    i18n: {
      defaultLocale: string;
      locales: string[];
      [key: string]: any;
    };
    [key: string]: any;
  }
  
  export interface SSRConfig {
    _nextI18Next: {
      initialI18nStore: any;
      initialLocale: string;
      userConfig: UserConfig;
      ns: string[];
    };
  }
  
  export function useTranslation(
    namespace?: string | string[],
    options?: { keyPrefix?: string }
  ): { t: TFunction; i18n: i18n };
  
  export function appWithTranslation<P>(
    WrappedComponent: React.ComponentType<P>,
    config?: UserConfig
  ): React.ComponentType<P>;
  
  export function serverSideTranslations(
    initialLocale: string,
    namespacesRequired?: string[] | undefined,
    configOverride?: UserConfig | null,
    extraLocales?: string[] | false
  ): Promise<SSRConfig>;
}

declare module 'next-i18next/serverSideTranslations' {
  export { serverSideTranslations } from 'next-i18next';
} 