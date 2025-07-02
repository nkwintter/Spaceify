import { StyleSheet } from 'react-native';

export const getStyles = (theme: 'dark' | 'light') => {
  const isDark = theme === 'dark';

  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: isDark ? '#0F0F0F' : '#FFFFFF',
      padding: 16,
    },
    inicio: {
      fontSize: 22,
      fontWeight: 'bold',
      color: isDark ? '#0C8BEA' : '#1E4789',
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
      borderColor: isDark ? '#1EBFDB' : '#1E4789',
    },
    editAvatar: {
      position: 'absolute',
      bottom: 0,
      right: 130,
      backgroundColor: isDark ? '#4E3592' : '#B3C7F9',
      borderRadius: 20,
      padding: 6,
      borderWidth: 1,
      borderColor: isDark ? '#1EBFDB' : '#1E4789',
    },
    name: {
      fontSize: 18,
      fontWeight: '600',
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      textAlign: 'center',
    },
    email: {
      fontSize: 14,
      color: isDark ? '#FFFFFF' : '#333333',
      textAlign: 'center',
      marginBottom: 20,
    },
    acoes: {
      backgroundColor: isDark ? '#4E3592' : '#DDE6FF',
      padding: 12,
      borderRadius: 12,
      marginBottom: 20,
    },
    acaoBotao: {
      backgroundColor: isDark ? '#1EBFDB' : '#5C8EF2',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    acaoTexto: {
      color: isDark ? '#0F0F0F' : '#FFFFFF',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    title: {
      fontSize: 16,
      fontWeight: 'bold',
      color: isDark ? '#0C8BEA' : '#1E4789',
      marginTop: 20,
      marginBottom: 10,
    },
    playlistCard: {
      flexDirection: 'row',
      backgroundColor: isDark ? '#4E3592' : '#E8EDFF',
      borderRadius: 20,
      padding: 10,
      marginBottom: 15,
    },
    playlistName: {
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      fontWeight: '600',
      fontSize: 14,
    },
    status: {
      backgroundColor: isDark ? '#0C8BEA' : '#B3C7F9',
      borderRadius: 14,
      padding: 14,
      marginBottom: 20,
    },
    statusTexto: {
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      fontSize: 14,
      marginBottom: 6,
      fontWeight: '500',
    },
    exportarBotao: {
      backgroundColor: isDark ? '#1EBFDB' : '#5C8EF2',
      padding: 12,
      borderRadius: 10,
      alignItems: 'center',
      marginBottom: 20,
    },
    exportarTexto: {
      color: isDark ? '#0F0F0F' : '#FFFFFF',
      fontWeight: 'bold',
    },
    avancado: {
      backgroundColor: isDark ? '#4E3592' : '#DDE6FF',
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
    },
    avancadoTexto: {
      color: isDark ? '#FFFFFF' : '#1A1A1A',
      textAlign: 'center',
    },
  });
};
