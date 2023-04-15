import React from 'react';
import { getRecaptchaApiUrl } from './utils';
import makeAsyncScriptLoad from './make-async-script-loader';


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
  hl?: string;
}

declare global {
  interface Window {
    grecaptcha: any;
    grecaptchaReady: () => void;
  }
}


const Recaptcha = ({
  sitekey,
  type = 'checkbox',
  size = 'normal',
  badge = 'bottomright',
  version = 'v2',
  theme = 'light',
  hl,
  onChange = () => {},
  onExpired = () => {},
  onError = () => {},
}: RecaptchaProps): JSX.Element => {
    const [widgetId, setWidgetId] = React.useState<number | undefined>(undefined);
    const [scriptLoaded, setScriptLoaded] = React.useState(false);



  const renderRecaptcha = () => {
    if (window.grecaptcha && version === 'v2') {

      let widgetParams: any = {
        sitekey,
        size,
        badge,
        callback: onChange,
        'expired-callback': onExpired,
        'error-callback': onError,
        hl
      };
      if (type === 'invisible') {
        widgetParams = {
          ...widgetParams,
          size: 'invisible',
          bind: 'submit'
        };
      } else if (type === 'checkbox') {
        widgetParams = {
          ...widgetParams,
          'theme': theme,
        };
      }
      const widgetId = window.grecaptcha.render('recaptcha', widgetParams);

      setWidgetId(widgetId);
    } else if (window.grecaptcha &&  version === 'v3') {
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

      makeAsyncScriptLoad(getRecaptchaApiUrl(version, sitekey, theme))
      .then(() => {
        setScriptLoaded(true);
      })
      .catch((error) => {
        console.error('Error loading reCAPTCHA script', error);
      });

    }
    
    return () => {
        if (widgetId !== undefined) {
          window.grecaptcha.reset(widgetId);
        }
      };
  }, [widgetId]);

  React.useEffect(() => {
    if (scriptLoaded) {
      window.grecaptcha.ready(() => {
        if (window.grecaptcha.render) {
          if (version === 'v3') {
            window.grecaptchaReady = renderRecaptcha;
          }
          else {
            renderRecaptcha();
          }
        }
      });
      
    }
  }, [scriptLoaded, version]);

  return (<div id="recaptcha" data-testid="recaptcha-container"></div>);
};

export default Recaptcha;
