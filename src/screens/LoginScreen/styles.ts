import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D0D1F',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 36,
    color: '#FFFFFF',
    fontFamily: 'monospace',
    marginBottom: 30,
    letterSpacing: 2,
  },
  card: {
    backgroundColor: '#1B1B3A',
    padding: 30,
    borderRadius: 20,
    alignItems: 'center',
    width: '100%',
    maxWidth: 320,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  text: {
    color: '#D0D0D0',
    fontSize: 14,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#7A4FFF',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
