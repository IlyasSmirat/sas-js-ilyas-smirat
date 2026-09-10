/**
 * ─────────────────────────────────────────────────────────────
 * JOUR 02 · EXERCICE 11 · NIVEAU 2 : CONSOLIDATION (INTERMÉDIAIRES)
 * PUISSANCE MANUELLE
 * ─────────────────────────────────────────────────────────────
 *
 * 🎯 MISSION
 * Calculez 2 à la puissance 10 en utilisant une boucle for (sans utiliser Math.pow ni ).
 *
 * RÉSULTAT ATTENDU
 * 1024
 *
 * 📖 Consigne détaillée : ../03-exercices.md#exercice-11
 * ▶️ Commande : node day02/exercices/exercice-11.js
 */
'use strict';

// 1. Identifie les données nécessaires.
// 2. Écris ta solution sous cette ligne.
var n = 2
var result = 1
for(var i = 1; i <= 10; i++)
    {
       result *= n; 
    } 
    console.log(result)