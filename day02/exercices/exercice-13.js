/**
 * ─────────────────────────────────────────────────────────────
 * JOUR 02 · EXERCICE 13 · NIVEAU 2 : CONSOLIDATION (INTERMÉDIAIRES)
 * SUITE DE FIBONACCI
 * ─────────────────────────────────────────────────────────────
 *
 * 🎯 MISSION
 * Générez et affichez les 10 premiers nombres de la suite de Fibonacci. (La suite commence par 0, 1. Ensuite, chaque nombre est la somme des deux précédents : 0, 1, 1, 2, 3, 5, 8, 13...).
 *
 * 📖 Consigne détaillée : ../03-exercices.md#exercice-13
 * ▶️ Commande : node day02/exercices/exercice-13.js
 */
'use strict';

// 1. Identifie les données nécessaires.
// 2. Écris ta solution sous cette ligne.
function fibonacci(n)
{
    if(n === 0) return 0
    if (n === 1) return 1
     return fibonacci(n - 1) + fibonacci (n - 2)
}
console.log(fibonacci(10))
