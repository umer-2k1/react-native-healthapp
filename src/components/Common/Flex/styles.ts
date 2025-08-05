import {StyleSheet} from 'react-native';
import {FlexProps} from './Flex';

type StyleProps = Omit<FlexProps, 'children' | 'style'>;

const createFlexStyles = (props: StyleProps) =>
  StyleSheet.create({
    container: {
      flexDirection: props.direction,
      alignItems: props.align,
      justifyContent: props.justify,
      flexWrap: props.wrap,
      flex: props.flex,
      padding: props.padding,
      margin: props.margin,
      height: props.height,
      backgroundColor: props.backgroundColor,
    },
  });

export {createFlexStyles};
