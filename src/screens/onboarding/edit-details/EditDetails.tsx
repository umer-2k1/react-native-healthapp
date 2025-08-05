import {
  AppLogo,
  AuthView,
  BackButton,
  BackgroundWrapper,
  Button,
  KeyboardSafeView,
  TextInputField,
  Typography,
  VStack,
} from '@components/common';
import {ProgressBar} from '@components/onboarding';
import {Colors} from '@constants';
import {zodResolver} from '@hookform/resolvers/zod';
import {Icon} from '@icons';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {OnboardingNavigation} from '@screens/constants';
import {useProfileUpdate} from '@services';
import {useOnboardingStore} from '@store/useOnboardingStore';
import {useAuthStore} from '@store/useAuthStore';
import {OnboardingStackParamList, RootStackParamList} from '@types';
import {
  getHealthKitDateOfBirth,
  getHealthKitGender,
  STORAGE_ENUMS,
  getItem,
  getUser,
  setItem,
} from '@utils';
import {UserProfileSchema} from '@validations';
import {format} from 'date-fns';
import React, {useEffect, useState} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import RNPickerSelect from 'react-native-picker-select';
import * as z from 'zod';
import {selectInputStyles, styles} from './styles';

type UserProfile = z.infer<typeof UserProfileSchema>;

