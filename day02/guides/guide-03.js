/**
 * JOUR 02 — GUIDE 03
 * Les boucles imbriquées (Grille)
 *
 * OBJECTIF
 * Affichez un carré de 3 lignes et 3 colonnes rempli d'étoiles *.
 *
 * Aide : consulte ../02-guides.md seulement si tu bloques.
 */
'use strict';
for(let i = 0; i < 3; i++)
{
    let result = ""
    for (let j = 0; j < 3; j++)
    {
        result += "*" 
    }
    console.log(result)
}
