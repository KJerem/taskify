export class AppError extends Error {
    public readonly statusCode: number;
    public readonly isOperational: boolean;
  
    constructor(message: string, statusCode: number, isOperational = true) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = isOperational;
  
      // Set the prototype explicitly to maintain the inheritance chain.
      Object.setPrototypeOf(this, new.target.prototype);
  
      // Captures the stack trace for debugging purposes.
      Error.captureStackTrace(this);
    }
  }
  
  export class ErrorUtil {
    /**
     * Factory method to create a validation error.
     * @param message - Description of the validation error.
     */
    static validationError(message: string): AppError {
      return new AppError(message, 400, true);
    }
  
    /**
     * Factory method to create an authentication error.
     * @param message - Description of the authentication error.
     */
    static authenticationError(message: string): AppError {
      return new AppError(message, 401, true);
    }
  
    /**
     * Factory method to create a not found error.
     * @param message - Description of the not found error.
     */
    static notFoundError(message: string): AppError {
      return new AppError(message, 404, true);
    }
  
    /**
     * Factory method to create an internal server error.
     * @param message - Description of the internal server error.
     */
    static internalServerError(message: string): AppError {
      return new AppError(message, 500, true);
    }
  }
  