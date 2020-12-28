'use strict'

const Task = use('Task')
const got = require('got');

class UpdateHarga extends Task {
  static get schedule () {
    return '5 8 * * *'
  }

  async handle () {
    try {
      const response = await got('http://127.0.0.1:3333/api/price');
      console.log('Sukses');
    } catch (error) {
      console.log(error);
    }
  }
}

module.exports = UpdateHarga
