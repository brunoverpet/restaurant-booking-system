# Roadmap - Restaurant Booking System

Suivi de l'avancement du projet.

---

## Phase 1 - Infrastructure ✅

- [x] Configuration Docker (PostgreSQL + Redis)
- [x] Modèles Lucid (Room, Table, Reservation, User)
- [x] Migrations
- [x] Seeder (3 salles, 30 tables)
- [x] Configuration Redis
- [x] Configuration Transmit (SSE)

---

## Phase 2 - LockService ✅

- [x] Service de verrouillage atomique Redis (`app/services/lock_service.ts`)
- [x] Méthode `acquire(resource, ownerId, ttl)` - Acquérir un verrou
- [x] Méthode `release(resource, ownerId)` - Libérer un verrou (avec vérification propriétaire via Lua)
- [x] Méthode `isLocked(resource)` - Vérifier si verrouillé
- [x] Méthode `getOwner(resource)` - Récupérer le propriétaire

---

## Phase 3 - Interface Réservation 🚧

- [x] `RoomsController` - Contrôleur pour les salles
  - [x] Méthode `index` - Liste des salles
  - [x] Méthode `show` - Détail d'une salle avec ses tables
- [x] Routes `/rooms` et `/rooms/:id`
- [x] DTOs (`app/dtos/room_dto.ts`, `app/dtos/table_dto.ts`)
- [x] Page `rooms/index.vue` - Liste des salles
- [x] Page `rooms/show.vue` - Plan de salle interactif (basique fait, positionnement à faire)
- [x] Composant `TableCard.vue` - Affichage d'une table (disponible/verrouillée)
- [x] Intégration du LockService dans le contrôleur

---

## Phase 4 - Temps réel (SSE)

- [x] Broadcast des événements de verrouillage
- [x] Composable `useRealtimeRoom.ts` - Écoute des mises à jour
- [x] Mise à jour automatique de l'UI quand une table est verrouillée/libérée

---

## Phase 5 - Formulaire de Réservation

- [ ] Validator VineJS pour les réservations
- [ ] `ReservationsController` - CRUD réservations
- [ ] Formulaire de réservation (nom, email, téléphone)
- [ ] Confirmation de réservation

---

## Phase 6 - Tests

- [ ] Tests unitaires `LockService`
- [ ] Tests fonctionnels API réservations
- [ ] Tests E2E parcours complet

---

## Légende

| Symbole | Signification  |
| ------- | -------------- |
| ✅      | Phase terminée |
| 🚧      | Phase en cours |
| ❌      | Bloqué         |
| (vide)  | À venir        |
