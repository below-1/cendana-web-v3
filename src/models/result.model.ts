export interface Data<T> {
  type: 'data';
  item: T;
}

export type Failure = {
  type: 'fail';
  error: Error;
}

export type Loading = {
  type: 'loading';
}

export type Result<T> = Data<T> | Failure | Loading
