import type {ErrorResponse, SuccessResponse} from './global';

type Score = {
  name: string;
  cumulative_score: number;
  cumulative_score_percentage: number;
};

// ** Payload
type GetLongevityScoreRequest = {
  date: string;
  tz_offset: string;
};
type PostHealthDataRequest = {
  data: {
    longevity_keys: any[];
  };
  user_timezone: number;
};

type GetLongevityScoreSuccess = {
  daily_score: number;
  level: number;
  scores: Score[] | [];
};

type GetLongevityScoreResponse =
  | SuccessResponse<GetLongevityScoreSuccess>
  | ErrorResponse;

type PostHealthDataResponse = SuccessResponse<any> | ErrorResponse;

export type {
  GetLongevityScoreResponse,
  GetLongevityScoreRequest,
  Score,
  PostHealthDataRequest,
  PostHealthDataResponse,
};
