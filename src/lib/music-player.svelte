<script>
  const playlist = [
    {
      artist: "charli xcx",
      title: "360",
      path: "./audio/360.mp3",
    },
    {
      artist: "Childish Gambino",
      title: "Redbone",
      path: "./audio/redbone.mp3",
    },
    {
      artist: "hozier",
      title: "Work Song",
      path: "./audio/work-song.mp3",
    },
    {
      artist: "Tyler, the creator",
      title: "See you again",
      path: "./audio/see-you-again.mp3",
    },
    {
      artist:"HYUKOH",
      title: "Surf boy",
      path: "./audio/surf-boy.mp3",
    },
    {
      artist:"K3",
      title: "Tele Romeo",
      path: "./audio/tele-romeo.mp3",
    },
    {
      artist:"Lady Gaga, Bruno Mars",
      title: "Die With A Smile",
      path: "./audio/die-with-a-smile.mp3",
    },
    {
      artist:"PSY",
      title: "Gangnam Style",
      path: "./audio/gangnam-style.mp3",
    },
    {
      artist:"The Beatles",
      title: "Hey Jude",
      path: "./audio/hey-jude.mp3",
    },
    {
      artist:"Yes-R",
      title: "Uit Elkaar",
      path: "./audio/uit-elkaar.mp3",
    },
    {
      artist:"Golden Ring Ensemble",
      title: "Karabuschka dance",
      path: "./audio/karabuschka-dance.mp3",
    },
    {
      artist:"Coldplay",
      title: "Yellow",
      path: "./audio/yellow.mp3",
    },
  ];

  let playingState = "paused";
  let songPlayingIndex = 0;
  let song = null;

  async function togglePlaying() {
    playingState === "paused" ? await play() : pause();
  }

  function loadSong() {
    song = new Audio(playlist[songPlayingIndex].path); // Fix here, use path instead of audio
    song.volume = 0.2;
  }

  async function play() {
    if (playingState === "playing") {
      pause();
    }

    playingState = "playing";
    loadSong();

    try {
      await song.play(); // Ensure play() resolves before continuing
    } catch (error) {
      console.error("Failed to play song:", error);
    }
  }

  function playSelectedSong(event) {
    const songIndex = +event.target.dataset.index;

    if (songIndex === songPlayingIndex) {
      return pause();
    }

    songPlayingIndex = songIndex;
    play();
  }

  function pause() {
    if (song) {
      playingState = "paused";
      song.pause();
    }
  }

  function previous() {
    if (songPlayingIndex <= 0) return;
    songPlayingIndex -= 1;
    play();
  }

  function next() {
    if (songPlayingIndex >= playlist.length - 1) return;
    songPlayingIndex += 1;
    play();
  }

  function playRandomSong () {
    let randomIndex = Math.floor(Math.random() * playlist.length);

    while (randomIndex === songPlayingIndex) {
        randomIndex = Math.floor(Math.random() * playlist.length);
    }

    songPlayingIndex = randomIndex;
    play();
  }

</script>

<div class="player">
  <div class="playlist">
    {#each playlist as song, index}
      <div class:playing={index === songPlayingIndex} class="song">
        <span>{index + 1}.</span>
        <button data-index={index} on:click={playSelectedSong}>
          {playingState === "playing" && index === songPlayingIndex
            ? "⏯️"
            : "▶️"}
        </button>
        <span>{song.title} - {song.artist}</span>
      </div>
    {/each}
  </div>

  <div class="controls">
    <button on:click={previous}>⏪️</button>
    <button on:click={togglePlaying}>
      {playingState === "paused" ? "▶️" : "⏯️"}
    </button>
    <button on:click={playRandomSong}>🔀</button>
    <button on:click={next}>⏩</button>
  </div>
</div>

<style>
  button {
    margin: 0;
    padding: 0;
    font-size: 1.4rem;
    font-weight: 700;
    background: none;
    border: none;
    cursor: pointer;
  }

  .player {
    color: hsl(220 20% 80%);
    background-color: hsl(220 20% 20%);
    border-radius: 8px;
  }

  .playlist {
    padding: 1rem;
  }

  .song {
    display: flex;
    align-items: center;
    padding: 1rem;
  }

  .song button {
    padding: 0 0.4rem;
  }

  .controls {
    display: flex;
    justify-content: center;
    gap: 24px;
    padding: 1rem 0;
    border-top: 1px solid hsl(220 20% 28%);
  }

  .controls button {
    font-size: 2rem;
  }

  .playing {
    color: hsl(220 20% 98%);
    background-color: hsl(220 20% 28%);
    border-radius: 8px;
  }
</style>
