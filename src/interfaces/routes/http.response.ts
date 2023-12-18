import { Response } from 'express';

enum HttpStatus {
  OK = 200,
  SUCCESSFULLY_DELETED = 204,
  NOT_FOUND = 404,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  INTERAL_SERVER_ERROR = 500
}

export default class HttpResponse {
  Ok(res: Response, data?: unknown): Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: 'Success',
      data: data
    });
  }

  SuccessfullyDeleted(res: Response, data?: unknown): Response {
    return res.status(HttpStatus.SUCCESSFULLY_DELETED).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: 'Successfully Deleted',
      data: data
    });
  }

  NotFound(res: Response, data?: unknown): Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: 'Not Found',
      error: data
    });
  }
  Unauthorized(res: Response, data?: unknown): Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: 'Not authorized',
      error: data
    });
  }

  Forbidden(res: Response, data?: unknown): Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: 'Forbidden',
      error: data
    });
  }
}
