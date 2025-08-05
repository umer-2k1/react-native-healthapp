import {NavigationContainerRef, StackActions} from '@react-navigation/native';
import {useAuthStore} from '@src/store';
import {LogoutResponse} from '@types';
import {http} from './axios';
import {showError, showInfo} from './toast';

let navigationRef: NavigationContainerRef<ReactNavigation.RootParamList> | null =
  null;

const setNavigationRef = (
  ref: NavigationContainerRef<ReactNavigation.RootParamList>,
) => {
  navigationRef = ref;
};

const logoutHandler = async (message: string = 'You have been logged out.') => {
  try {
    await http.post<LogoutResponse>('/auth/logout', {});
    useAuthStore.getState().logout();
    showInfo(message);
    if (navigationRef) {
      // navigationRef.dispatch(StackActions.replace(AuthNavigation.SIGN_IN));
      navigationRef.dispatch(StackActions.replace('Auth'));
    }
  } catch (error: any) {
    showError('Logout failed:', error);
  }
};

export {logoutHandler, setNavigationRef};
