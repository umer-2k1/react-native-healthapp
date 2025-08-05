import {
  AuthView,
  BackButton,
  BackgroundWrapper,
  Button,
  Typography,
} from '@components/common';
import {Colors, globalStyles} from '@constants';
import {Icon} from '@icons';
import {logoutHandler} from '@utils';
import React from 'react';
import {View} from 'react-native';
import {styles} from './styles';

const Profile = () => {
  return (
    <BackgroundWrapper>
      <AuthView style={styles.container}>
        {/* Content */}

        <View style={[styles.content, globalStyles.flexRow]}>
          <BackButton />
          <View style={globalStyles.flexAlignCenter}>
            <Typography variant="h5" fontFamily="montserratMedium">
              User Profile
            </Typography>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            variant="primary"
            size="medium"
            rounded="xl"
            onPress={() => logoutHandler()}
            fullWidth
            textStyle={{color: Colors.text.white}}
            leftIcon={
              <Icon name="logout" size={26} color={Colors.icon.white} />
            }>
            Logout
          </Button>
        </View>
      </AuthView>
    </BackgroundWrapper>
  );
};

export {Profile};
