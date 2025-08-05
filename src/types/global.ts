type Error = {
  success: boolean;
  message: string;
};

type MongoObjectId = {
  $oid: string;
};

type MongoDate = {
  $date: string;
};

type ErrorResponse = {success: boolean; message: string};

interface SuccessResponse<T> {
  status_code: number;
  // success: boolean;
  message: string;
  data: T;
}

type SuccessNullResponse = SuccessResponse<null>;

export type {
  Error,
  MongoDate,
  ErrorResponse,
  SuccessNullResponse,
  SuccessResponse,
  MongoObjectId,
};
