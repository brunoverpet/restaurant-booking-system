import { Transmit } from '@adonisjs/transmit-client'

// Une petite fonction qui génère des ID aléatoires sans utiliser crypto
function generateId() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const transmit = new Transmit({
  baseUrl: window.location.origin,

  // C'est ici qu'on remplace le générateur par défaut qui plante
  uidGenerator: generateId,
})
