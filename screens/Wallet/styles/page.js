import { COLORS } from '../../../constants/colors';

const wrapper ={
  paddingTop: 10,
  paddingHorizontal: '5%',
  flex: 1,
  alignSelf: 'center',
}

const image = {
  height: 150,
  width: 150,
  alignSelf: 'center',
  marginVertical: 15,
  borderRadius: 100,
};

const title = {
  fontSize: 50,
  fontFamily: 'notoSansBold',
  marginBottom: 30,
  color: COLORS.WHITE,
  textAlign: 'center',
  textTransform: 'capitalize',
};

const subtitle = {
  fontSize: 20,
  fontFamily: 'notoSansMedium',
  marginVertical: 10,
  color: COLORS.WHITE,
  textAlign: 'center',
};

const header = {
  fontSize: 18,
  fontFamily: 'notoSansMedium',
  color: COLORS.WHITE,
  marginBottom: 2,
  textDecorationLine: 'underline',
};

const textinput = {
  padding: 10,
  fontFamily: 'notoSans',
  alignSelf: 'stretch',
  minWidth: 350,
  backgroundColor: COLORS.WHITE,
  marginBottom:15,
  textTransform: 'capitalize',
};

const equalspace = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginVertical: 20,
};

export default { 
  wrapper,
  image, 
  title, 
  subtitle, 
  header, 
  textinput, 
  equalspace 
};