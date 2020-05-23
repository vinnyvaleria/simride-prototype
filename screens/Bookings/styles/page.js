import { COLORS } from '../../../constants/colors';

const wrapper = {
  alignSelf: 'center',
  paddingTop: 10,
  height: '100%',
  flex: 1,
};

const image = {
  height: 100,
  width: 100,
  alignSelf: 'flex-end',
  marginBottom: 40,
  borderRadius: 50,
};

const opening = {
  fontSize: 30,
  fontFamily: 'notoSansBold',
  marginBottom: 10,
  color: COLORS.YELLOW,
  textAlign: 'left',
  alignSelf: 'flex-start',
  maxWidth: 280,
  textTransform: 'capitalize',
};

const balance = {
  fontSize: 14,
  fontFamily: 'notoSansMedium',
  marginBottom: 20,
  color: COLORS.GREY,
};

const subtitle = {
  fontSize: 20,
  fontFamily: 'notoSansMedium',
  marginBottom: 10,
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
  alignSelf: 'stretch',
  backgroundColor: COLORS.WHITE,
  marginBottom:15,
};

const equalspace = {
  flexDirection: 'row',
  justifyContent: 'space-around',
};

export default {
  wrapper,
  opening,
  balance,
  image,
  subtitle,
  header,
  textinput,
  equalspace,
}