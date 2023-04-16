import React from 'react';
import Recaptcha from '../src/recaptcha';
import { createRoot } from 'react-dom/client';

const ExampleRecaptcha = () => {
  const [token, setToken] = React.useState<string | null | number>(null);

  const handleTokenChange = (newToken: string | number |null) => {
    setToken(newToken);
  };

  const handleExpired = () => {
    alert(`handleExpired`);
    setToken(null);
  };

  const handleError = () => {
    alert(`Error rendering recaptcha`);
    setToken(null);
  };

  return (
    <div>
      <Recaptcha
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        type='checkbox'
        size="normal"
        badge="bottomright"
        version="v2"
        theme="light"
        onVerify={handleTokenChange}
        onExpired={handleExpired}
        onError={handleError}
      />
      <p>Token: {token}</p>
      <button disabled={!token}>Submit</button>
    </div>
  );
};




function renderApp() {
  const container = document.getElementById('root');
    if (container && container.nodeType === Node.ELEMENT_NODE) {
      const root = createRoot(container!);
      root.render(<ExampleRecaptcha />);
    } else {
      console.error("Target container is not a valid DOM element.");
    }
}
window.onload = function () {
  renderApp();
};

