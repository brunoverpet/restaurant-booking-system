/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import transmit from '@adonisjs/transmit/services/main'

const RoomsController = () => import('#controllers/rooms_controller')

router.on('/').renderInertia('home')

router.get('/rooms', [RoomsController, 'index'])
router.get('/rooms/:id', [RoomsController, 'show'])
router.post('/rooms/:room-id/lock-table/:table-id', [RoomsController, 'lockRoom'])
router.post('/rooms/:room-id/unlock-table/:table-id', [RoomsController, 'unlockRoom'])

transmit.registerRoutes()
