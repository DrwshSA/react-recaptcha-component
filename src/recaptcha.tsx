import React from 'react';
import { getRecaptchaApiUrl } from './utils';

type RecaptchaType = 'image' | 'audio' | 'checkbox' | 'invisible';
type RecaptchaSize = 'normal' | 'compact';
type RecaptchaBadge = 'bottomright' | 'bottomleft' | 'inline' | 'none';
export type RecaptchaVersion = 'v2' | 'v3';

export interface RecaptchaProps {
  sitekey: string; 
  type?: RecaptchaType;
  size?: RecaptchaSize;
  badge?: RecaptchaBadge;
  version?: RecaptchaVersion;
  theme?: 'light' | 'dark';
  onChange?: (token: string | null) => void;
  onExpired?: () => void;
  onError?: () => void;
}

declare global {
  interface Window {
    grecaptcha: any;
    grecaptchaReady: () => void;
  }
}


const Recaptcha = ({
  sitekey,
  type = 'invisible',
  size = 'normal',
  badge = 'bottomright',
  version = 'v2',
  theme = 'light',
  onChange = () => {},
  onExpired = () => {},
  onError = () => {},
}: RecaptchaProps): JSX.Element => {
    const [widgetId, setWidgetId] = React.useState<number | undefined>(undefined);


  const renderRecaptcha = () => {
    if (version === 'v2') {
      let widgetParams: any = {
        sitekey,
        size,
        badge,
        callback: onChange,
        'expired-callback': onExpired,
        'error-callback': onError,
      };
      if (type === 'invisible') {
        widgetParams = {
          ...widgetParams,
          badge,
          size: undefined,
          'bind': 'submit',
        };
      } else if (type === 'checkbox') {
        widgetParams = {
          ...widgetParams,
          'hl': 'en',
          'theme': theme,
        };
      }
      const widgetId = window.grecaptcha.render('recaptcha', widgetParams);

      setWidgetId(widgetId);
    } else if (version === 'v3') {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(sitekey, { action: 'submit' }).then(onChange);
        
      });
    }
  };

  React.useEffect(() => {
    if (window.grecaptcha === undefined) {
      const script = document.createElement('script');
      script.id= 'recaptcha-script';
      script.src = getRecaptchaApiUrl(version, sitekey, theme);
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
  
      if (version === 'v3') {
        window.grecaptchaReady = renderRecaptcha;
      }
    } else {
      renderRecaptcha();
    }
  
    return () => {
        if (widgetId !== undefined) {
          window.grecaptcha.reset(widgetId);
        }
      };
  }, [widgetId]);

  return (<div id="recaptcha" data-testid="recaptcha-container"></div>);
};

export default Recaptcha;
