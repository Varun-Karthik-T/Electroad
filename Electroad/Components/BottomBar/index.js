import React from 'react';
import { useState } from 'react';
import { BottomNavigation, Text, TouchableRipple } from 'react-native-paper';
import HomePage from '../HomePage';
import BookingPage from '../BookingPage';
import ProfilePage from '../ProfilePage';

const HomeRoute = () => <HomePage />;
const BookingsRoute = () => <BookingPage />;
const ProfileRoute = () => <ProfilePage />;

const BottomBar = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'home', title: 'Map', focusedIcon: 'map-marker', unfocusedIcon: 'map-marker-outline' },
    { key: 'booking', title: 'Bookings', focusedIcon: 'book', unfocusedIcon: 'book-outline' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account', unfocusedIcon: 'account-outline' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    home: HomeRoute,
    booking: BookingsRoute,
    profile: ProfileRoute,
  });

  return (
    <BottomNavigation
      navigationState={{ index, routes }}
      onIndexChange={setIndex}
      renderScene={renderScene}
      renderTouchable={({ route, ...props }) => (
        <TouchableRipple {...props} key={route.key} />
      )}
    />
  );
};

export default BottomBar;
