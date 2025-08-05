const NONE = 'None';
const SKELETON_SPEED = 1100;

const MODAL_TYPES = {
  // Confirmation Modals
  CONFIRM_DELETE: 'CONFIRM_DELETE',
  CONFIRM_LOGOUT: 'CONFIRM_LOGOUT',
  CONFIRM_SAVE_CHANGES: 'CONFIRM_SAVE_CHANGES',

  // Authentication Modals
  LOGIN: 'LOGIN',
  REGISTER: 'REGISTER',
  RESET_PASSWORD: 'RESET_PASSWORD',
} as const;

const STORAGE_ENUMS = {
  REFRESH_TOKEN: 'refresh_token',
  ACCESS_TOKEN: 'access_token',
  IS_ONBOARDED: 'is_onboarded',
  USER: 'user',
  ALLOWED_HEALTH_KIT: 'allowed_health_kit',
  ONBOARDING_LAST_STEP: 'onboarding_last_step',
  ONBOARDING_FIRST_STEP: 'onboarding_first_step',
  LAST_SYNC: 'last_sync',
} as const;

const CONNECTIVITY_TIPS = {
  title: 'Get consistent heart rate data',
  desc: 'Wear your Apple Watch snugly for accurate readings. Measure at rest and stay consistent.',
} as const;

export {MODAL_TYPES, STORAGE_ENUMS, NONE, CONNECTIVITY_TIPS, SKELETON_SPEED};
