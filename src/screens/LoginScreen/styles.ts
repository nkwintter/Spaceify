import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0e0b22',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },

  astronaut: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },

  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 40,
    fontFamily: 'monospace',
    letterSpacing: 2,
  },

  card: {
    backgroundColor: '#1c1b38',
    width: '100%',
    borderRadius: 20,
    alignItems: 'center',
    paddingVertical: 30,
    paddingHorizontal: 20,
  },

  spotifyLogo: {
    width: 80,
    height: 80,
    marginBottom: 15,
  },

  cardText: {
    color: '#fff',
    fontSize: 14,
    marginBottom: 20,
  },

  button: {
    backgroundColor: '#704DFF',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
  },

  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
  },
});