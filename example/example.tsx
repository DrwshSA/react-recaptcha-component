import React, { useState } from 'react';
import Recaptcha from '../src/recaptcha';
import { createRoot } from 'react-dom/client';


const ExampleRecaptcha = () => {
  const [token, setToken] = useState<string | null>(null);

  const handleTokenChange = (newToken: string | null) => {
    console.log('Token:', newToken);
    setToken(newToken);
  };

  const handleExpired = () => {
    console.log('Recaptcha expired');
    setToken(null);
  };

  const handleError = () => {
    console.error('Error rendering recaptcha');
    setToken(null);
  };

  return (
    <div>
      <Recaptcha
        sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
        type="checkbox"
        size="normal"
        badge="bottomright"
        version="v2"
        theme="light"
        onChange={handleTokenChange}
        onExpired={handleExpired}
        onError={handleError}
      />
      <p>Token: {token}</p>
    </div>
  );
};




function renderApp() {
  const container = document.getElementById('root');
  console.log('container type', container)
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

