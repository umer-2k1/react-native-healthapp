import {
  Button,
  RNBottomSheet,
  RNBottomSheetRef,
  Typography,
} from '@components/common';
import {
  Dimensions,
  FlatList,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  format,
  getMonth,
  getYear,
  isBefore,
  parseISO,
  startOfMonth,
} from 'date-fns';
import {formatDateToUserTimeZone, getItem, STORAGE_ENUMS} from '@src/utils';
import React, {forwardRef, ForwardRefRenderFunction, useState} from 'react';
import {Calendar, CalendarProvider, DateData} from 'react-native-calendars';
import {Colors} from '@constants';
import {User} from '@src/types';

type YearItem = {
  id: string;
  value: number;
};

type MonthItem = {
  id: string;
  value: number;
  name: string;
  disabled: boolean;
};

interface CalendarBottomSheetProps {
  selectedDate: string;
  onConfirm: (date: string) => void;
  setSelectedDate: (date: string) => void;
}

const DatePickerBase: ForwardRefRenderFunction<
  RNBottomSheetRef,
  CalendarBottomSheetProps
> = ({selectedDate, onConfirm, setSelectedDate}, ref) => {
  const user = getItem<User>(STORAGE_ENUMS.USER);
  const minDateString = user?.data_sync_at
    ? formatDateToUserTimeZone(user.data_sync_at)
    : null;

  const minDate = minDateString ? new Date(minDateString) : new Date();
  const today = new Date();
  const currentMonth = format(today, 'yyyy-MM');
  const currentYear = getYear(today);
  const currentMonthNum = getMonth(today) + 1;
  const parsedDate = parseISO(selectedDate);
  const [calendarKey, setCalendarKey] = useState('calendar');
  const [visibleMonth, setVisibleMonth] = useState(currentMonth!);
  const [tempDate, setTempDate] = useState(selectedDate);
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedYear, setSelectedYear] = useState(getYear(parsedDate));
  const [selectedMonth, setSelectedMonth] = useState(getMonth(parsedDate) + 1);

  // Generate years (from current year to 40 years back)
  const generateYears = () => {
    const years = [];
    const startYear = currentYear - 40;
    for (let year = currentYear; year >= startYear; year--) {
      years.push({id: year.toString(), value: year});
    }
    return years;
  };

  // Generate months
  const generateMonths = () => {
    const months = [
      {id: '01', value: 1, name: 'January'},
      {id: '02', value: 2, name: 'February'},
      {id: '03', value: 3, name: 'March'},
      {id: '04', value: 4, name: 'April'},
      {id: '05', value: 5, name: 'May'},
      {id: '06', value: 6, name: 'June'},
      {id: '07', value: 7, name: 'July'},
      {id: '08', value: 8, name: 'August'},
      {id: '09', value: 9, name: 'September'},
      {id: '10', value: 10, name: 'October'},
      {id: '11', value: 11, name: 'November'},
      {id: '12', value: 12, name: 'December'},
    ];

    return months.map(month => ({
      ...month,
      disabled: selectedYear === currentYear && month.value > currentMonthNum,
    }));
  };

  const years = generateYears();
  const months = generateMonths();

  const handleConfirm = () => {
    setSelectedDate(tempDate);
    onConfirm(tempDate);
  };

  const handleYearSelect = (year: number) => {
    let newSelectedMonth = selectedMonth;

    if (year === currentYear && selectedMonth > currentMonthNum) {
      newSelectedMonth = currentMonthNum; // Set to the current month
    }

    // Format month and day properly
    const formattedMonth =
      newSelectedMonth < 10 ? `0${newSelectedMonth}` : `${newSelectedMonth}`;
    const currentDay = tempDate.slice(8); // Extract day

    const newDate = `${year}-${formattedMonth}-${currentDay}`;

    setTempDate(newDate);
    setSelectedYear(year);
    setSelectedMonth(newSelectedMonth);
    setShowYearPicker(false);
    setVisibleMonth(`${year}-${formattedMonth}`);
  };

  const handleMonthSelect = (month: number) => {
    // Format the month with leading zero if needed
    const formattedMonth = month < 10 ? `0${month}` : `${month}`;
    // Get the current day
    const currentDay = tempDate.slice(8);
    // Create a new date with the selected month, keeping the year and day
    const newDate = `${selectedYear}-${formattedMonth}-${currentDay}`;

    setTempDate(newDate);
    setSelectedMonth(month);
    setShowMonthPicker(false);

    // Update visible month with the new month
    const newVisibleMonth = `${selectedYear}-${formattedMonth}`;
    setVisibleMonth(newVisibleMonth);
    setCurrentDate(newDate);
    setCalendarKey('calendar-' + Date.now());
  };

  const handleToday = () => {
    const localToday = format(new Date(), 'yyyy-MM-dd');
    setTempDate(localToday);
    setSelectedYear(parseInt(localToday.slice(0, 4), 10));
    setSelectedMonth(parseInt(localToday.slice(5, 7), 10));
    setVisibleMonth(localToday.slice(0, 7));
    setCurrentDate(localToday);
    setCalendarKey('calendar-' + Date.now());
  };

  const renderYearItem = ({item}: {item: YearItem}) => {
    const isDisabled = item.value < minDate.getFullYear();

    return (
      <TouchableOpacity
        style={[
          styles.yearItem,
          isDisabled && styles.disabledItem,
          selectedYear === item.value && !isDisabled && styles.selectedYearItem,
        ]}
        activeOpacity={isDisabled ? 1 : 0.5}
        onPress={() => {
          if (!isDisabled) {
            handleYearSelect(item.value);
          } // Prevent action
        }}>
        <Text
          style={[
            styles.yearText,
            isDisabled && styles.disabledText, // Apply text styling
            selectedYear === item.value &&
              !isDisabled &&
              styles.selectedYearText,
          ]}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  const renderMonthItem = ({item}: {item: MonthItem}) => {
    const minYear = minDate.getFullYear();
    const minMonth = minDate.getMonth() + 1;
    const isDisabled =
      (selectedYear === minYear && item.value < minMonth) ||
      (selectedYear === currentYear && item.value > currentMonthNum);

    return (
      <TouchableOpacity
        activeOpacity={isDisabled ? 1 : 0.5} // Prevent click effect
        onPress={() => {
          if (!isDisabled) {
            handleMonthSelect(item.value);
          } // Prevent selection
        }}
        style={[
          styles.monthItem,
          isDisabled && styles.disabledItem, // Apply disabled styling
          selectedMonth === item.value &&
            !isDisabled &&
            styles.selectedMonthItem,
        ]}>
        <Text
          style={[
            styles.monthItemText,
            isDisabled && styles.disabledText, // Apply text styling
            selectedMonth === item.value &&
              !isDisabled &&
              styles.selectedMonthText,
          ]}>
          {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <RNBottomSheet ref={ref} snapPoints={['70%']} backdropOpacity={0.5}>
        <CalendarProvider
          date={selectedDate}
          onDateChanged={date => setSelectedDate(date)}>
          <Calendar
            minDate={minDate.toDateString()}
            key={calendarKey}
            initialDate={tempDate}
            current={currentDate}
            onDayPress={(day: DateData) => {
              setTempDate(day.dateString);
            }}
            disableArrowLeft={isBefore(parseISO(visibleMonth + '-01'), minDate)}
            disableArrowRight={
              !isBefore(
                parseISO(visibleMonth + '-01'),
                startOfMonth(new Date()),
              )
            }
            maxDate={new Date().toISOString()}
            onMonthChange={(month: DateData) => {
              setVisibleMonth(month.dateString.slice(0, 7));
              setSelectedYear(parseInt(month.dateString.slice(0, 4), 10));
              setSelectedMonth(parseInt(month.dateString.slice(5, 7), 10));
            }}
            renderHeader={(date: any) => (
              <View style={styles.headerContainer}>
                {/* Month Picker */}
                <TouchableOpacity
                  onPress={() => setShowMonthPicker(true)}
                  style={styles.pickerTouchable}>
                  <Typography
                    fontFamily="poppinsMedium"
                    fontSize={18}
                    style={styles.pickerButton}>
                    {date.toString('MMMM')}
                  </Typography>
                  <View style={styles.dropdownIndicator}>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </View>
                </TouchableOpacity>

                {/* Year Picker */}
                <TouchableOpacity
                  onPress={() => setShowYearPicker(true)}
                  style={styles.pickerTouchable}>
                  <Typography
                    fontFamily="poppinsMedium"
                    fontSize={18}
                    style={styles.pickerButton}>
                    {selectedYear}
                  </Typography>
                  <View style={styles.dropdownIndicator}>
                    <Text style={styles.dropdownArrow}>▼</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )}
            markedDates={{
              [tempDate]: {
                selected: true,
                customStyles: {
                  container: {
                    backgroundColor: Colors.primary.main,
                    borderRadius: 10,
                    elevation: 5,
                  },
                  text: {
                    color: Colors.neutral.white,
                  },
                },
              },
            }}
            markingType={'custom'}
            theme={{
              indicatorColor: 'red',
              todayTextColor: Colors.primary.main,
              arrowColor: '#000',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 14,
              textDayFontFamily: 'Poppins-Medium',
              textMonthFontFamily: 'Poppins-Medium',
              textDayHeaderFontFamily: 'Poppins-Medium',
            }}
          />
          <Button
            variant="ghost"
            onPress={handleToday}
            style={{marginLeft: 'auto'}}>
            Today
          </Button>
        </CalendarProvider>
        <View style={styles.confirmBtn}>
          <Button
            variant="primary"
            size="medium"
            onPress={handleConfirm}
            fullWidth
            textStyle={{color: Colors.text.white}}>
            Confirm Date
          </Button>
        </View>

        {/* Year Picker Modal */}
        <Modal
          visible={showYearPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowYearPicker(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowYearPicker(false)}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Year</Text>
              <FlatList
                data={years}
                renderItem={renderYearItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={years.findIndex(
                  year => year.value === selectedYear,
                )}
                getItemLayout={(_, index) => ({
                  length: 50,
                  offset: 50 * index,
                  index,
                })}
              />
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Month Picker Modal */}
        <Modal
          visible={showMonthPicker}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setShowMonthPicker(false)}>
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={() => setShowMonthPicker(false)}>
            <View style={styles.pickerContainer}>
              <Text style={styles.pickerTitle}>Select Month</Text>
              <FlatList
                data={months}
                renderItem={renderMonthItem}
                keyExtractor={item => item.id}
                showsVerticalScrollIndicator={false}
                initialScrollIndex={months.findIndex(
                  month => month.value === selectedMonth,
                )}
                getItemLayout={(_, index) => ({
                  length: 50,
                  offset: 50 * index,
                  index,
                })}
                scrollEnabled={true} // Ensure scroll is enabled
                keyboardShouldPersistTaps="handled"
              />
            </View>
          </TouchableOpacity>
        </Modal>
      </RNBottomSheet>
    </>
  );
};

const styles = StyleSheet.create({
  confirmBtn: {
    padding: 16,
    position: 'absolute',
    bottom: 16,
    left: 0,
    right: 0,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    gap: 10,
  },
  pickerTouchable: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.neutral.grey100,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.neutral.grey200,
  },
  pickerButton: {
    color: Colors.text.primary,
    marginRight: 4,
  },
  dropdownIndicator: {
    marginLeft: 2,
  },
  dropdownArrow: {
    fontSize: 12,
    color: Colors.primary.main,
  },
  todayButton: {
    backgroundColor: Colors.primary.light,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    position: 'absolute',
    bottom: -32,
  },
  todayText: {
    fontSize: 16,
    color: Colors.primary.main,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pickerContainer: {
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    padding: 16,
    width: Dimensions.get('window').width * 0.7,
    maxHeight: Dimensions.get('window').height * 0.5,
  },
  pickerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 12,
    textAlign: 'center',
  },
  yearItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.grey200,
  },
  selectedYearItem: {
    backgroundColor: Colors.neutral.grey100,
  },
  yearText: {
    fontSize: 18,
    color: Colors.text.primary,
  },
  selectedYearText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  monthItem: {
    paddingVertical: 12,
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.neutral.grey200,
  },
  selectedMonthItem: {
    backgroundColor: Colors.neutral.grey100,
  },
  monthItemText: {
    fontSize: 18,
    color: Colors.text.primary,
  },
  selectedMonthText: {
    color: Colors.primary.main,
    fontWeight: '600',
  },
  disabledItem: {
    opacity: 0.5,
  },
  disabledText: {
    color: 'gray',
  },
});

const CalendarBottomSheet = forwardRef(DatePickerBase);
export {CalendarBottomSheet};
