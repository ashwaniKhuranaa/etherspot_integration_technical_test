import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3f51b8',
    flex: 1,
    height: '100%',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderColor: '#FFF',
    color: '#FFF',
  },
  sectionContainer: {
    paddingHorizontal: 24,
    flex: 1,
    justifyContent: 'center',
  },
  sectionWalletContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
    paddingTop: '10%',
  },
  addressContainer: {
    marginTop: 8,
    paddingHorizontal: 24,
  },
  addressTitle: {
    fontSize: 30,
    fontWeight: '700',
    textAlign: 'center',
    color: '#FFF',
  },
  sectionTitle: {
    fontSize: 36,
    fontWeight: '800',
    textAlign: 'center',
    color: '#FFF',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFF',
  },
  highlight: {
    fontWeight: '700',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#9f54b6',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
  },
  altButton: {
    marginTop: 20,
    alignItems: 'center',
    backgroundColor: '#9f54b6',
    padding: 10,
    borderRadius: 8,
  },
  altButtonText: {
    fontSize: 20,
    fontWeight: '400',
    textAlign: 'center',
    color: '#FFFFFF',
  },
});

export default styles;
