# 🎮 Vainkeurz — Faire des ékip

Bienvenue dans **Faire des ékip**, un outil dynamique et fun conçu pour générer des équipes aléatoires à partir d'une liste de participants, avec animations, effets sonores et interface soignée inspirée de la DA Vainkeurz.

---

## 🚀 Fonctionnalités

✅ Import de participants :
- Ajout manuel
- Liste CSV
- Liste Twitch (option désactivée)

✅ Génération des équipes :
- Répartition aléatoire
- Choix du nombre d’équipes **ou** de joueurs par équipe
- Classement dynamique selon les points
- Tri automatique après chaque changement

✅ Gestion des équipes :
- Renommer une équipe
- Supprimer un joueur dans une équipe
- Marquer une équipe comme éliminée
- Supprimer une équipe
- Ajouter ou retirer des points

✅ Animations & UI :
- Animations de suspense (texte, cercle rotatif, apparition en cascade)
- Feu d’artifice confetti à la validation
- Sons de succès / échec / validation
- Affichage dynamique du nombre total de participants
- Interface responsive inspirée de la charte **VAINKEURZ**

---

## 📁 Structure du projet

📦 vkrz-ekip
├── index.php
├── ekip.js
├── style.css
├── script.js
├── papaparse.min.js
├── watching-you.js
├── assets/
│ ├── media/
│ │ ├── logo-vkrz-without-eyes.png
│ │ ├── eye.png
│ │ ├── crossed-fingers.png
│ ├── sounds/
│ │ ├── success-1.wav
│ │ ├── success-2.wav
│ │ ├── suspense-1.wav
│ │ └── suspense-2.wav
│ │ └── loose.wav
└── data/
└── participants.csv

yaml
Copier
Modifier

---

## 🎉 Astuces utilisateur

- 💾 Tu peux glisser-déposer un fichier CSV pour importer une liste en un clic.
- 🔊 Les sons sont joués uniquement lors des actions clés (ajout de point, élimination, validation).
- 📊 Le classement se met à jour automatiquement après chaque action.
- ✨ Le bouton "Trier les ékip" a été supprimé car le tri est désormais automatique.

---

## 📌 Dernière version

- ✅ Intégration complète des animations de suspense
- ✅ Sons festifs et effets de score
- ✅ Comportement fluide et responsive sur desktop
- 🔒 Prêt pour déploiement ou présentation

---

## 💡 À propos

Projet réalisé pour un test technique en alternance Full Stack, avec une forte emphase sur :
- la **créativité UX**
- la **fluidité du code**
- la **qualité des interactions**
- le **respect d’une direction artistique imposée**

---

## 🔗 Licence

Projet personnel. Droits réservés © 2025.
