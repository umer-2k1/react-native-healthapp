import {HStack, Typography} from '@components/common';
import {Colors, DAILY_ACTOIN_LIST, globalStyles} from '@constants';
import {Icon} from '@icons';
import React from 'react';
import {FlatList, TouchableOpacity, View} from 'react-native';
import {BiomarkerIconAction} from './BiomarkerIconAction';
import {styles} from './styles';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {useNavigation} from '@react-navigation/native';
import {AppStackParamList} from '@types';
import {AppNavigation} from '@screens/constants';

const DailyActions = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<AppStackParamList>>();
  const viewAllHandler = () => {
    navigation.navigate(AppNavigation.DAILY_ACTIONS);
  };
  return (
    <>
      <HStack justify="space-between" px={12}>
        <Typography variant="h4" fontFamily="montserratSemiBold">
          Daily Actions
        </Typography>
        <TouchableOpacity onPress={viewAllHandler}>
          <Typography
            variant="h5"
            fontFamily="montserratSemiBold"
            color={Colors.text.main}>
            View all
          </Typography>
        </TouchableOpacity>
      </HStack>

      {/* Card */}
      <View style={[globalStyles.card, styles.card]}>
        <FlatList
          data={DAILY_ACTOIN_LIST}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({item}) => (
            <BiomarkerIconAction
              label={item.title}
              icon={
                <Icon name={item.icon} size={32} color={Colors.primary.main} />
              }
            />
          )}
        />
      </View>
    </>
  );
};

export {DailyActions};
