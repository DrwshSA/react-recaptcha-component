import { RecaptchaVersion } from "./recaptcha";

const RECAPTCHA_BASE_URL = 'https://www.google.com/recaptcha/api';

export const getRecaptchaApiUrl = (version: RecaptchaVersion, sitekey: string, theme: 'light' | 'dark') => {
  if (version === 'v2') {
    return `${RECAPTCHA_BASE_URL}/js/recaptcha_${version}.js?render=explicit&hl=en&onload=grecaptchaReady${theme ? `&theme=${theme}` : ''}`;
  }
    return `${RECAPTCHA_BASE_URL}/js/${version}.js?render=${sitekey}&hl=en${theme ? `&theme=${theme}` : ''}`;
  
};

