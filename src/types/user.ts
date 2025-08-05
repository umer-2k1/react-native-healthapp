import {ErrorResponse, SuccessResponse} from './global';

type User = {
  id: number;
  full_name: string;
  phone: string | null;
  dob: string | null;
  gender: string | null;
  email: string;
  accept_terms: boolean;
  health_kit_enabled: boolean;
  onboarding_completed: boolean;
  created_at: string;
  updated_at: string;
  token_creation_at: string;
  data_sync_at: string;
};

type UserSucess = {
  user: User;
  access_token: string;
  refresh_token: string;
};

// ** Payload

type UserProfileUpdateRequest = {
  full_name?: string;
  phone?: string;
  dob?: string;
  gender?: string;
  accept_terms?: boolean;
  health_kit_enabled?: boolean;
  onboarding_completed?: boolean;
};

type UserProfileUpdateResponse = SuccessResponse<User> | ErrorResponse;

export type {
  User,
  UserProfileUpdateRequest,
  UserProfileUpdateResponse,
  UserSucess,
};
