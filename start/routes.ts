/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const RoomsController = () => import('#controllers/rooms_controller')

router.on('/').renderInertia('home')

router.get('/rooms', [RoomsController, 'index'])
router.get('/rooms/:id', [RoomsController, 'show'])
router.post('/rooms/:id/lock', [RoomsController, 'lockRoom'])
