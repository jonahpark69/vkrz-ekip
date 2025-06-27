<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Faire des ékip | VAINKEURZ</title>
  <link rel="shortcut icon" href="./assets/media/apple-touch-icon.png" type="image/x-icon" />
  <link rel="stylesheet" href="./assets/css/style.css" />
  <script src="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"></script>

</head>

<body>




<div id="suspense-overlay" class="suspense-hidden">
  <div class="suspense-loader"></div>
  <div class="suspense-text">Préparation des ékip...</div>
</div>


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
          <img src="./assets/media/eye.png" alt="Left Eye" />
        </div>
        <div class="llama-eye" id="right-eye">
          <img src="./assets/media/eye.png" alt="Right Eye" />
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

  
</header>



<section id="choice">
  <div class="section-container">
    <div class="import-box">
      <p>Liste CSV à une colonne</p>
      <label for="csvFileInput" class="vkrz-btn">Importer une liste</label>
      <input type="file" name="csvFileInput" accept=".csv" id="csvFileInput" class="d-none" />
    </div>
    <div class="textarea-box">
      <label for="manualInput">Écrivez les noms des participants ici…</label>
      <textarea id="manualInput" rows="6" placeholder="Jean
Marie
Chloé…"></textarea>
    </div>
    <div class="btn-row">
      <button class="vkrz-btn" id="submitManualInput">Valider les participants</button>
    </div>
  </div>
</section>

    <!-- Zone d'affichage des équipes -->
    <section>
      <!-- JS remplira ici dynamiquement les ékip -->
    </section>

  </main>

  
<section id="ekip">
  <div class="ekip-section">
    <div class="ekip-form-block">
      <h2 class="ekip-title">Créer une équipe</h2>
      <form id="ekip-options">
        <div class="form-group">
          <label for="nbEquipes">Nombre d’équipes :</label>
          <input type="number" id="nbEquipes" placeholder="Ex : 3" />
        </div>
        <div class="form-group">
          <label for="nbJoueursParEquipe">Nombre de joueurs/équipe :</label>
          <input type="number" id="nbJoueursParEquipe" placeholder="Ex : 4" />
        </div>
        <div class="form-buttons">
          <button type="submit" class="vkrz-btn">Faire les ékip</button>
          
        </div>
      </form>
    </div>
    <div class="ekip-list" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px;" id="zone-equipes"></div>
  </div>
</section>




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