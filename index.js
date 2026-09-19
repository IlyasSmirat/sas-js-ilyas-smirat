
import promptSync from "prompt-sync";
import { validName } from "./helpers/helper.js";
import { validCity } from "./helpers/helper.js"
import { validDay } from "./helpers/helper.js"
import { validExercises } from "./helpers/helper.js"
import { validChallenge } from "./helpers/helper.js";

export const prompt = promptSync()
export let userarray = [
    {
        id: 1,
        nomComplet: "Sara Dev",
        ville: "Nador",

        resultats: [
            {
                jour: 1, exercicesTermines: 18,
                totalExercices: 20, challengeTermine: true
            },
            {
                jour: 2, exercicesTermines: 14,
                totalExercices: 20, challengeTermine: false
            }
        ]
    },
    {
        id: 2,
        nomComplet: "Yassine Code",
        ville: "Oujda",
        resultats: [
            {
                jour: 1, exercicesTermines: 12,
                totalExercices: 20, challengeTermine: false
            }
        ]
    }]

function displayDashboard() {

    console.log("===== TABLEAU DE BORD =====")

    // NOMBRE TOTAL D'APPRENANTS

    const totalApprenants = userarray.length

    console.log("Nombre total d'apprenants :", totalApprenants)

    // CALCUL DE LA PROGRESSION

    let sommeProgression = 0
    let solides = 0
    let enProgression = 0
    let aRenforcer = 0

    const apprenantsProgression = []


    for (const apprenant of userarray) {

        let totalTermine = 0
        let totalPropose = 0

        for (const resultat of apprenant.resultats) {
            totalTermine += resultat.exercicesTermines
            totalPropose += resultat.totalExercices
        }

        let progression = 0
        if (totalPropose > 0) {
            progression = calculerProgression(totalTermine, totalPropose)
        }
        sommeProgression += progression

        // NIVEAU

        if (progression >= 80) {
            solides++
        } else if (progression >= 50) {
            enProgression++
        } else {
            aRenforcer++
        }
        apprenantsProgression.push({ apprenant: apprenant, progression: progression })
    }

    // PROGRESSION MOYENNE

    let progressionMoyenne = 0

    if (totalApprenants > 0) {
        progressionMoyenne = sommeProgression / totalApprenants;
    }
    console.log("Progression moyenne du groupe :", progressionMoyenne.toFixed(2) + "%" + "\n")

    // NIVEAUX

    console.log("===== NIVEAUX =====")
    console.log("Solide :", solides)
    console.log("En progression :", enProgression)
    console.log("À renforcer :", aRenforcer + "\n")

    // TRIER PAR PROGRESSION

    apprenantsProgression.sort((a, b) => b.progression - a.progression)
    console.log("===== PROGRESSION DES APPRENANTS =====")
    for (const element of apprenantsProgression) {
        console.log(element.apprenant.nomComplet + " : " + element.progression.toFixed(2) + "%")
    }

    console.log("\n===== JOURNEES ET CHALLENGES MANQUANTS =====")
    for (const apprenant of userarray) {
        const joursManquants = []
        const challengesManquants = []

        for (let jour = 1; jour <= 7; jour++) {
            const resultat = apprenant.resultats.find(element => element.jour === jour)
            if (!resultat) {
                joursManquants.push(jour)
                challengesManquants.push(jour)
            } else if (resultat.challengeTermine === false) {
                challengesManquants.push(jour)
            }
        }
        console.log("===== " + apprenant.nomComplet + "=====")
        if (joursManquants.length > 0) {
            console.log("Journées manquantes :", joursManquants.join(", "))
        } else {
            console.log("Journées manquantes : aucune")
        }
        if (challengesManquants.length > 0) {
            console.log("Challenges manquants :", challengesManquants.join(", ") + "\n")
        } else {
            console.log("Challenges manquants : aucun")
        }
    }
}

