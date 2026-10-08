import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { fetchAllIdentifications } from '@/data/api/logic';

export default function SettingsScreen() {
  useEffect(() => {
    const fetchIdentifications = async () => {
      try {
        const data = await fetchAllIdentifications();
        console.log(JSON.stringify(data));
      } catch (err) {
        console.error(err);
      }
    };
    fetchIdentifications();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text></Text>
    </View>
  );
}
