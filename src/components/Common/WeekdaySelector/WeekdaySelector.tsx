import {addDays, format, isSameDay, subDays} from 'date-fns';
import React, {useEffect, useRef} from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {containerStyle, createWeeklyySelectorStyle} from './styles';

interface WeekdaySelectorProps {
  selectedDate: Date;
  onPress: (date: Date) => void;
}

interface RenderItemProps {
  item: {
    date: Date;
    isDisabled: boolean;
  };
}

const getWeekDays = () => {
  const today = new Date();
  const days = [];

  // Last 6 days
  for (let i = 12; i > 0; i--) {
    days.push({
      date: subDays(today, i),
      isToday: false,
      isDisabled: false, // Past dates are enabled
    });
  }

  // Today
  days.push({
    date: today,
    isToday: true,
    isDisabled: false, // Today is enabled
  });

  // Tomorrow (Disabled)
  days.push({
    date: addDays(today, 1),
    isToday: false,
    isDisabled: true, // Tomorrow is disabled
  });

  return days;
};

const WeekdaySelector = ({selectedDate, onPress}: WeekdaySelectorProps) => {
  const weekdays = getWeekDays();

  const flatListRef = useRef<FlatList>(null);

  // Find the index of selected date
  const selectedIndex = weekdays.findIndex(({date}) =>
    isSameDay(date, selectedDate),
  );

  useEffect(() => {
    if (flatListRef.current && selectedIndex !== -1) {
      flatListRef.current.scrollToIndex({
        index: selectedIndex,
        animated: true,
        viewPosition: 0.5,
      });
    }
  }, []);

  const renderItem = ({item}: RenderItemProps) => {
    const {date, isDisabled} = item;
    const formattedDate = format(date, 'd');
    const formattedDay = format(date, 'E'); // Short day name
    const isSelected = isSameDay(selectedDate, date);
    const styles = createWeeklyySelectorStyle(isSelected);

    return (
      <TouchableOpacity
        key={formattedDate}
        style={[styles.item, isSelected && styles.selectedItem]}
        onPress={() => !isDisabled && onPress(date)}
        disabled={isDisabled}>
        <View
          style={[
            styles.circle,
            isSelected && styles.selectedCircle,
            isDisabled && styles.disabledCircle,
          ]}>
          <Text
            style={[
              styles.dayNumber,
              isSelected && styles.selectedText,
              isDisabled && styles.disabledText,
            ]}>
            {formattedDate}
          </Text>
        </View>
        {/* indicator */}
        <View style={styles.indicator}>
          <View style={styles.innerIndicatorCircle} />
        </View>

        <Text
          style={[
            styles.dayLabel,
            isSelected && styles.boldText,
            isDisabled && styles.disabledText,
          ]}>
          {formattedDay}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={containerStyle.container}>
      <FlatList
        ref={flatListRef}
        data={weekdays}
        renderItem={renderItem}
        keyExtractor={item => item.date.toString()}
        horizontal
        contentContainerStyle={containerStyle.container}
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={selectedIndex !== -1 ? selectedIndex : 0} // Set initial index
        getItemLayout={(_, index) => ({
          length: 56, // Approximate item width (adjust if necessary)
          offset: 56 * index,
          index,
        })}
        onLayout={() => {
          if (flatListRef.current && selectedIndex !== -1) {
            flatListRef.current.scrollToIndex({
              index: selectedIndex,
              animated: false,
              viewPosition: 0.5,
            });
          }
        }}
      />
    </View>
  );
};

export {WeekdaySelector};
