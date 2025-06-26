
// ekip.js — version avec bouton manuel "Trier les équipes"
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ ekip.js avec tri manuel chargé");
});

function melanger(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function creerEquipes() {
  const nbEquipesInput = document.getElementById("nbEquipes");
  const nbJoueursInput = document.getElementById("nbJoueursParEquipe");
  const zoneEquipes = document.getElementById("zone-equipes");
  zoneEquipes.innerHTML = "";

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

  equipes.forEach((equipe, index) => {
    const card = document.createElement("div");
    card.className = "equipe-card";

    const header = document.createElement("div");
    header.className = "equipe-header";

    const label = document.createElement("div");
    label.className = "equipe-label d-none";
    label.textContent = "Éliminée";

    const title = document.createElement("h3");
    title.contentEditable = true;
    title.textContent = `Équipe ${index + 1}`;

    const btnSuppr = document.createElement("button");
    btnSuppr.className = "btn-suppr-ekip";
    btnSuppr.textContent = "Suppr Équipe";

    const btnElim = document.createElement("button");
    btnElim.className = "btn-elim";
    btnElim.textContent = "Éliminer";

    header.append(label, title, btnSuppr, btnElim);
    card.appendChild(header);

    const ul = document.createElement("ul");
    ul.className = "equipe-joueurs";
    equipe.forEach(joueur => {
      const li = document.createElement("li");
      li.textContent = joueur + " ";
      const btnDel = document.createElement("button");
      btnDel.className = "btn-suppr-joueur";
      btnDel.textContent = "Suppr";
      btnDel.addEventListener("click", () => li.remove());
      li.appendChild(btnDel);
      ul.appendChild(li);
    });
    card.appendChild(ul);

    const pointDiv = document.createElement("div");
    pointDiv.className = "equipe-points";

    const btnMinus = document.createElement("button");
    btnMinus.className = "btn-minus";
    btnMinus.textContent = "-";

    const score = document.createElement("span");
    score.className = "points";
    score.textContent = "0";

    const btnPlus = document.createElement("button");
    btnPlus.className = "btn-plus";
    btnPlus.textContent = "+";

    pointDiv.append(btnMinus, score, btnPlus);
    card.appendChild(pointDiv);

    btnSuppr.addEventListener("click", () => card.remove());

    btnElim.addEventListener("click", () => {
      card.classList.toggle("elimine");
      label.classList.toggle("d-none");
    });

    btnPlus.addEventListener("click", () => {
      let current = parseInt(score.textContent);
      score.textContent = current + 1;
    });

    btnMinus.addEventListener("click", () => {
      let current = parseInt(score.textContent);
      if (current > 0) {
        score.textContent = current - 1;
      }
    });

    document.getElementById("zone-equipes").appendChild(card);
  });
}

function trierEquipes() {
  const zoneEquipes = document.getElementById("zone-equipes");
  const cartes = Array.from(zoneEquipes.querySelectorAll(".equipe-card"));

  cartes.sort((a, b) => {
    const elimA = a.classList.contains("elimine");
    const elimB = b.classList.contains("elimine");

    if (elimA !== elimB) return elimA ? 1 : -1;

    const pointsA = parseInt(a.querySelector(".points").textContent);
    const pointsB = parseInt(b.querySelector(".points").textContent);

    return pointsB - pointsA;
  });

  cartes.forEach(carte => zoneEquipes.appendChild(carte));
}

const formEkip = document.getElementById("ekip-options");
if (formEkip) {
  formEkip.addEventListener("submit", function (e) {
    e.preventDefault();
    creerEquipes();
  });
}

// Bouton manuel de tri
const boutonTri = document.getElementById("btn-trier");
if (boutonTri) {
  boutonTri.addEventListener("click", trierEquipes); 
}