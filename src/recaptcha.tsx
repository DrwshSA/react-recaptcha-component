import React from 'react';
import { getRecaptchaApiUrl } from './utils';
import makeAsyncScriptLoad from './make-async-script-loader';


export type RecaptchaType = 'image' | 'audio' | 'checkbox' | 'invisible';
export type RecaptchaSize = 'normal' | 'compact';
export type RecaptchaBadge = 'bottomright' | 'bottomleft' | 'inline' | 'none';
export type RecaptchaVersion = 'v2' | 'v3';

export interface RecaptchaProps {
  sitekey: string; 
  type?: RecaptchaType;
  size?: RecaptchaSize;
  badge?: RecaptchaBadge;
  version?: RecaptchaVersion;
  theme?: 'light' | 'dark';
  onVerify?: (token: string | number | null) => void;
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
  onVerify = () => {},
  onExpired = () => {},
  onError = () => {},
}: RecaptchaProps) => {
    const [widgetId, setWidgetId] = React.useState<number | undefined>(undefined);
    const [scriptLoaded, setScriptLoaded] = React.useState(false);
    const recaptchaRef = React.useRef(null);

  const renderRecaptcha = () => {
    if (window.grecaptcha && version === 'v2') {

      let widgetParams: any = {
        sitekey,
        size,
        badge,
        callback: onVerify,
        'expired-callback': onExpired,
        'error-callback': onError,
        hl,
        'theme': theme
      };
      if (type === 'invisible' && recaptchaRef.current) {
        widgetParams = {
          ...widgetParams,
          size: 'invisible'
        };
      } else if (type === 'checkbox') {
        widgetParams = {
          ...widgetParams          
        };
      }
      const widgetId = window.grecaptcha.render(type==='invisible'? recaptchaRef.current : 'recaptcha', widgetParams);
      setWidgetId(widgetId);
    } else if (window.grecaptcha &&  version === 'v3') {
      window.grecaptcha.ready(() => {
        window.grecaptcha.execute(sitekey, { action: 'submit' }).then(onVerify);
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

  return (<div id="recaptcha" data-testid="recaptcha-container" ref={recaptchaRef}></div>);
};

export default Recaptcha;
