const express = require('express');

const cancelEditProfile = require('./account/cancelEditProfile')
const cancelPassword = require('./account/cancelPassword')
const cashOut = require('./account/cashOut')
const changeCheckoutStatus = require('./account/changeCheckoutStatus')
const checkDriverApplicationStatus = require('./account/checkDriverApplicationStatus')
const checkEmailAccount = require('./account/checkEmailAccount')
const editProfile = require('./account/editProfile')
const getLastFiveBookings = require('./account/getLastFiveBookings')
//const handleImgChange = require('./account/handleImgChange')
const handleUploadBack = require('./account/handleUploadBack')
const handleUploadFront = require('./account/handleUploadFront')
const loadCashout = require('./account/loadCashout')
const loadCashoutHistory = require('./account/loadCashoutHistory')
const logout = require('./account/logout')
const maxAmtCalc = require('./account/maxAmtCalc')
const setTwoNumberDecimal = require('./account/setTwoNumberDecimal')
const submitCashOut = require('./account/submitCashOut')
const submitDriverDetails = require('./account/submitDriverDetails')
const submitEditProfile = require('./account/submitEditProfile')
const submitPassword = require('./account/submitPassword')
const topUpWalletPage = require('./account/topUpWalletPage')
const transactionPage = require('./account/transactionPage')
const walletHomePage = require('./account/walletHomePage')
const util = require('./account/util')

const cancelBooking = require('./booking/cancelBooking')
const checkEmailBooking = require('./booking/checkEmail')
const confirmRemovePassenger = require('./booking/confirmRemovePassenger')
const createBooking = require('./booking/createBooking')
const deleteBooking = require('./booking/deleteBooking')
const extendJoinBooking = require('./booking/extendJoinBooking')
const filterChange = require('./booking/filterChange')
const joinBooking = require('./booking/joinBooking')
const onChange = require('./booking/onChange')
const removePassenger = require('./booking/removePassenger')
const showRecurring = require('./booking/showRecurring')
const submitCreateBooking = require('./booking/submitCreateBooking')
const valid = require('./booking/valid')
const viewAllBookings = require('./booking/viewAllBookings')
const viewBooking = require('./booking/viewBooking')
const viewCreatedBookingBooking = require('./booking/viewCreatedBooking')
const viewMyBookingsBooking = require('./booking/viewMyBookings')

const acknowledgeNotif = require('./dashboard/acknowledgeNotif')
const approveApplicant = require('./dashboard/approveApplicant')
const backDashboard = require('./dashboard/back')
const banUser = require('./dashboard/banUser')
const cancel = require('./dashboard/cancel')
const checkEmailDashboard = require('./dashboard/checkEmailDashboard')
const checkEmailLogin = require('./dashboard/checkEmailLogin')
const extendSignUp = require('./dashboard/extendSignUp')
const forgotPass = require('./dashboard/forgotPass')
const login = require('./dashboard/login')
const notifications = require('./dashboard/notifications')
const signup = require('./dashboard/signup')
const submitForgotPass = require('./dashboard/submitForgotPass')
const unBanUser = require('./dashboard/unBanUser')
const validateAccount = require('./dashboard/validateAccount')
const viewApplicant = require('./dashboard/viewApplicant')
const viewApplication = require('./dashboard/viewApplication')
const viewCreatedBookingDashboard = require('./dashboard/viewCreatedBooking')
const viewMyBookingsDashboard = require('./dashboard/viewMyBookings')
const viewReportedList = require('./dashboard/viewReportedList')
const viewReportedUser = require('./dashboard/viewReportedUser')
const walletBalanceCheck = require('./dashboard/walletBalanceCheck')

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

const PrimaryButton = require('./PrimaryButton')