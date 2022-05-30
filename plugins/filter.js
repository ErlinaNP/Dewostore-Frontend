import Vue from 'vue'
Vue.filter('ReadableDate', function (value) {
  if (value === '-') {
    return '-'
  }
  const date = new Date(value)
  return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
})

Vue.filter('NomarlizedTime', function (value) {
  const date = new Date(value).toLocaleDateString()
  return `${date.getDate()}/${(date.getMonth() + 1)}/${date.getFullYear()}`
})
Vue.filter('countDateBetween', function (value) {
  const date1 = new Date();
  const date2 = new Date(value);

  // To calculate the time difference of two dates
  const differenceInTime = date2.getTime() - date1.getTime();
  return `${Math.floor(differenceInTime / (1000 * 3600 * 24))} Hari`
})
Vue.filter('readableTime', function (value) {
  const date = new Date(value)
  return date.toLocaleDateString('id-ID')
})

Vue.filter('capitalized', function (value) {
  return value
})

Vue.filter('normalCapitalized', function (value) {
  const splitStr = value.toLowerCase().split(' ');
   for (let i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
   }
   return splitStr.join(' ');
})
Vue.filter('ReadableDate', function (value) {
  if (value === '-') {
    return '-'
  }
  const date = new Date(value)
  return `${date.getDate()} /${(date.getMonth() + 1)}/ ${date.getFullYear()}`
})
Vue.filter('toCurrency', function (value) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  })
  return formatter.format(Number(value))
})

Vue.filter('paymentMethod', function (paymentMethod) {
  if (paymentMethod === 'bank_transfer') {
    return 'Bank Transfer'
  }
  if (paymentMethod === 'bca_klikpay') {
    return 'BCA KlikPay'
  }
  if (paymentMethod === 'bca_klikbca') {
    return 'KlikBCA'
  }
  if (paymentMethod === 'bri_epay') {
    return 'BRImo'
  }
  if (paymentMethod === 'cimb_clicks') {
    return 'CIMB Clicks'
  }
  if (paymentMethod === 'danamon_online') {
    return 'Danamon Online Banking'
  }
  if (paymentMethod === 'qris') {
    return 'QRIS'
  }
  if (paymentMethod === 'gopay') {
    return 'GOPAY'
  }
  if (paymentMethod === 'shopeepay') {
    return 'ShopeePay'
  }
  if (paymentMethod === 'cstore') {
    return 'Indomaret/Alfamart'
  }
  if (paymentMethod === 'credit_card') {
    return 'Credit Card'
  } else {
    return paymentMethod
  }
})


Vue.filter('Status', function (Status) {
  if (!Status) return ''
  Status = Status.toString()
  if (Status === 'APPROVED') {
    return `badge bg-success`
  } else if (
    Status === 'REJECTED'
  ) {
    return `badge bg-danger`
  } else {
    return `badge bg-primary`
  }
})