function sortByProgression() {
    const apprenantsTries = [...userarray]
    apprenantsTries.sort((a, b) => {
        let totalTermineA = 0
        let totalProposeA = 0
        for (const resultat of a.resultats) {
            totalTermineA += resultat.exercicesTermines
            totalProposeA += resultat.totalExercices
        }
        let totalTermineB = 0
        let totalProposeB = 0
        for (const resultat of b.resultats) {
            totalTermineB += resultat.exercicesTermines
            totalProposeB += resultat.totalExercices
        }
        const progressionA = calculerProgression(totalTermineA, totalProposeA)
        const progressionB = calculerProgression(totalTermineB, totalProposeB)
        return progressionB - progressionA
    })

    for (const apprenant of apprenantsTries) {
        let totalTermine = 0
        let totalPropose = 0

        for (const resultat of apprenant.resultats) {
            totalTermine += resultat.exercicesTermines
            totalPropose += resultat.totalExercices
        }

        const progression = calculerProgression(totalTermine, totalPropose)
        console.log(apprenant.nomComplet + " : " + progression.toFixed(2) + "%")
    }
}

function addOrUpdateResult() {
    const idRecherche = prompt("Entrer id : ")
    let user = userarray.find(element => element.id === Number(idRecherche))

    if (!user) {
        let nomComplet
        let ville
        do {
            nomComplet = prompt("Entrer un nom : ")
            nomComplet = validName(nomComplet)
            if (nomComplet === null) {
                console.log("Nom invalide")
            }
        } while (nomComplet === null)

        do {
            ville = prompt("Entrer la ville d utilisateur : ")
            ville = validCity(ville)
            if (ville === null) {
                console.log("Ville invalide")
            }
        } while (ville === null)
        user = {id: Number(idRecherche), nomComplet: nomComplet, ville: ville, resultats: []}
        userarray.push(user)
        console.log("Nouvel apprenant ajouté")
    }

    let jour
    do {
        jour = prompt("Entrer un jour : ")
        jour = validDay(jour)
        if (jour === null) {
            console.log("Le jour doit etre entre 1 et 7")
        }
    } while (jour === null)

    let exercicesTermines
    do {
        exercicesTermines = prompt("Entrer le nombre d exercices complétés : ")
        exercicesTermines = validExercises(exercicesTermines)
        if (exercicesTermines === null) {
            console.log("Le nombre d exercices doit etre entre 0 et 20")
        }
    } while (exercicesTermines === null)

    let challengeTermine
    do {
        challengeTermine = prompt(
            "Challenge complété ? [Y / N] : "
        )
        challengeTermine = validChallenge(challengeTermine)
        if (challengeTermine === null) {
            console.log("La réponse doit etre Y ou N")
        }
    } while (challengeTermine === null)

    const resultat = user.resultats.find(element => element.jour === jour)
    if (resultat) {
        resultat.exercicesTermines = exercicesTermines
        resultat.challengeTermine = challengeTermine
        console.log("Résultat modifié avec succés")
    } else {
        user.resultats.push({jour: jour, exercicesTermines: exercicesTermines, totalExercices: 20, challengeTermine: challengeTermine})
        console.log("Résultat ajouté avec succés")
    }
}

function calculerProgression(terminée, total) {
    return (terminée / total) * 100
}

function addUser() {
    let idMan
    let nomComplet
    let ville
    let jour
    let exercicesTermines
    let challengeTermine

    do {
        idMan = prompt("Entrer un ID : ")
        idMan = Number(idMan)
        if (userarray.some(user => user.id === idMan)) {
            console.log("Cet ID existe déja, Veuillez entrer un autre ID.")
        }
    } while (userarray.some(user => user.id === idMan))

    do {
        nomComplet = prompt("Entrer un nom :")
        nomComplet = validName(nomComplet)
        if (nomComplet === null) {
            console.log("Nom invalide")
        }
    } while (nomComplet === null)

    do {
        ville = prompt("Entrer la ville d utilisateur : ")
        ville = validCity(ville)
        if (ville === null) {
            console.log("Ville invalide")
        }
    } while (ville === null)

    do {
        jour = prompt("Entrer un jour")
        jour = validDay(jour)
        if (jour === null) {
            console.log("Le jour doit etre compris entre 1 et 7 ")
        }
    } while (jour === null)

    do {
        exercicesTermines = prompt("Entrer le total des jours :")
        exercicesTermines = validExercises(exercicesTermines)
        if (exercicesTermines === null) {
            console.log("Le nombre d exercices doit etre entre 0 et 20")
        }
    } while (exercicesTermines === null)

    do {
        challengeTermine = prompt("Challenge complet ? :[Y / n]")
        challengeTermine = challengeTermine.trim().toLowerCase()
        if (challengeTermine !== "y" && challengeTermine !== "n") {
            console.log("Veuillez repondre par |Y| ou |N|")
        }
    } while (challengeTermine !== "y" && challengeTermine !== "n")

    const totalExercices = 20
    const Allstats = {jour: jour, exercicesTermines: exercicesTermines, totalExercices: totalExercices, challengeTermine: challengeTermine === "y"}
    const user = {id: idMan, nomComplet, ville}
    user.resultats = [Allstats]
    userarray.push(user)
}

