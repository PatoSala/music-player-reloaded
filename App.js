import { StyleSheet, Text, View, SafeAreaView  } from 'react-native';
import { store } from './Redux/store';
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import colors from './resources/Style/Colors';

// Components
import PlaybackControls from './resources/Components/PlaybackControls';

// Navigators
import MainNavigation from './resources/Navigators/MainNavigation';

export default function App() {
  return (
    <Provider store={store}>
      <StatusBar style='light'/>
      <SafeAreaView style={{flex: 0, backgroundColor: colors.bgHighlight}}/>
      <SafeAreaView style={{flex: 1, backgroundColor: colors.bgPrimary}}>
        <NavigationContainer>
          <MainNavigation/>
          <PlaybackControls/>
        </NavigationContainer>
      </SafeAreaView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
