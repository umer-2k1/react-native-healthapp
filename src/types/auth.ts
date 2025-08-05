import type {
  ErrorResponse,
  SuccessNullResponse,
  SuccessResponse,
} from './global';
import {UserSucess} from './user';

// ** Payload
type SignInRequest = {
  full_name: string;
  email: string;
  identification_token: string;
  authorization_code: string;
};

// ** Success

type RefresTokenSuccess = {
  data: {
    access_token: string;
  };
};

type DecodedToken = {
  aud: string;
  exp: number;
  iat: number;
  iss: string;
  sub: string;
  email: string;
  email_verified: boolean;
  nonce: string;
};

type SignInResponse = SuccessResponse<UserSucess> | ErrorResponse;
type LogoutResponse = SuccessNullResponse | ErrorResponse;
type RefresTokenResponse = SuccessResponse<RefresTokenSuccess> | ErrorResponse;
export type {
  SignInResponse,
  SignInRequest,
  LogoutResponse,
  RefresTokenResponse,
  DecodedToken,
};
