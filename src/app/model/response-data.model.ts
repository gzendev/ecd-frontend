export interface ResponseData <T> {
    hasError: boolean;
    message: string;
    response: T;
}
  