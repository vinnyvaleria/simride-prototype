const DEPOSIT_PREFIX = 'DEPOSIT';

export default prefix => ({
  home: `${prefix}_Home`,

  // Wallet
  transfer: `${prefix}_Transfer`,
  deposit: {
    index: `${prefix}_${DEPOSIT_PREFIX}_Index`,
    availableBanks: `${prefix}_${DEPOSIT_PREFIX}_AvailableBanks`,
    confirmation: `${prefix}_${DEPOSIT_PREFIX}_Confirmation`,
    payment: `${prefix}_${DEPOSIT_PREFIX}_Payment`,
    paymentConfirmation: `${prefix}_${DEPOSIT_PREFIX}_DepositConfirmation`,
  },

  // User signin
  signin: `${prefix}_Signin`,
  signup: `${prefix}_Signup`,

  // Forget password
  forgetPassword: `${prefix}_ForgetPassword`,
  forgetPassword_2: `${prefix}_ForgetPassword_2`,
  verifyPhone: `${prefix}_verifyPhone`,
  verifyEmail: `${prefix}_verifyEmail`,
  securityQuestion: `${prefix}_securityQuestion`,
  resetPassword: `${prefix}_resetPassword`,
  helpCentre: `${prefix}_helpCentre`,

  // Bell icon go messages
  messages: `${prefix}_messages`,
});
