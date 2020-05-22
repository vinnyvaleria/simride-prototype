import { COLORS } from '../../../constants/colors';

const wrapper ={
  paddingTop: 10,
  flex: 1,
  alignSelf: 'center',
};

const formwrap = {
  width: '100%',
  marginBottom: 80,
};

const image = {
  height: 150,
  width: 150,
  alignSelf: 'center',
  marginBottom: 40,
  borderRadius: 100,
};

const title = {
  fontSize: 30,
  fontFamily: 'notoSansBold',
  marginBottom: 30,
  color: COLORS.WHITE,
  textAlign: 'center',
};

const subtitle = {
  fontSize: 20,
  fontFamily: 'notoSansMedium',
  marginBottom: 10,
  color: COLORS.WHITE,
  textAlign: 'left',
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
  marginBottom:15,
};

const equalspace = {
  flexDirection: 'row',
  justifyContent: 'space-around',
  marginTop: 50,
};

export default { 
  wrapper,
  formwrap,
  image, 
  title, 
  subtitle, 
  header, 
  textinput, 
  equalspace 
};