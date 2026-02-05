import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { MongoDuplicateKeyError } from '../errors/mongo-duplicate-key.error';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    // Mongo duplicate key error
    if (this.isMongoDuplicateKeyError(exception)) {
      const [field, value] = Object.entries(exception.keyValue)[0];
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: HttpStatus.BAD_REQUEST,
        error: 'Duplicate Key',
        message: 'Resource already exists',
        conflict: { field, value },
      });
    }

    // NestJS HttpException (NotFound, BadRequest, etc)
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const res = exception.getResponse();
      return response.status(status).json(res);
    }

    // Generic fallback
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal server error',
    });
  }

  private isMongoDuplicateKeyError(
    exception: unknown,
  ): exception is MongoDuplicateKeyError {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'code' in exception &&
      (exception as MongoDuplicateKeyError).code === 11000 &&
      'keyValue' in exception
    );
  }
}
