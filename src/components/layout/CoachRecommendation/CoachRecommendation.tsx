import {Colors} from '@constants';
import {Icon} from '@icons';
import {User} from '@types';
import {STORAGE_ENUMS, getItem} from '@utils';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

interface CoachRecommendationCardProps {
  name: string;
  message: string;
  userName: string;
  avatar: string;
}

const CoachRecommendation = ({
  name,
  message,
  userName,
  avatar,
}: CoachRecommendationCardProps) => {
  const user = getItem<User>(STORAGE_ENUMS.USER);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Coach Recommendation</Text>

      <View style={styles.coachInfo}>
        <Text style={styles.coachName}>{name}</Text>
      </View>
      {/* Avatar Positioned Over the Card */}
      <View style={styles.avatarContainer}>
        <Image source={{uri: avatar}} style={styles.avatar} />
      </View>

      <View style={styles.card}>
        {/* Coach Info (Name) */}

        {/* Message */}
        <View style={styles.messageContainer}>
          <Text style={styles.greeting}>
            <Text style={styles.bold}>
              Good Morning, {user?.full_name?.split(' ')[0]}{' '}
            </Text>
            🌞 
          </Text>
          <Text style={styles.message}>{message}</Text>
        </View>

        {/* Icons */}
        <View style={styles.iconsContainer}>
          <TouchableOpacity>
            <Icon name="mic" size={22} color={Colors.primary.main} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="chat" size={22} color={Colors.primary.main} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Icon name="check-list" size={20} color={Colors.primary.main} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Colors.primary.main,
    marginVertical: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 24,
  },
  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
    position: 'relative',
  },
  avatarContainer: {
    position: 'absolute',
    top: 50,
    left: 8,
    zIndex: 2,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: '#FFF',
  },
  coachInfo: {
    marginLeft: 50,
    marginBottom: 4,
  },
  coachName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  messageContainer: {
    backgroundColor: '#FFF',
    padding: 8,
    borderRadius: 12,
  },
  greeting: {
    fontSize: 16,
    color: '#000',
  },
  bold: {
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  iconsContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
});

export {CoachRecommendation};
