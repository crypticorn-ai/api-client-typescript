// Import necessary types
import { ApiErrorIdentifier, ApiErrorType, ApiErrorLevel } from './errors';

export interface ExceptionDetail {
  /** An additional error message */
  message?: string;
  /** The unique error code */
  code: ApiErrorIdentifier;
  /** The type of error */
  type: ApiErrorType;
  /** The level of the error */
  level: ApiErrorLevel;
  /** The HTTP status code */
  statusCode: number;
  /** Additional details about the error */
  details?: any;
}
