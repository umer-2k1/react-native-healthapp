import {StyleSheet} from 'react-native';
import {Colors} from './colors';

const globalStyles = StyleSheet.create({
  // FLEX DIRECTION & ALIGNMENT
  flexRow: {
    flexDirection: 'row',
  },
  flexRowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flexRowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  flexRowEvenly: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
  },
  flexRowAround: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  flexColumn: {
    flexDirection: 'column',
  },
  flexColumnCenter: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  flexColumnBetween: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  // ALIGNMENT & JUSTIFY
  alignCenter: {
    alignItems: 'center',
  },
  alignStart: {
    alignItems: 'flex-start',
  },
  alignEnd: {
    alignItems: 'flex-end',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyStart: {
    justifyContent: 'flex-start',
  },
  justifyEnd: {
    justifyContent: 'flex-end',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  justifyAround: {
    justifyContent: 'space-around',
  },
  justifyEvenly: {
    justifyContent: 'space-evenly',
  },

  alignSelfCenter: {
    alignSelf: 'center',
  },
  alignSelfStart: {
    alignSelf: 'flex-start',
  },
  alignSelfEnd: {
    alignSelf: 'flex-end',
  },

  // FULL-SCREEN LAYOUT HELPERS
  fullSize: {
    width: '100%',
    height: '100%',
  },
  fullWidth: {
    width: '100%',
  },
  fullHeight: {
    height: '100%',
  },

  flexJustifyCenter: {
    flex: 1,
    justifyContent: 'center',
  },
  flexAlignCenter: {
    flex: 1,
    alignItems: 'center',
  },

  // fonts family
  montserratRegular: {
    fontFamily: 'Montserrat-Regular',
  },
  montserratMedium: {
    fontFamily: 'Montserrat-Medium',
  },
  montserratSemiBold: {
    fontFamily: 'Montserrat-SemiBold',
  },
  montserratBold: {
    fontFamily: 'Montserrat-Bold',
  },
  poppinsRegular: {
    fontFamily: 'Poppins-Regular',
  },
  poppinsMedium: {
    fontFamily: 'Poppins-Medium',
  },
  poppinsSemiBold: {
    fontFamily: 'Poppins-SemiBold',
  },
  poppinsBold: {
    fontFamily: 'Poppins-Bold',
  },

  // padding
  hPadding16: {
    paddingHorizontal: 16,
  },
  hPadding12: {
    paddingHorizontal: 12,
  },
  vPadding16: {
    paddingVertical: 16,
  },
  paddingLeft16: {
    paddingLeft: 16,
  },
  paddingRight16: {
    paddingRight: 16,
  },
  paddingTop16: {
    paddingTop: 16,
  },
  paddingBottom16: {
    paddingBottom: 16,
  },

  // Card
  card: {
    padding: 12,
    backgroundColor: Colors.neutral.white,
    borderRadius: 12,
    borderWidth: 2,
    // borderColor: '#BFBFBF33',
    borderColor: '#eaeaea',
    // shadowColor: '#000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    elevation: 5,
  },
});

export {globalStyles};