const EditDetails = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const OnboardNavigation =
    useNavigation<NativeStackNavigationProp<OnboardingStackParamList>>();
  const [date, setDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const {setCurrentStep, prevStep} = useOnboardingStore();
  const {mutateAsync, isPending} = useProfileUpdate();
  const {setOnboardingComplete} = useAuthStore();
  const user = getUser();

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm<UserProfile>({
    resolver: zodResolver(UserProfileSchema),
    defaultValues: {
      full_name: user?.full_name || '',
      email: user?.email || '',
      dob: user?.dob || '',
      gender: user?.gender || '',
    },
  });

  const onContinue = async (data: UserProfile) => {
    const isHealthKitAllowed = getItem<boolean>(
      STORAGE_ENUMS.ALLOWED_HEALTH_KIT,
    );
    const res = await mutateAsync({
      dob: data.dob,
      full_name: data.full_name,
      gender: data.gender,
      onboarding_completed: true,
      health_kit_enabled: isHealthKitAllowed || false,
    });

    if (res) {
      setItem(STORAGE_ENUMS.IS_ONBOARDED, true);
      setItem(STORAGE_ENUMS.USER, res.data);
      if (isHealthKitAllowed) {
        OnboardNavigation.navigate(OnboardingNavigation.SYNC_APPLE_HEALTH_DATA);
        return;
      } else {
        setOnboardingComplete(true);
        navigation.reset({
          index: 1,
          routes: [{name: 'App'}],
        });
      }
    }
  };

  const onBack = () => {
    prevStep();
    if (navigation.canGoBack()) {
      navigation.goBack();
    } else {
      navigation.reset({
        index: 1,
        routes: [
          {
            name: 'Onboarding',
            params: {screen: OnboardingNavigation.HEALTH_ACCESS},
          },
        ],
      });
    }
  };

  const fetchDateOfBirth = async () => {
    const dob = await getHealthKitDateOfBirth();
    if (dob && dob.value) {
      const formattedDOB = format(new Date(dob.value), 'yyyy-MM-dd');
      setDate(new Date(dob.value));
      setValue('dob', formattedDOB);
    }
  };

  const fetchGender = async () => {
    const gender = await getHealthKitGender();
    if (gender !== 'unknown') {
      setValue('gender', gender);
    }
  };

  useEffect(() => {
    fetchDateOfBirth();
    fetchGender();
    setCurrentStep(3);
  }, []);

  return (
    <BackgroundWrapper>
      <KeyboardSafeView style={styles.container}>
        <AuthView>
          <View style={styles.topView}>
            <BackButton onPress={onBack} />
            <ProgressBar />
            <View />
          </View>
          <View style={styles.mainContent}>
            <AppLogo size={70} />
            <VStack spacing={5}>
              <Typography
                variant="h3"
                fontFamily="montserratSemiBold"
                align="left">
                Verify Your Details
              </Typography>
              <Typography variant="body1">
                We've retrieved your information from Apple. Please update your
                details below.
              </Typography>
            </VStack>
            <View style={styles.inputContainer}>
              <Controller
                control={control}
                name="full_name"
                render={({field: {onChange, value}}) => (
                  <TextInputField
                    label="Name"
                    placeholder="e.g John Doe"
                    leftIcon={
                      <Icon name="user" color={Colors.icon.primary} size={22} />
                    }
                    labelStyle={{color: Colors.text.secondary}}
                    value={value}
                    onChangeText={onChange}
                    error={errors.full_name?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                render={({field: {onChange, value}}) => (
                  <TextInputField
                    label="Email"
                    placeholder="e.g johndoe@gmail.com"
                    leftIcon={
                      <Icon
                        name="email"
                        color={Colors.icon.primary}
                        size={22}
                      />
                    }
                    editable={false}
                    labelStyle={{color: Colors.text.secondary}}
                    value={value}
                    onTextInput={onChange}
                    error={errors.email?.message}
                  />
                )}
              />

              <Controller
                control={control}
                name="dob"
                render={({field: {value}}) => (
                  <TextInputField
                    value={value}
                    label="Date of Birth"
                    placeholder="e.g 14-09-2001"
                    leftIcon={
                      <Icon name="date" color={Colors.icon.primary} size={24} />
                    }
                    editable={false}
                    onPress={() => setOpen(true)}
                    labelStyle={{color: Colors.text.secondary}}
                    error={errors.dob?.message}
                    showDisableColor={false}
                  />
                )}
              />

              <Controller
                control={control}
                name="gender"
                rules={{required: 'Gender is required'}}
                render={({field: {onChange, value}}) => (
                  <>
                    <Typography
                      variant="body2"
                      style={[selectInputStyles.label]}>
                      Gender
                    </Typography>
                    <RNPickerSelect
                      onValueChange={onChange}
                      items={[
                        {label: 'Male', value: 'male'},
                        {label: 'Female', value: 'female'},
                        {label: 'Other', value: 'other'},
                      ]}
                      value={value}
                      placeholder={{label: 'Select Gender', value: null}}
                      style={{
                        inputIOSContainer: selectInputStyles.inputIOSContainer,
                        inputIOS: selectInputStyles.inputIOS,
                        iconContainer: {
                          left: 10,
                        },
                      }}
                      useNativeAndroidPickerStyle={false} // Disable native Android styles for better control
                      Icon={() => (
                        <>
                          <Icon
                            name="user"
                            size={22}
                            color={Colors.icon.primary}
                          />
                          <Icon
                            name="chevron-down"
                            size={20}
                            color="gray"
                            style={{
                              position: 'absolute',
                              right: 10,
                              top: '50%',
                              marginTop: -10,
                            }}
                          />
                        </>
                      )}
                    />

                    <Typography
                      variant="caption"
                      style={[selectInputStyles.error]}>
                      {errors.gender?.message}
                    </Typography>
                  </>
                )}
              />
            </View>
          </View>

          <View style={styles.buttonWrapper}>
            <Button
              variant="primary"
              rounded="xl"
              size="medium"
              onPress={handleSubmit(onContinue)}
              loading={isPending}
              fullWidth>
              Continue
            </Button>
          </View>
        </AuthView>
      </KeyboardSafeView>

      <DatePicker
        modal
        open={open}
        date={date || new Date()}
        mode={'date'}
        maximumDate={new Date()}
        onConfirm={selectedDate => {
          setOpen(false);
          setDate(selectedDate);
          setValue('dob', format(selectedDate, 'yyyy-MM-dd'));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </BackgroundWrapper>
  );
};

export {EditDetails};
