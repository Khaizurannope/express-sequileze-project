const bcrypt = require('bcryptjs');

// Fungsi untuk mengenkripsi kata sandi
const hashPassword = (password) => {
  return bcrypt.hash(password, 16);
}

// Fungsi untuk membandingkan kata sandi yang dimasukkan dengan kata sandi yang dienkripsi
const comparePassword = (password, hashPassword) => {
  return bcrypt.compare(password, hashPassword);
}

// Ekspor fungsi-fungsi agar dapat digunakan di file lain
module.exports = {
  hashPassword,
  comparePassword
}