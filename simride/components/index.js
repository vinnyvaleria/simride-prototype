const app = require('express')();

const cancelEditProfile = require('./account/cancelEditProfile')
const cancelPassword = require('./account/cancelPassword')
const cashOut = require('./wallet/cashOut')
const changeCheckoutStatus = require('./cashcheckout/changeCheckoutStatus')
const checkDriverApplicationStatus = require('./account/checkDriverApplicationStatus')
const checkEmailAccount = require('./account/checkEmail')
const editProfile = require('./account/editProfile')
const getLastFiveBookings = require('./wallet/getLastFiveBookings')
const handleImgChange = require('./account/handleImgChange')
const handleUploadBack = require('./account/handleUploadBack')
const handleUploadFront = require('./account/handleUploadFront')
const loadCashout = require('./cashcheckout/loadCashout')
const loadCashoutHistory = require('./cashcheckout/loadCashoutHistory')
const logout = require('./account/logout')
const maxAmtCalc = require('./wallet/maxAmtCalc')
const setTwoNumberDecimal = require('./wallet/setTwoNumberDecimal')
const submitCashOut = require('./wallet/submitCashOut')
const submitDriverDetails = require('./account/submitDriverDetails')
const submitEditProfile = require('./account/submitEditProfile')
const submitPassword = require('./account/submitPassword')
const topUpWalletPage = require('./wallet/topUpWalletPage')
const transactionPage = require('./account/transactionPage')
const walletHomePage = require('./account/walletHomePage')
const util = require('./account/util')






const backInbox = require('./inbox/back')
const checkEmailInbox = require('./inbox/checkEmail')
const inboxMsgButton = require('./inbox/inboxMsgButton')
const newMsgButton = require('./inbox/inboxMsgButton')
const openChat = require('./inbox/openChat')
const report = require('./inbox/report')
const searchUsername = require('./inbox/searchUsername')
const sendMessage = require('./inbox/sendMessage')
const submitReport = require('./inbox/submitReport')
const viewUserProfile = require('./inbox/viewUserProfile')
