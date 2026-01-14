import { BaseSeeder } from '@adonisjs/lucid/seeders'
import Room from '#models/room'
import Table from '#models/table'

export default class extends BaseSeeder {
  async run() {
    // 1. Créer les 3 salles
    const rooms = await Room.createMany([
      { name: 'Terrasse', capacity: 40 },
      { name: 'Salle Principale', capacity: 60 },
      { name: 'Salon Privé', capacity: 20 },
    ])

    // 2. Créer les tables pour la Terrasse (10 tables)
    // Tables 1-4 : 2 places, Tables 5-10 : 4 places
    // Grille 5 colonnes x 2 rangées
    await Table.createMany([
      { roomId: rooms[0].id, number: 1, seats: 2, positionX: 0, positionY: 0 },
      { roomId: rooms[0].id, number: 2, seats: 2, positionX: 1, positionY: 0 },
      { roomId: rooms[0].id, number: 3, seats: 2, positionX: 2, positionY: 0 },
      { roomId: rooms[0].id, number: 4, seats: 2, positionX: 3, positionY: 0 },
      { roomId: rooms[0].id, number: 5, seats: 4, positionX: 4, positionY: 0 },
      { roomId: rooms[0].id, number: 6, seats: 4, positionX: 0, positionY: 1 },
      { roomId: rooms[0].id, number: 7, seats: 4, positionX: 1, positionY: 1 },
      { roomId: rooms[0].id, number: 8, seats: 4, positionX: 2, positionY: 1 },
      { roomId: rooms[0].id, number: 9, seats: 4, positionX: 3, positionY: 1 },
      { roomId: rooms[0].id, number: 10, seats: 4, positionX: 4, positionY: 1 },
    ])

    // 3. Créer les tables pour la Salle Principale (15 tables)
    // Tables 1-5 : 2 places, Tables 6-13 : 4 places, Tables 14-15 : 6 places
    // Grille 5 colonnes x 3 rangées
    await Table.createMany([
      { roomId: rooms[1].id, number: 1, seats: 2, positionX: 0, positionY: 0 },
      { roomId: rooms[1].id, number: 2, seats: 2, positionX: 1, positionY: 0 },
      { roomId: rooms[1].id, number: 3, seats: 2, positionX: 2, positionY: 0 },
      { roomId: rooms[1].id, number: 4, seats: 2, positionX: 3, positionY: 0 },
      { roomId: rooms[1].id, number: 5, seats: 2, positionX: 4, positionY: 0 },
      { roomId: rooms[1].id, number: 6, seats: 4, positionX: 0, positionY: 1 },
      { roomId: rooms[1].id, number: 7, seats: 4, positionX: 1, positionY: 1 },
      { roomId: rooms[1].id, number: 8, seats: 4, positionX: 2, positionY: 1 },
      { roomId: rooms[1].id, number: 9, seats: 4, positionX: 3, positionY: 1 },
      { roomId: rooms[1].id, number: 10, seats: 4, positionX: 4, positionY: 1 },
      { roomId: rooms[1].id, number: 11, seats: 4, positionX: 0, positionY: 2 },
      { roomId: rooms[1].id, number: 12, seats: 4, positionX: 1, positionY: 2 },
      { roomId: rooms[1].id, number: 13, seats: 4, positionX: 2, positionY: 2 },
      { roomId: rooms[1].id, number: 14, seats: 6, positionX: 3, positionY: 2 },
      { roomId: rooms[1].id, number: 15, seats: 6, positionX: 4, positionY: 2 },
    ])

    // 4. Créer les tables pour le Salon Privé (5 tables)
    // Toutes à 4 places
    // Grille 5 colonnes x 1 rangée
    await Table.createMany([
      { roomId: rooms[2].id, number: 1, seats: 4, positionX: 0, positionY: 0 },
      { roomId: rooms[2].id, number: 2, seats: 4, positionX: 1, positionY: 0 },
      { roomId: rooms[2].id, number: 3, seats: 4, positionX: 2, positionY: 0 },
      { roomId: rooms[2].id, number: 4, seats: 4, positionX: 3, positionY: 0 },
      { roomId: rooms[2].id, number: 5, seats: 4, positionX: 4, positionY: 0 },
    ])
  }
}
