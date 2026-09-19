export function validName(nomComplet) {
    nomComplet = nomComplet.trim()

    if (nomComplet === "") {
        return null
    }

    return nomComplet.toLowerCase().split(" ").filter(element => element !== "").map(element => element[0].toUpperCase() + element.slice(1)).join(" ")
}


export function validCity(ville) {
    ville = ville.trim()

    if (ville === "") {
        return null
    }

    return ville.toLowerCase().split(" ").filter(element => element !== "").map(element => element[0].toUpperCase() + element.slice(1)).join(" ")
}


export function validDay(jour) {
    if (jour.trim() === "" || isNaN(jour) || Number(jour) < 1 || Number(jour) > 7) {
        return null;
    }
    return Number(jour)
}


export function validExercises(exercicesTermines) {
    if (exercicesTermines.trim() === "" || isNaN(exercicesTermines) || Number(exercicesTermines) < 0 || Number(exercicesTermines) > 20) {
        return null
    }
     return Number(exercicesTermines)
}

export function validChallenge(challenge){
    challenge = challenge.trim().toLowerCase()
    if (challenge !== "y" && challenge !== "n"){
        return null
    }
    return challenge === "y"
}