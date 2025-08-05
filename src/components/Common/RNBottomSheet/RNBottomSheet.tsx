import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import {Icon} from '@icons';
import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';

interface RNBottomSheetProps {
  snapPoints?: (string | number)[];
  children: React.ReactNode;
  backdropOpacity?: number;
  onChange?: (index: number) => void;
  onOpen?: () => void;
  onClose?: () => void;
  enableCloseButton?: boolean;
}

interface RNBottomSheetRef {
  open: () => void;
  close: () => void;
}

const RNBottomSheet = forwardRef<RNBottomSheetRef, RNBottomSheetProps>(
  (
    {
      snapPoints = ['40%', '80%'],
      children,
      backdropOpacity = 0.7,
      onChange,
      onOpen,
      onClose,
      enableCloseButton = false,
    },
    ref,
  ) => {
    const [_, setIsOpen] = useState(false);
    const bottomSheetRef = React.useRef<BottomSheetModal>(null);
    const memoizedSnapPoints = useMemo(() => snapPoints, [snapPoints]);

    // Expose open/close methods to parent component
    useImperativeHandle(ref, () => ({
      open: () => bottomSheetRef.current?.present(),
      close: () => bottomSheetRef.current?.dismiss(),
    }));

    const handleSheetChanges = useCallback(
      (index: number) => {
        if (index === -1) {
          setIsOpen(false);
          onClose?.();
        } else {
          setIsOpen(true);
          onOpen?.();
        }
        onChange?.(index);
      },
      [onChange, onOpen, onClose],
    );

    const renderBackdrop = useCallback(
      (props: any) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={backdropOpacity}
        />
      ),
      [backdropOpacity],
    );

    return (
      <BottomSheetModal
        ref={bottomSheetRef}
        snapPoints={memoizedSnapPoints}
        backdropComponent={renderBackdrop}
        onChange={handleSheetChanges}
        style={{
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
          backgroundColor: 'red',
        }}>
        <BottomSheetView style={styles.contentContainer}>
          {enableCloseButton && (
            <TouchableOpacity style={styles.closeButton}>
              <Icon
                name="close"
                color="#3C3C4399"
                onPress={() => bottomSheetRef.current?.dismiss()}
              />
            </TouchableOpacity>
          )}
          {children}
        </BottomSheetView>
      </BottomSheetModal>
    );
  },
);

const styles = StyleSheet.create({
  contentContainer: {
    width: '100%',
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f5',
    marginBottom: 10,
    marginTop: -10,
    alignSelf: 'flex-end',
  },
});

export {RNBottomSheet};
export type {RNBottomSheetProps, RNBottomSheetRef};
