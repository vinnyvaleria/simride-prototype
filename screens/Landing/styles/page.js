import { COLORS } from '../../../constants/colors';

const logo = {
  height: 80,
  width: 80,
  alignSelf: 'center',
  marginBottom: 10,
};

const title = {
  fontSize: 30,
  fontFamily: 'notoSansBold',
  marginBottom: 30,
  color: COLORS.WHITE,
  textAlign: 'center',
};

const header = {
  fontSize: 18,
  fontFamily: 'notoSansMedium',
  color: COLORS.WHITE,
  marginBottom: 2,
};

const textinput = {
  padding: 10,
  fontFamily: 'notoSans',
  alignSelf: 'stretch',
  backgroundColor: COLORS.WHITE,
  marginBottom: 15,
};

const equalspace = {
  flexDirection: 'row',
  alignSelf: 'center',
};


export default { 
  logo, 
  title, 
  header, 
  textinput, 
  equalspace 
};