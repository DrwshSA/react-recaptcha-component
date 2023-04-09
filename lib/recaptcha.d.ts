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
declare const Recaptcha: ({ sitekey, type, size, badge, version, theme, onChange, onExpired, onError, }: RecaptchaProps) => JSX.Element;
export default Recaptcha;
