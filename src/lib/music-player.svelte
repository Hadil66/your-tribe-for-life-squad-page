<script>
  const playlist = [
    {
      artist: "charli xcx",
      title: "360",
      path: "/audio/360.mp3",
    },
    {
      artist: "Childish Gambino",
      title: "Redbone",
      path: "/audio/redbone.mp3",
    },
    {
      artist: "hozier",
      title: "Work Song",
      path: "/audio/work-song.mp3",
    },
    {
      artist: "Tyler, the creator",
      title: "See you again",
      path: "/audio/see-you-again.mp3",
    },
  ];

  let playingState = "paused";
  let songPlayingIndex = 0;
  let song = null;

  function togglePlaying() {
    playingState === "paused" ? play() : pause();
  }

  function loadSong() {
    song = new Audio(playlist[songPlayingIndex].audio);
    song.volume = 0.2;
    song.play();
  }

  function play() {
    if (playingState === "playing") {
      pause();
    }

    playingState = "playing";
    loadSong();
  }

  function playSelectedSong(event) {
    const songIndex = +event.target.dataset.index;

    if (songIndex === songPlayingIndex) {
      songPlayingIndex = null;
      return pause();
    }

    songPlayingIndex = songIndex;
    play();
  }

  function pause() {
    playingState = "paused";
    song.pause();
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
