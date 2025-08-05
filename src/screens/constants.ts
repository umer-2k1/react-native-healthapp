enum Stacks {
  AUTH = 'Auth',
  ONBOARDING = 'Onboarding',
  APP = 'App',
}

enum AppNavigation {
  HOME = 'Home',
  AI_COACH = 'AiCoach',
  GOALS = 'Goals',
  HEALTH_METRICS = 'HealthMetrics',
  CONNECTIVITY = 'Connectivity',
  DAILY_ACTIONS = 'DailyActions',
  LONGEVITY = 'Longevity',
  LONGEVITY_KEYS_LIST = 'LongevityKeysList',
  NOTIFICATIONS = 'Notifications',
  AQI = 'Aqi',
  PROFILE = 'Profile',
  APP_HOME = 'AppHome',
  SLEEP_ANALYTICS = 'SleepAnalytics',
}

enum AuthNavigation {
  SIGN_IN = 'SignIn',
}
enum OnboardingNavigation {
  PRIVACY = 'Privacy',
  BEGIN_APPLE_HEALTH = 'BeginAppleHealth',
  HEALTH_ACCESS = 'HealthAccess',
  NO_DATA_DETECTED = 'NoDataDetected',
  EDIT_DETAILS = 'EditDetails',
  SYNC_APPLE_HEALTH_DATA = 'SyncAppleHealthData',
}

enum Tabs {
  BOTTOM_TABS = 'BottomTabs',
}

export {AppNavigation, AuthNavigation, OnboardingNavigation, Tabs, Stacks};
