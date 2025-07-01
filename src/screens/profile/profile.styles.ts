import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F0F0F', 
    padding: 16,
  },
  inicio: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#0C8BEA', 
    marginTop: 10,
  },
  avatarSessao: {
    alignItems: 'center',
    marginVertical: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#1EBFDB', // azul ciano
  },
  editAvatar: {
    position: 'absolute',
    bottom: 0,
    right: 130,
    backgroundColor: '#4E3592', // roxo
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: '#1EBFDB',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FFFFFF',
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  acoes: {
    backgroundColor: '#4E3592',
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  acaoBotao: {
    backgroundColor: '#1EBFDB',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  acaoTexto: {
    color: '#0F0F0F',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0C8BEA',
    marginTop: 20,
    marginBottom: 10,
  },
  playlistCard: {
    flexDirection: 'row',
    backgroundColor: '#4E3592',
    borderRadius: 20,
    padding: 10,
    marginBottom: 15,
  },
  playlistImage: {
    width: 60,
    height: 60,
    borderRadius: 12,
    marginRight: 10,
  },
  playlistInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  playlistName: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 14,
  },
  playlistButtons: {
    flexDirection: 'row',
    marginTop: 5,
    gap: 10,
  },
  status: {
    backgroundColor: '#0C8BEA',
    borderRadius: 14,
    padding: 14,
    marginBottom: 20,
  },
  statusTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 6,
    fontWeight: '500',
  },
  exportarBotao: {
    backgroundColor: '#1EBFDB',
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
  },
  exportarTexto: {
    color: '#0F0F0F',
    fontWeight: 'bold',
  },
  avancado: {
    backgroundColor: '#4E3592',
    padding: 10,
    borderRadius: 10,
    marginBottom: 10,
  },
  avancadoTexto: {
    color: '#FFFFFF',
    textAlign: 'center',
  },
});

export default styles;