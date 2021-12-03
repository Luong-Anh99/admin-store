

//Chức năng này dùng để định dạng giá tiền nhìn deep deep hơn, ví dụ 1900000 nó sẽ thành 1,900,000

const numberWithCommas = (num) => num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

export default numberWithCommas