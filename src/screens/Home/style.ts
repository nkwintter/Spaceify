import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0B22',
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  title: {
    fontSize: 16,
    color: '#FFFFFF',
    marginBottom: 12,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 16,
  },
  image: {
    width: '100%',
    height: 380,
    borderRadius: 12,
  },
  imagePorCima: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)', // opcional, destaca o texto
    padding: 12,
  },
  imageTitle: {
    marginTop: 8,
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  imageDate: {
    fontSize: 12,
    color: '#AAAAAA',
    marginBottom: 4,
  },
  imageDescription: {
    fontSize: 12,
    color: '#CCCCCC',
  },
  listenButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#7C4DFF',
    paddingVertical: 10,
    borderRadius: 20,
    marginVertical: 16,
  },
  listenButtonText: {
    color: '#FFFFFF',
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 16,
  },
  moodContainer: {
    marginBottom: 10,
  },
  moodLabel: {
    fontSize: 14,
    color: '#D0D0D0',
    marginBottom: 10,
  },
  moodRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  moodText: {
    fontSize: 16,
    color: '#00E0FF',
    fontWeight: '600',
  },
  changeMood: {
    fontSize: 14,
    color: '#A172FF',
  },
  favoritesTitle: {
    fontSize: 14,
    color: '#D0D0D0',
    marginBottom: 8,
  },
  favoritesScroll: {
    marginBottom: 16,
  },
  favoriteCard: {
    marginRight: 8,
    alignItems: 'center',
    width: 80,
  },
  favoriteImage: {
    width: 80,
    height: 80,
    borderRadius: 12,
    marginBottom: 4,
  },
  favoriteText: {
    fontSize: 12,
    color: '#FFFFFF',
  },
});
