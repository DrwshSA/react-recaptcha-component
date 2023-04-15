type ScriptOptions = {
    id?: string;
    async?: boolean;
    defer?: boolean;
  };
  
  const makeAsyncScriptLoad = (url: string, options?: ScriptOptions) => {
    const script = document.createElement('script');
    script.src = url;
    script.async = options?.async ?? true;
    script.defer = options?.defer ?? true;
    if (options?.id) {
      script.id = options?.id;
    }
  
    const promise = new Promise<void>((resolve, reject) => {
      script.onload = () => {
        resolve();
      };
      script.onerror = (error) => {
        reject(error);
      };
    });
  
    document.head.appendChild(script);
  
    return promise;
  };
  
  export default makeAsyncScriptLoad;
  