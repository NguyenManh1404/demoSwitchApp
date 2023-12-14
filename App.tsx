import {useCallback} from 'react';
import {
  NativeModules,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const {ConnectNativeModule} = NativeModules;

const App = () => {
  const goToNextApp = useCallback(async () => {
    await ConnectNativeModule?.openApp(
      'BeautySalon',
      `index.${Platform.OS}-1.bundle`,
      {
        text: 'Hello',
      },
      false,
      () => {},
    );

    const result = await ConnectNativeModule?.getBundleNames();
    console.log('Bundle names:', result);
    return result;
  }, []);

  const goToNextPage = () => {
    // Implement your navigation logic here
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Welcome to Parent App</Text>
      <TouchableOpacity onPress={goToNextApp}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Switch App</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={goToNextPage}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Navigation</Text>
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFE0', // Light yellow background
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db', // Blue background color
    padding: 15,
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff', // White text color
    fontSize: 18,
    textAlign: 'center',
  },
});

export default App;
