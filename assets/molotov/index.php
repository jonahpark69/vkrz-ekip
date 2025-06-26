<?php
function env()
{
  $local_env = [
    'localhost',
    'localhost:8888'
  ];
  $local_proto = [
    'proto.vainkeurz.com',
  ];

  if (in_array($_SERVER['SERVER_NAME'], $local_env)) {
    return "local";
  }
  if (in_array($_SERVER['SERVER_NAME'], $local_proto)) {
    return "proto";
  }

  return "prod";
}

$base_tirage_url = env() === 'local' ? "http://localhost:8888/vkrz-tirage/assets/molotov/" : "https://tirage.vainkeurz.com/assets/molotov/";
?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Tirage au Sort pour Molotov Awards</title>

  <link
    rel="shortcut icon"
    href="../assets/media/apple-touch-icon.png"
    type="image/x-icon" />

  <link rel="stylesheet" href="<?= $base_tirage_url ?>css/style.css" />
  <link rel="stylesheet" href="<?= $base_tirage_url ?>css/molotov.css" />
</head>

<body>
  <audio id="winner-sound" class="d-none">
    <source src="../assets/media/winner-sound.mp3" type="audio/mpeg" />
  </audio>

  <audio id="slice-sound" class="d-none">
    <source src="../assets/media/slice-sound.mp3" type="audio/mpeg" />
  </audio>

  <main>
    <header>
      <div class="logo ">
        <a href="#" onclick="window.location.reload();">
          <div class="llama-logo">
            <img src="../assets/molotov/images/logo-award-twitch-2.png" alt="Molotov Awards Logo" />
          </div>
        </a>
      </div>

      <div class="title">
        <h1>Tirage au sort</h1>
        <p class="sub-header-text">
          Puisse le sort vous être favorable !
          <img src="../assets/media/crossed-fingers.png" alt="" />
        </p>
      </div>

      <div class="gift d-none">
        <img class="gift-img" width="180" alt="">
        <img class="gift-icon" src="https://vainkeurz.com/wp-content/themes/t-vkrz/assets/images/vkrz/gift.svg" alt="">
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

      <div class="import">
        <input
          type="file"
          name="csvFileInput"
          accept=".csv"
          id="csvFileInput"
          class="d-none" />

        <p>Liste CSV avec une colonne</p>
        <label for="csvFileInput" class="button csvFileInputLabel cta-molotov">Importer une liste</label>
      </div>

      <div class="twitch twitch-participants">
        <p class="separation">Tirage des viewers d'un live Twitch</p>
        <button class="button cta-molotov" id="getTwitchParticipants">
          Lancer les inscriptions
        </button>
      </div>
      </div>

      <!-- New manual input -->
      <div id="manualInputContainer">
        <form>
          <textarea id="manualInput" rows="4" cols="50" placeholder="Ecrivez les noms de tous les participants ici en passant à la ligne entre chaque." required></textarea><br>
          <button class="button cta-molotov" id="submitManualInput">Valider les participants</button>
        </form>
      </div>

      <div style="width: 100%;" class="d-none" id="divLancerTirage">
        <button class="button lancer-tirage-btn cta-molotov">
          Lancer le tirage
        </button>
        <button class="stop-listening-twitch d-none">
          ⚠️ Arrêter la récupération
        </button>
        <button class="button save-winner-btn cta-molotov d-none">
          Enregistrer le gagnant
        </button>
        <table id="csvRoot"></table>
        <table id="test-table">
          <tr>
            <?php
            if ($_SERVER["REQUEST_METHOD"] === "GET") {
              if (isset($_GET["mots"])) {
                $mots = $_GET["mots"];
                $motsArray = explode(",", $mots);
                echo "<input type=hidden id='hiddenInput' value='$mots'>";

                foreach ($motsArray as $mot) {
                  echo "<td>$mot</td>";
                }
              }

              if (isset($_GET["top"]) || isset($_GET["streamChannel"])) {
                echo "<input type=hidden id='getMethodInput'>";
              }
            }
            ?>
          </tr>
        </table>
      </div>
    </section>
  </main>

  <script>
    const env = "<?php echo env(); ?>";
    const API_BASE_URL = env === 'local' ? "http://localhost:8000/vkrz/" :
      env === 'proto' ? "https://apislim.vainkeurz.com/vkrz/" :
      "https://api.vainkeurz.com/vkrz/";
    const SITE_BASE_URL = env === 'local' ? "http://localhost:8888/vkrz-wp/" :
      env === 'proto' ? "https://proto.vainkeurz.com/" :
      "https://vainkeurz.com/";
    const TIRAGE_VAINKEUR_URL = env === 'local' ? "http://localhost:8888/vkrz-tirage/" :
      "https://tirage.vainkeurz.com/";
  </script>
  <script src="../assets/js/papaparse.min.js"></script>
  <script src="../assets/js/tmi.min.js"></script>
  <script src="../assets/js/script.js"></script>
</body>

</html>