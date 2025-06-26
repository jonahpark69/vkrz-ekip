<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Faire des ékip | VAINKEURZ</title>
  <link rel="shortcut icon" href="./assets/media/apple-touch-icon.png" type="image/x-icon" />
  <link rel="stylesheet" href="./assets/css/style.css" />
</head>

<body>
  <video autoplay muted loop class="background-video">
    <source src="./assets/media/vkrz-animated-bg.mp4" type="video/mp4" />
    Your browser does not support HTML5 video.
  </video>

  <main>
    <header>
      <div class="logo">
        <a href="#" onclick="window.location.reload();">
          <div class="llama-logo">
            <img src="./assets/media/logo-vkrz-without-eyes.png" alt="VAINKEURZ Logo" />
            <div class="llama-eye" id="left-eye">
              <img src="./assets/media/eye.png" alt="Left Eye">
            </div>
            <div class="llama-eye" id="right-eye">
              <img src="./assets/media/eye.png" alt="Right Eye">
            </div>
          </div>
        </a>
      </div>

      <div class="title">
        <h1>Faire des ékip</h1>
        <p class="sub-header-text">
          Prêts pour la compétition ?
          <img src="./assets/media/crossed-fingers.png" alt="" />
        </p>
      </div>

      <div class="stats">
        <div class="loader d-none"></div>
        <p>
          <strong id="number-participants-dom">0</strong><br />
          Participants
        </p>
      </div>
    </header>

    <section id="choice">
      <!-- Import CSV -->
      <div class="import">
        <input type="file" name="csvFileInput" accept=".csv" id="csvFileInput" class="d-none" />
        <p>Liste CSV à une colonne</p>
        <label for="csvFileInput" class="button csvFileInputLabel">Importer une liste</label>
      </div>

      <!-- Twitch participants -->
      <div class="separation">
        <div class="twitch twitch-participants">
          <div class="icon"></div>
          <button class="button" class="title" id="getTwitchParticipants">
            Récupérer les participants d'un Live Twitch
          </button>
        </div>
      </div>

      <!-- Manual input -->
      <div id="manualInputContainer">
        <form>
          <textarea id="manualInput" rows="4" cols="50" placeholder="Ecrivez les noms des participants ici..." required></textarea><br>
          <button class="button" id="submitManualInput">Valider les participants</button>
        </form>
      </div>
    </section>

<section id="form-creer-ekip" class="ekip-form-block">
  <h2>Créer des ékip</h2>
  <form id="ekip-options">
    <label for="nbEquipes">Nombre d’équipes :</label>
    <input type="number" id="nbEquipes" placeholder="Ex: 2" />

    <p class="ou-text">OU</p>

    <label for="nbJoueursParEquipe">Nombre de joueurs par équipe :</label>
    <input type="number" id="nbJoueursParEquipe" placeholder="Ex: 3" />

    <button type="submit" class="vkrz-btn">Créer les ékip</button>
  </form>
</section>






    <!-- Zone d'affichage des équipes -->
    <section id="zone-equipes">
      <!-- JS remplira ici dynamiquement les ékip -->
    </section>

  </main>

  <script src="./assets/js/papaparse.min.js"></script>
  <script src="./assets/js/tmi.min.js"></script>
  <script src="./assets/js/script.js"></script>
  <script src="./assets/js/ekip.js" defer></script>
  <script type="module">
    import WatchingYou from './assets/js/watching-you.js';
    const options = { power: 5 };
    const leftEyeWatcher = new WatchingYou('#left-eye', options);
    const rightEyeWatcher = new WatchingYou('#right-eye', options);
    leftEyeWatcher.start();
    rightEyeWatcher.start();
  </script>
</body>

</html>