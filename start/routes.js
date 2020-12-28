'use strict'

const SahamController = require('../app/Controllers/Http/SahamController')

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', ('SahamController.home'))
Route.get('/analisis-all-emiten', ('SahamController.analisisAllEmiten'))
Route.get('/analisis-single-emiten', ('SahamController.analisisSingleEmiten'))
Route.post('/analisis-single-emiten', 'SahamController.analisisSingleEmitenFind')

Route.get('/api/price', 'SahamController.price')
Route.get('/api/hrg', 'SahamController.hrg')