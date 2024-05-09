import { HttpRes } from './http.response';
import { HttpStatus } from '@/constants/enums';

/**
 * API Response Class
 */
export class ApiRes {
  /**
   * OK Response function.
   */
  static ok(data: any, message?: string) {
    return new HttpRes(data, HttpStatus.OK, message || 'Success');
  }

  /**
   * Created Response function.
   */
  static created(data: any, message?: string) {
    return new HttpRes(
      data,
      HttpStatus.CREATED,
      message || 'Resource created successfully',
    );
  }
}
