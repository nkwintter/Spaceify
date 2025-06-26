import { StyleSheet } from "react-native";



export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d0d2b',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 32,
    color: '#fff',
    marginBottom: 20,
    fontFamily: 'Orbitron-Bold',//arrumar o import
    letterSpacing: 3,
  },
  loginBox: {
    backgroundColor: '#1a1a40',
    borderRadius: 10,
    padding: 20,
    width: '100%',
    alignItems: 'center',
  },
  spotifyIcon: {
    width: 30,
    height: 30,
    marginBottom: 20,
  },
  label: {
    color: '#ccc',
    alignSelf: 'flex-start',
    marginBottom: 10,
    marginTop: 10,
  },
  input: {
    backgroundColor: '#e0e0e0',
    borderRadius: 15,
    height: 45,
    paddingHorizontal: 15,
    width: '100%',
    marginTop: 5,
  },
  subText: {
    color: '#aaa',
    fontSize: 12,
    marginVertical: 15
  },
  button: {
    backgroundColor: '#6b3dfd',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    letterSpacing: 1
  },
  senhaContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#e0e0e0',
    paddingHorizontal: 10,
    borderRadius: 15,
    marginTop: 5
  },
  inputSenha: {
    flex: 1,
    height: 45,
    color: '#000'
  },
  olho: {
    fontSize: 20,
    marginLeft: 10
  }
});

