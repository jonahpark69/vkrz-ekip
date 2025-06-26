// script.js — Nettoyé pour le projet "Faire des ékip"
// Ce fichier gère uniquement la récupération des participants via CSV, Twitch et formulaire manuel
// Toutes les fonctionnalités de "tirage" ont été supprimées. Les données sont centralisées dans window.joueurs

let joueurs = [];
window.joueurs = joueurs; // Permet à ekip.js d'y accéder plus tard

// 📁 Récupération via CSV
const csvFileInput = document.getElementById("csvFileInput");
if (csvFileInput) {
  csvFileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      complete: function (results) {
        const data = results.data.filter((row) => row[0] && row[0].trim() !== "");
        window.joueurs = data.map((el) => el[0].trim());
        document.getElementById("number-participants-dom").textContent = window.joueurs.length;
      },
      error: function (err) {
        console.error("Erreur lors du parsing CSV:", err);
      },
    });
  });
}

// 💬 Récupération via formulaire manuel
const submitManualInputBtn = document.getElementById("submitManualInput");
const manualInput = document.getElementById("manualInput");
if (submitManualInputBtn && manualInput) {
  submitManualInputBtn.addEventListener("click", function (e) {
    e.preventDefault();
    const inputText = manualInput.value.trim();
    if (inputText === "") return;

    const noms = inputText
      .split(/\n|,/)
      .map((nom) => nom.trim())
      .filter((n) => n !== "");

    window.joueurs = noms;
    document.getElementById("number-participants-dom").textContent = window.joueurs.length;
  });
}

// 📡 Récupération via Twitch (via tmi.js)
const twitchBtn = document.getElementById("getTwitchParticipants");
if (twitchBtn) {
  twitchBtn.addEventListener("click", function () {
    const channel = prompt("Nom de la chaîne Twitch :");
    if (!channel) return;

    const client = new tmi.Client({
      channels: [channel],
    });

    let noms = new Set();

    client.connect();
    client.on("message", (channel, tags, message, self) => {
      if (!self) noms.add(tags.username);
    });

    // Arrête après 10 secondes et stocke les noms
    setTimeout(() => {
      client.disconnect();
      window.joueurs = Array.from(noms);
      document.getElementById("number-participants-dom").textContent = window.joueurs.length;
      alert(`${window.joueurs.length} participants récupérés via Twitch`);
    }, 10000);
  });
}

// 🛠️ Toutes les fonctionnalités de création d'équipes sont à développer dans ekip.js

