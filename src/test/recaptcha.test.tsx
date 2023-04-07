import React from 'react';
import { act, render, screen  } from '@testing-library/react';
import '@testing-library/jest-dom';

import Recaptcha, { RecaptchaProps } from '../recaptcha';


describe('Recaptcha component', () => {
  const sitekey = '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI'; // global test key
  const onChange = jest.fn();
  const onExpired = jest.fn();
  const onError = jest.fn();

  beforeEach(() => {
    // Reset mock functions
    onChange.mockClear();
    onExpired.mockClear();
    onError.mockClear();

    // Mock window.grecaptcha object
    window.grecaptcha = {
      render: jest.fn(),
      reset: jest.fn(),
      execute: jest.fn().mockResolvedValue('token'),
      ready: jest.fn(),
    };
  });

  afterEach(() => {
    delete window.grecaptcha;
  });
``
  it('renders without crashing', () => {
    render(<Recaptcha sitekey={sitekey}  />);
    expect(screen.getByTestId('recaptcha-container')).toBeInTheDocument();
  });

  // it('renders the correct script URL for v2', () => {
  //   render(<Recaptcha sitekey={sitekey} />);
  //   const script = document.getElementById('recaptcha-script');
  //   expect(script).toHaveAttribute(
  //     'src',
  //     `https://www.google.com/recaptcha/api.js?render=explicit&hl=en&onload=grecaptchaReady`
  //   );
  // });

  // it('renders the correct script URL for v3', () => {
  //   render(<Recaptcha sitekey={sitekey} version="v3" />);
  //   const script = screen.getByTestId('recaptcha-container').querySelector('script');
  //   expect(script).toHaveAttribute(
  //     'src',
  //     `https://www.google.com/recaptcha/api.js?render=${sitekey}`
  //   );
  // });

  it('renders the correct container ID', () => {
    render(<Recaptcha sitekey={sitekey} />);
    const container = screen.getByTestId('recaptcha-container');
    expect(container).toHaveAttribute('id', 'recaptcha');
  });

  // it('resets the widget when the component unmounts', () => {
  //   const { unmount } = render(<Recaptcha sitekey={sitekey} />);
  //   expect(window.grecaptcha.reset).not.toHaveBeenCalled();
  //   unmount();
  //   expect(window.grecaptcha.reset).toHaveBeenCalledTimes(1);
  //   expect(window.grecaptcha.reset).toHaveBeenCalledWith(undefined);
  // });

  describe('props', () => {
    const defaultProps: RecaptchaProps = {
        sitekey: '6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI',
        onChange: () => {},
        onError: () => {},
        onExpired: () => {},
      };
    
      it('renders with default props', () => {
        render(<Recaptcha {...defaultProps} />);
        const recaptchaElement = screen.getByTestId('recaptcha-container');
    
        expect(recaptchaElement).toBeInTheDocument();
        expect(recaptchaElement).toHaveAttribute('id', 'recaptcha');
      });
    
      it('renders with specified type prop', () => {
        render(<Recaptcha {...defaultProps} type="checkbox" />);
        const recaptchaElement = screen.getByTestId('recaptcha-container');
    
        expect(recaptchaElement).toBeInTheDocument();
        expect(recaptchaElement).toHaveAttribute('id', 'recaptcha');
      });
    
      it('renders with specified size prop', () => {
        render(<Recaptcha {...defaultProps} size="compact" />);
        const recaptchaElement = screen.getByTestId('recaptcha-container');
    
        expect(recaptchaElement).toBeInTheDocument();
        expect(recaptchaElement).toHaveAttribute('id', 'recaptcha');
      });
    
      it('renders with specified badge prop', () => {
        render(<Recaptcha {...defaultProps} badge="inline" />);
        const recaptchaElement = screen.getByTestId('recaptcha-container');
    
        expect(recaptchaElement).toBeInTheDocument();
        expect(recaptchaElement).toHaveAttribute('id', 'recaptcha');
      });
    
      it('renders with specified version prop', () => {
        render(<Recaptcha {...defaultProps} version="v3" />);
        const recaptchaElement = screen.getByTestId('recaptcha-container');
    
        expect(recaptchaElement).toBeInTheDocument();
        expect(recaptchaElement).toHaveAttribute('id', 'recaptcha');
      });
    
      it('renders with specified theme prop', () => {
        render(<Recaptcha {...defaultProps} theme="dark" />);
        const recaptchaElement = screen.getByTestId('recaptcha-container');
    
        expect(recaptchaElement).toBeInTheDocument();
        expect(recaptchaElement).toHaveAttribute('id', 'recaptcha');
      });
    
      // test('calls onChange when the user completes the challenge', async () => {
      //   const onChange = jest.fn();
      //   render(<Recaptcha {...defaultProps} onChange={onChange} />);
      //   const container = screen.getByTestId('recaptcha-container');
      //   act(() => {
      //     container.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      //   });
      //   await act(() => new Promise(resolve => setTimeout(resolve, 1000)));
      //   expect(onChange).toHaveBeenCalledTimes(1);
      //   expect(onChange).toHaveBeenCalledWith(expect.any(String));
      // });
    
      it('calls onError when there is an error loading the challenge', () => {
        window.grecaptcha.render.mockImplementation(() => {
          onError();
        });

        render(<Recaptcha {...defaultProps} sitekey={sitekey} onError={onError} />);
        expect(onError).toHaveBeenCalledTimes(1);
      });
  });
});

