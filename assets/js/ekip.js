// ekip.js — version corrigée pour gestion correcte du son suspense
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ ekip.js corrigé pour bug de tri");
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

  joueurs = joueurs.sort(() => Math.random() - 0.5);

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

    // 👉 Scroll fluide vers les équipes
setTimeout(() => {
  const zoneEquipes = document.getElementById("zone-equipes");
  zoneEquipes.scrollIntoView({ behavior: "smooth", block: "start" });
}, 100);

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

    const pointsIndicateur = document.createElement("div");
    pointsIndicateur.className = "points-indicateur";
    pointsIndicateur.textContent = "0 pts";
    card.appendChild(pointsIndicateur);

    btnSuppr.addEventListener("click", () => card.remove());

  btnElim.addEventListener("click", () => {
  // Lecture du son loose
  const looseSound = new Audio("assets/sounds/loose.wav");
  looseSound.volume = 0.7;
  looseSound.play();

  // Animation d’élimination
  card.classList.toggle("elimine");
  label.classList.toggle("d-none");
  setTimeout(trierEquipes, 1000);
});


btnPlus.addEventListener("click", () => {
  // Lecture du son success
  const successSound = new Audio("assets/sounds/success-2.wav");
  successSound.volume = 0.6;
  successSound.play();

  // Couper le son après 1.2 secondes
  setTimeout(() => {
    successSound.pause();
    successSound.currentTime = 0;
  }, 5000); // ajuste cette valeur si besoin

  // Incrémentation du score
  let current = parseInt(score.textContent);
  score.textContent = current + 1;
  pointsIndicateur.textContent = `${current + 1} pts`;

  // Animation du score + mise à jour du classement
  animerScore(score);
  setTimeout(trierEquipes, 50);
});



    btnMinus.addEventListener("click", () => {
      let current = parseInt(score.textContent);
      if (current > 0) {
        score.textContent = current - 1;
        pointsIndicateur.textContent = `${current - 1} pts`;
        animerScore(score);
        setTimeout(trierEquipes, 50);
      }
    });

    document.getElementById("zone-equipes").appendChild(card);
    card.style.opacity = "0";
    setTimeout(() => {
      card.style.animationDelay = `${index * 0.8}s`;
      card.style.opacity = "";
      card.classList.add("equipe-card-anim");
    }, 50);
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

    const overlay = document.getElementById('suspense-overlay');

    const suspenseSound = new Audio('assets/sounds/suspense-1.wav');
    suspenseSound.loop = true;
    suspenseSound.volume = 0.6;

    const heartbeatSound = new Audio('assets/sounds/suspense-2.wav');
    heartbeatSound.loop = true;
    heartbeatSound.volume = 0.4;

    suspenseSound.play().catch(() => {});
    heartbeatSound.play().catch(() => {});
    overlay.classList.remove('suspense-hidden');

    setTimeout(() => {
      suspenseSound.pause();
      suspenseSound.currentTime = 0;
      heartbeatSound.pause();
      heartbeatSound.currentTime = 0;
      creerEquipes();
      overlay.classList.add('suspense-hidden');
    }, 6000);
  });
}

function animerScore(scoreElement) {
  scoreElement.classList.add("changed");
  setTimeout(() => {
    scoreElement.classList.remove("changed");
  }, 1000);
}

document.getElementById("submitManualInput").addEventListener("click", () => {

   const sonValidation = new Audio("assets/sounds/success-1.wav");
   sonValidation.volume = 0.6;
   sonValidation.play();



  // 🎆 Effet confettis
    confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#ff1475', '#ffffff'],
  });

  // 💬 Création du message
  const bulle = document.createElement("div");
  bulle.className = "bulle-message";
  bulle.textContent = "Les participants sont prêts !";
  document.body.appendChild(bulle);

  // Animation d’apparition
  setTimeout(() => bulle.classList.add("visible"), 100);

  // Suppression après 3 secondes
  setTimeout(() => {
    bulle.classList.remove("visible");
    setTimeout(() => bulle.remove(), 500);
  }, 3000);
});

document.getElementById("csvFileInput").addEventListener("change", () => {

   const sonValidation = new Audio("assets/sounds/success-1.wav");
  sonValidation.volume = 0.6;
  sonValidation.play();


  // 🔊 Son (si configuré)
  if (typeof sonValidation !== "undefined") {
    sonValidation.play();
  }

  // 🎆 Confettis
  confetti({
    particleCount: 150,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#ff1475', '#ffffff'],
  });

  // 💬 Bulle de message
  const bulle = document.createElement("div");
  bulle.className = "bulle-message";
  bulle.textContent = "Les participants sont prêts !";
  document.body.appendChild(bulle);

  setTimeout(() => bulle.classList.add("visible"), 100);

  setTimeout(() => {
    bulle.classList.remove("visible");
    setTimeout(() => bulle.remove(), 500);
  }, 3000);
});

window.addEventListener("load", () => {
  setTimeout(() => {
    window.scrollTo(0, 0);
  }, 10); // Petit délai pour forcer le scroll tout en haut
});


