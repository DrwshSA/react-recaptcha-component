import { RecaptchaVersion } from "./recaptcha";

const RECAPTCHA_BASE_URL = 'https://www.google.com/recaptcha/api';

export const getRecaptchaApiUrl = (version: RecaptchaVersion, sitekey: string, theme: 'light' | 'dark') => {
  if (version === 'v2') {
    return `${RECAPTCHA_BASE_URL}.js?render=explicit${theme ? `&theme=${theme}` : ''}`;
  }
    return `${RECAPTCHA_BASE_URL}.js?render=${sitekey}${theme ? `&theme=${theme}` : ''}`;
  
};

