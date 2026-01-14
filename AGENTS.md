# AGENTS.md - Restaurant Booking System

## Aperçu du Projet

Système de réservation de restaurant avec **verrouillage atomique Redis** pour gérer la concurrence en temps réel. Architecture monolithique moderne avec AdonisJS + Inertia.js + Vue 3.

---

## Stack Technique

| Composant       | Technologie                          |
|-----------------|--------------------------------------|
| Backend         | AdonisJS v6                          |
| Base de données | PostgreSQL 16                        |
| Cache/Locks     | Redis 7                              |
| Frontend        | Vue 3 (Composition API) + Inertia.js |
| CSS             | Tailwind CSS v4 (plugin Vite)        |
| Tests           | Japa                                 |
| Infra           | Docker Compose                       |

---

## Commandes Principales

### Développement
```bash
npm run dev              # Serveur dev avec HMR
node ace serve --hmr     # Équivalent
```

### Build & Production
```bash
npm run build            # Build pour production
npm start                # Démarre le serveur (après build)
```

### Tests
```bash
node ace test                                    # Tous les tests
node ace test --suite=unit                       # Suite unit uniquement
node ace test --suite=functional                 # Suite functional uniquement
node ace test --files="tests/unit/lock.spec.ts"  # Un fichier spécifique
node ace test --tests="should acquire lock"      # Un test par son nom
```

### Linting & Formatting
```bash
npm run lint             # ESLint (config: @adonisjs/eslint-config)
npm run format           # Prettier (config: @adonisjs/prettier-config)
npm run typecheck        # TypeScript --noEmit
```

### Base de Données
```bash
node ace migration:run       # Exécuter les migrations
node ace migration:rollback  # Annuler la dernière migration
node ace migration:fresh     # Drop all + migrate
node ace db:seed             # Exécuter les seeders
node ace make:migration      # Créer une migration
node ace make:model          # Créer un modèle
```

### Docker
```bash
docker compose up -d     # Démarrer PostgreSQL + Redis
docker compose down      # Arrêter les conteneurs
docker compose logs -f   # Voir les logs
```

---

## Structure du Projet

```
app/
├── controllers/         # Contrôleurs HTTP
├── exceptions/          # Exceptions personnalisées
├── middleware/          # Middlewares HTTP
├── models/              # Modèles Lucid (ORM)
├── services/            # Services métier (LockService, etc.)
├── validators/          # Validateurs VineJS
config/                  # Configuration (database, redis, transmit...)
database/
├── migrations/          # Migrations SQL
├── seeders/             # Seeders de données
inertia/
├── app/                 # Point d'entrée Vue
├── components/          # Composants Vue réutilisables
├── composables/         # Composables Vue (hooks)
├── css/                 # Styles (Tailwind)
├── pages/               # Pages Inertia
start/
├── routes.ts            # Définition des routes
├── kernel.ts            # Middlewares globaux
├── env.ts               # Validation des variables d'environnement
tests/
├── unit/                # Tests unitaires (timeout: 2s)
├── functional/          # Tests fonctionnels (timeout: 30s)
```

### Import Aliases

Utiliser les aliases définis dans `package.json` :

```typescript
import User from '#models/user'
import BookingController from '#controllers/booking_controller'
import LockService from '#services/lock_service'
import { bookingValidator } from '#validators/booking'
```

---

## Conventions de Code

### TypeScript

- **Strict mode** activé
- Utiliser `declare` pour les propriétés des modèles Lucid
- Types explicites pour les paramètres de fonctions
- Éviter `any`, préférer `unknown` si nécessaire

```typescript
// Bon
declare id: number
async handle(ctx: HttpContext): Promise<void>

// Mauvais
id: number  // Sans declare dans un modèle
async handle(ctx)  // Sans type
```

### Nommage

| Élément              | Convention      | Exemple                    |
|----------------------|-----------------|----------------------------|
| Fichiers             | snake_case      | `booking_controller.ts`    |
| Classes              | PascalCase      | `BookingController`        |
| Variables/Fonctions  | camelCase       | `acquireLock()`            |
| Colonnes DB          | snake_case      | `created_at`               |
| Propriétés TS        | camelCase       | `createdAt`                |
| Constantes           | SCREAMING_SNAKE | `MAX_LOCK_TTL`             |

### Ordre des Imports

```typescript
// 1. Packages externes
import { DateTime } from 'luxon'
import type { HttpContext } from '@adonisjs/core/http'

// 2. Imports internes (aliases #)
import User from '#models/user'
import LockService from '#services/lock_service'
```

### Formatting (Prettier)

Configuration : `@adonisjs/prettier-config`

- `semi: false` — Pas de point-virgule
- `singleQuote: true` — Guillemets simples
- `printWidth: 100`
- `trailingComma: 'es5'`

---

## Conventions Vue 3 / Inertia

### Structure des Composants

```vue
<script setup lang="ts">
import { ref, computed } from 'vue'
import { Head } from '@inertiajs/vue3'

// Props typées
const props = defineProps<{
  tables: Table[]
  roomId: number
}>()

// State réactif
const selectedTable = ref<number | null>(null)
</script>

<template>
  <Head title="Réservation" />
  <!-- Template -->
</template>
```

### Composables

Placer dans `inertia/composables/` avec le préfixe `use` :

```typescript
// inertia/composables/useRealtimeRoom.ts
export function useRealtimeRoom(roomId: number) {
  // Logique SSE
}
```

---

## Conventions Redis (Verrouillage Atomique)

### Key Naming Pattern

```
{domain}:{entity}:{identifier}
```

Exemples :
- `lock:table:42` — Verrou sur la table 42
- `session:booking:abc123` — Session de réservation

### Commandes de Verrouillage

```typescript
// Acquérir un verrou (atomique)
await redis.set(`lock:table:${tableId}`, sessionId, 'NX', 'EX', ttlSeconds)

// Vérifier un verrou
const owner = await redis.get(`lock:table:${tableId}`)

// Libérer un verrou (vérifier le propriétaire)
const script = `
  if redis.call("get", KEYS[1]) == ARGV[1] then
    return redis.call("del", KEYS[1])
  else
    return 0
  end
`
await redis.eval(script, 1, `lock:table:${tableId}`, sessionId)
```

### TTL Recommandés

| Contexte                | TTL        |
|-------------------------|------------|
| Verrouillage table      | 120-180s   |
| Session de réservation  | 300s (5m)  |

---

## Conventions de Tests

### Nommage des Fichiers

```
tests/{suite}/{feature}.spec.ts
```

Exemples :
- `tests/unit/lock_service.spec.ts`
- `tests/functional/booking.spec.ts`

### Structure d'un Test

```typescript
import { test } from '@japa/runner'

test.group('LockService', () => {
  test('should acquire lock when table is available', async ({ assert }) => {
    // Arrange
    // Act
    // Assert
    assert.isTrue(result)
  })
})
```

---

## Règles pour les Agents IA

1. **Ne jamais supprimer de commentaires** sans demander explicitement
2. **Proposer un plan** avant de coder une fonctionnalité complexe
3. **Expliquer la cause** d'un bug avant de proposer une solution
4. **Utiliser Context7** pour consulter la documentation officielle
5. **Utiliser gh_grep** pour trouver des exemples de code réels
6. **Ne pas deviner** — chercher ou demander en cas de doute
7. **Répondre en français** dans toutes les communications
