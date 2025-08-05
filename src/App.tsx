import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {useEffect} from 'react';
import {StatusBar, View} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import Toast from 'react-native-toast-message';
import {Colors} from './constants';
import {RootNavigation} from './navigation';
import {useAuthStore} from './store/useAuthStore';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const backgroundStyle = {
    backgroundColor: Colors.background.primary,
    flex: 1,
  };
  const {initializeNavigation} = useAuthStore();

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hide();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    initializeNavigation();
  }, []);

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <QueryClientProvider client={queryClient}>
          <StatusBar
            barStyle={'dark-content'}
            backgroundColor={backgroundStyle.backgroundColor}
          />
          <View
            style={{
              height: '100%',
            }}>
            <RootNavigation />
            <Toast />
          </View>
        </QueryClientProvider>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
}

export default App;
