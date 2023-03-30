Example of use as a sub library in React project

- First, install the library using npm or yarn:
    ```
        npm install react-recaptcha-component
    ```
    ```
        yarn add react-recaptcha-component
    ```

- Create a wrapper Component and dont forget to pass your specific your-site-key
    ```
        import React, { useState } from 'react';
        import { Recaptcha } from 'react-recaptcha-component';

        const RecaptchaWrapper = () => {
        const [recaptchaToken, setRecaptchaToken] = useState(null);

        const handleRecaptchaChange = (token) => {
            setRecaptchaToken(token);
        };

        return (
            <div>
            <h1>Recaptcha Wrapper</h1>
            <Recaptcha sitekey="your-site-key" onChange={handleRecaptchaChange} />
            <p>Recaptcha Token: {recaptchaToken}</p>
            </div>
        );
        };

        export default RecaptchaWrapper;
    ```

- Finally, in your React project, render the RecaptchaWrapper component wherever you want to use it:
    ```
        import React from 'react';
        import RecaptchaWrapper from './RecaptchaWrapper';

        const YourComponent = () => {
        return (
            <div>
            <h1>YourComponent</h1>
            <RecaptchaWrapper />
            </div>
        );
        };

        export default YourComponent;
    ```