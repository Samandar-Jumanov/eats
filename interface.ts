interface CustomError extends Error {
    code: string;
  }
  
  function throwError(message: string, code: string): never {
    const error: CustomError = new Error(message) as CustomError;
    error.code = code;
    throw error;
  }
  
  try {
    throwError('This is a custom error message', 'CUSTOM_ERROR_CODE');
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Caught an error: ${error.message}`);
  
      if ('code' in error) {
        console.error(`Error code: ${error.code}`);
      }
    }
  }
  


  export default CustomError