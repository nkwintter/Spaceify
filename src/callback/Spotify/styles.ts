import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    paddingHorizontal: 20,
  },

  content: {
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 300,
    width: '100%',
  },

  emoji: {
    fontSize: 48,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },

  subtitle: {
    fontSize: 16,
    color: '#B3B3B3',
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 22,
  },

  loader: {
    marginBottom: 30,
    transform: [{ scale: 1.2 }],
  },

  footer: {
    alignItems: 'center',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#333333',
    width: '100%',
  },

  footerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});