function searchById() {
    const idRecherche = prompt("entrer id : ")
    const resultats = userarray.filter(element => element.id === Number(idRecherche))

    if (resultats.length === 0) {
        console.log("Apprenant invalide")
    } else {
        for (const element of resultats) {
            console.log(element)
        }
    }
    return resultats
}

function searchByName() {
    const nomRecherche = prompt("Entrer un nom : ")
    const resultats = userarray.filter(element => element.nomComplet.toLowerCase().includes(nomRecherche.trim().toLowerCase()))

    if (resultats.length === 0) {
        console.log("Aucun apprenant trouvé");
    } else {
        for (const element of resultats) {
            console.log(element)
        }
    }
}
function sortByAlpha() {
    const apprenantsTries = [...userarray]

    apprenantsTries.sort((a, b) => {
        return a.nomComplet.localeCompare(b.nomComplet)
    })

    for (const apprenant of apprenantsTries) {
        console.log(apprenant.nomComplet)
    }
}

function filterByLevel() {
    const niveau = prompt("Entrer le niveau [Solide | En progression | A renforcer] : ").trim().toLowerCase()

    for (const apprenant of userarray) {
        let totalTermine = 0
        let totalPropose = 0

        for (const resultat of apprenant.resultats) {
            totalTermine += resultat.exercicesTermines
            totalPropose += resultat.totalExercices
        }

        let progression = 0

        if (totalPropose > 0) {
            progression = calculerProgression(totalTermine, totalPropose)
        }

        let niveauApprenant

        if (progression >= 80) {
            niveauApprenant = "solide"
        } else if (progression >= 50) {
            niveauApprenant = "en progression"
        }else{
            niveauApprenant = "a renforcer"
        }
        if (niveauApprenant === niveau) {
            console.log(apprenant.nomComplet + " : " + progression.toFixed(2) + "%")
        }
    }
}

while (true) {
    console.log(`=====SAS PROGRESS CONSOLE=====
1. Afficher le tableau de bord
2. Afficher la liste des apprenants
3. Ajouter un apprenant
4. Consulter un apprenant par identifiant
5. Ajouter ou modifier le résultat d'une journée
6. Rechercher un apprenant par nom
7. Filtrer les apprenants par niveau
8. Trier les apprenants par progression décroissante
9. Trier les apprenants par ordre alphabétique
0. Quitter
`)

    const choix = prompt("Votre choix : ")
    switch (choix) {
        case "3":
            addUser()
            break;

        case "1":
            displayDashboard()
            break;

        case "2":
            for (const element of userarray) {
                console.log("ID :", element.id)
                console.log("Nom :", element.nomComplet)
                console.log("Ville :", element.ville)
                console.log("Résultats :")

                for (const resultat of element.resultats) {
                    console.log(resultat)
                }
            }
            break;

        case "4":
            searchById()
            break;

        case "5":
            addOrUpdateResult()
            break;
        case "0":
            process.exit()
            break;

        case "6":
            searchByName()
            break;

        case "7":
            filterByLevel()
            break;

        case "8":
            sortByProgression()
            break;

        case "9":
            sortByAlpha();
            break;
    }
}
