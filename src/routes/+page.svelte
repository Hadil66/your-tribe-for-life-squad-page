<script>
    export let data;

    import MusicPlayer from '../lib/music-player.svelte';
    import fallBackAvatar from '/fallback-avatar/dark-side-of-the-moon.jpeg';
    export let avatar = fallBackAvatar;


  function fallBackAvatarError(event) {
    console.log('Avatar could not be found, it will be replaced');
    event.target.src = avatar;
  }
</script>

<h1>vinyl records</h1>

<main>
  <h2>pick a track</h2>
  <ul>
    {#each data.persons as person}
      <li>
        <button class="vinyl-cover">
          <img src={person.avatar || fallBackAvatar} on:error={fallBackAvatarError} class="album-cover" alt="{person.name}'s avatar" width="150" height="150" />
        </button>
        <div class="vinyl-record">
          <div class="vinyl-record-label">
            <img src={person.avatar || fallBackAvatar} alt="{person.name}'s avatar" width="50" height="50" />
          </div>
        </div>
      </li>
    {/each} 
  </ul>

  <MusicPlayer />

</main>



<style>

  h1 {
    display: flex;
    justify-content: center;
    margin: 1rem;
  }

  main {
    margin: 2em;
  }

  h2 {
    margin: 1em;
  }

  ul {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    gap: 2em 8em;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style:"";
    position: relative;
  }

  .vinyl-cover {
    border: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 2;
  }

  .album-cover {
    z-index: 2;
  }          

  img {
    border-radius: 0.25em;
    box-shadow: 0 0.5em 0.8em var(--primary-dark-color);
        object-fit: cover
  }

  .vinyl-record {
    --ratio-vinyl: 7em;
    width: var(--ratio-vinyl);
    height: var(--ratio-vinyl);

    position: absolute;

    background: repeating-radial-gradient(circle at center, #1a1919, #1d1c1c 3%, var(--primary-dark-color) 4%);
    border-radius: 50%;
    border: 0.3em solid var(--primary-dark-color);
    transition: transform 3s linear, left 1.5s linear;
  }

  /*  hover album cover*/
  .vinyl-cover:hover + .vinyl-record {
    transform: rotate(360deg);
    left: 6.5em;
  }

  /* unhover image */
  .vinyl-cover + .vinyl-record {
    transform: rotate(0deg);
    left: 0;
  }

  .vinyl-record-label img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 0.1em solid var(--primary-dark-color);
    box-shadow: none;
  }
</style>
