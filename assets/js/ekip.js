
// ekip.js — Création des équipes depuis la liste window.joueurs
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ ekip.js chargé");
});

// Fonction utilitaire pour mélanger un tableau (Fisher-Yates)
function melanger(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Fonction principale de création d'équipes
function creerEquipes() {
  const nbEquipesInput = document.getElementById("nbEquipes");
  const nbJoueursInput = document.getElementById("nbJoueursParEquipe");
  const zoneEquipes = document.getElementById("zone-equipes");
  zoneEquipes.innerHTML = ""; // Réinitialiser

  let joueurs = [...window.joueurs];
  if (joueurs.length === 0) {
    alert("Aucun joueur à répartir.");
    return;
  }

  joueurs = melanger(joueurs);

  let equipes = [];
  const nbEquipes = parseInt(nbEquipesInput.value);
  const nbJoueursParEquipe = parseInt(nbJoueursInput.value);

  if (nbEquipes > 0) {
    for (let i = 0; i < nbEquipes; i++) equipes.push([]);
    joueurs.forEach((joueur, index) => {
      equipes[index % nbEquipes].push(joueur);
    });
  } else if (nbJoueursParEquipe > 0) {
    const nbEquipesCalc = Math.ceil(joueurs.length / nbJoueursParEquipe);
    for (let i = 0; i < nbEquipesCalc; i++) equipes.push([]);
    joueurs.forEach((joueur, index) => {
      equipes[Math.floor(index / nbJoueursParEquipe)].push(joueur);
    });
  } else {
    alert("Veuillez remplir au moins un des deux champs.");
    return;
  }

  // 🔻 Affichage des équipes
  equipes.forEach((equipe, index) => {
    const bloc = document.createElement("div");
    bloc.classList.add("equipe-card");
    bloc.innerHTML = `
      <div class="equipe-header">
        <h3 contenteditable="true">Équipe ${index + 1}</h3>
        <button class="btn-suppr-ekip">Suppr Équipe</button>
        <button class="btn-elim">Éliminer</button>
      </div>
      <ul class="equipe-joueurs">
        ${equipe.map(joueur => `<li>${joueur} <button class="btn-suppr-joueur">Suppr</button></li>`).join("")}
      </ul>
      <div class="equipe-points">
        <button class="btn-minus">-</button>
        <span class="points">0</span>
        <button class="btn-plus">+</button>
      </div>
    `;
    zoneEquipes.appendChild(bloc);
  });

  // ✅ Activation suppression d’un joueur
  const boutonsSupprJoueur = document.querySelectorAll(".btn-suppr-joueur");
  boutonsSupprJoueur.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const li = e.target.closest("li");
      if (li) li.remove();
    });
  });
}

// Attacher l'écouteur de soumission du formulaire
const formEkip = document.getElementById("ekip-options");
if (formEkip) {
  formEkip.addEventListener("submit", function (e) {
    e.preventDefault();
    creerEquipes();
  });
}

console.log("✅ ekip.js prêt avec suppression des joueurs activée");
