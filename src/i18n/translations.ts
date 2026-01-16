export const languages = {
  en: 'English',
  zh: '中文',
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';

export const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.about': 'About',
    'nav.blog': 'Blog',
    'nav.projects': 'Projects',

    // Home page
    'home.title': 'Building freedom technology',
    'home.subtitle': 'Tools and ideas that make individuals more sovereign. Privacy, ownership, truth — technology that serves you, not the other way around.',
    'home.cta': 'Read the blog',
    'home.latestWriting': 'Latest writing',
    'home.viewAll': 'View all',

    // About page
    'about.title': 'About',

    // Blog
    'blog.title': 'Blog',
    'blog.backToBlog': 'Back to blog',

    // Projects
    'projects.title': 'Projects',

    // Footer
    'footer.rights': 'All rights reserved.',

    // 404
    '404.title': 'Page not found',
    '404.description': "The page you're looking for doesn't exist or has been moved.",
    '404.backHome': 'Back to home',
  },
  zh: {
    // Navigation
    'nav.home': '首页',
    'nav.about': '关于',
    'nav.blog': '博客',
    'nav.projects': '项目',

    // Home page
    'home.title': '构建自由技术',
    'home.subtitle': '让个人更加自主的工具和理念。隐私、所有权、真相——为你服务的技术，而非相反。',
    'home.cta': '阅读博客',
    'home.latestWriting': '最新文章',
    'home.viewAll': '查看全部',

    // About page
    'about.title': '关于',

    // Blog
    'blog.title': '博客',
    'blog.backToBlog': '返回博客',

    // Projects
    'projects.title': '项目',

    // Footer
    'footer.rights': '保留所有权利。',

    // 404
    '404.title': '页面未找到',
    '404.description': '您正在寻找的页面不存在或已被移动。',
    '404.backHome': '返回首页',
  },
} as const;

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) {
    return lang as Lang;
  }
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof typeof translations.en): string {
    return translations[lang][key] || translations.en[key];
  };
}

export function getLocalizedPath(path: string, lang: Lang): string {
  // Remove any existing language prefix
  const cleanPath = path.replace(/^\/(en|zh)/, '') || '/';

  if (lang === defaultLang) {
    return cleanPath;
  }

  return `/${lang}${cleanPath === '/' ? '' : cleanPath}`;
}
