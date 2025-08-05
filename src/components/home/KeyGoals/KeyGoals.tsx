import {HStack, Typography} from '@components/common';
import {Colors, KEY_GOALS_LIST, KeyGoalsProps} from '@constants';
import {Icon} from '@icons';
import React, {useState} from 'react';
import {Dimensions, FlatList, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {KeyGoalsCard} from './KeyGoalsCard';
import {styles} from './styles';

const KeyGoals = () => {
  const [hydration, setHydration] = useState(3);
  const screenWidth = Dimensions.get('window').width;
  const cardWidth = screenWidth * 0.45;
  return (
    <>
      <HStack justify="space-between" px={12}>
        <Typography variant="h4" fontFamily="montserratSemiBold">
          Key Goals
        </Typography>
        <TouchableOpacity>
          <Typography
            variant="h5"
            fontFamily="montserratSemiBold"
            color={Colors.text.main}>
            View all
          </Typography>
        </TouchableOpacity>
      </HStack>

      <View style={styles.container}>
        <FlatList
          data={KEY_GOALS_LIST}
          horizontal
          keyExtractor={(_, index) => index.toString()}
          renderItem={({item}: {item: KeyGoalsProps}) => (
            <View style={{width: cardWidth, marginHorizontal: 5}}>
              <KeyGoalsCard
                title={item.title}
                desc={item.desc}
                icon={
                  <Icon
                    name={item.icon}
                    size={24}
                    color={Colors.primary.main}
                  />
                }
                progress={item.score || 0}
                hasQty={item.hasQty}
                quantity={hydration}
                onQuantityChange={qty => {
                  if (qty >= 0) {
                    setHydration(qty);
                  }
                }}
              />
            </View>
          )}
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </>
  );
};

export {KeyGoals};
