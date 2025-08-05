import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  Platform,
  ActivityIndicator,
} from 'react-native';
import AppleHealthKit from 'react-native-health';
import {SafeAreaView} from 'react-native-safe-area-context';
import Female from '@assets/user.png';

// Constants for colors
const COLORS = {
  white: '#FFFFFF',
  gold: '#D4AF37',
  lightGold: '#F5F1E3',
  textDark: '#333333',
  success: '#4CAF50',
};

// Health permissions to request
const healthKitPermissions = {
  permissions: {
    read: [
      AppleHealthKit.Constants.Permissions.Steps,
      AppleHealthKit.Constants.Permissions.ActiveEnergyBurned,
      AppleHealthKit.Constants.Permissions.HeartRate,
      AppleHealthKit.Constants.Permissions.SleepAnalysis,
    ],
    write: [],
  },
};

const AppleHealthConnect = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Skip if not on iOS
    if (Platform.OS !== 'ios') {
      setIsLoading(false);
      return;
    }

    checkHealthKitConnection();
  }, []);

  const checkHealthKitConnection = () => {
    // First check if HealthKit is available
    AppleHealthKit.isAvailable((error, available) => {
      if (error) {
        console.log('Error checking HealthKit availability:', error);
        setIsLoading(false);
        return;
      }

      if (!available) {
        console.log('HealthKit is not available on this device');
        setIsLoading(false);
        return;
      }

      // Try to make a simple query to check if we have permissions
      const options = {
        date: new Date().toISOString(),
      };

      AppleHealthKit.getStepCount(options, (queryError, results) => {
        // If no error, we have permissions
        setIsConnected(!queryError);
        setIsLoading(false);
      });
    });
  };

  const handleConnect = () => {
    setIsLoading(true);

    // Initialize HealthKit with permissions
    AppleHealthKit.initHealthKit(healthKitPermissions, error => {
      if (error) {
        console.log('Error initializing HealthKit:', error);

        // Show alert to direct to settings
        Alert.alert(
          'Health Permissions Required',
          'Please enable Health permissions in Settings to use this feature.',
          [
            {
              text: 'Cancel',
              style: 'cancel',
              onPress: () => setIsLoading(false),
            },
            {
              text: 'Open Health App',
              onPress: () => {
                Linking.openURL('x-apple-health://');
                setIsLoading(false);
              },
            },
          ],
        );
        return;
      }

      // Test if we can actually read data
      const options = {
        date: new Date().toISOString(),
      };

      AppleHealthKit.getStepCount(options, (queryError, results) => {
        if (queryError) {
          console.log('Error querying health data:', queryError);
          setIsConnected(false);

          // If we initialize successfully but can't query, redirect to settings
          Alert.alert(
            'Health Access Required',
            'Please make sure your Health app permissions are enabled for this app.',
            [
              {text: 'Cancel', style: 'cancel'},
              {
                text: 'Open Settings',
                onPress: () => Linking.openURL('app-settings:'),
              },
            ],
          );
        } else {
          // Successfully connected
          setIsConnected(true);
          Alert.alert('Success', 'Connected to Apple Health successfully!');
        }

        setIsLoading(false);
      });
    });
  };

  // If not on iOS, show incompatible message
  if (Platform.OS !== 'ios') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.title}>Apple Health</Text>
          <Text style={styles.message}>
            Apple Health is only available on iOS devices.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image
          //   source={require('../assets/apple-health-icon.png')}
          source={Female}
          style={styles.icon}
          // Fallback if image fails to load
          onError={e =>
            console.log('Image loading error:', e.nativeEvent.error)
          }
        />

        <Text style={styles.title}>Apple Health</Text>

        <>
          <View style={styles.statusContainer}>
            <View
              style={[
                styles.statusIndicator,
                {backgroundColor: isConnected ? COLORS.success : COLORS.gold},
              ]}
            />
            <Text style={styles.statusText}>
              {isConnected ? 'Connected' : 'Not Connected'}
            </Text>
          </View>

          <Text style={styles.description}>
            {true
              ? 'Your health data is syncing successfully'
              : 'Connect to Apple Health to track your fitness data'}
          </Text>

          <TouchableOpacity
            style={styles.connectButton}
            onPress={handleConnect}
            activeOpacity={0.8}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.manageLinkButton}
            onPress={() => Linking.openURL('x-apple-health://')}>
            <Text style={styles.manageLinkText}>Manage in Health App</Text>
          </TouchableOpacity>
        </>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 24,
    // Fallback icon styling if image is not found
    backgroundColor: COLORS.lightGold,
    borderRadius: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 16,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '500',
    color: COLORS.textDark,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.textDark,
    opacity: 0.8,
    marginBottom: 32,
  },
  connectButton: {
    backgroundColor: COLORS.gold,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  connectButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '600',
  },
  manageLinkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  manageLinkText: {
    color: COLORS.gold,
    fontSize: 16,
    fontWeight: '500',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.textDark,
    opacity: 0.8,
  },
});

export default AppleHealthConnect;
