<script>
  import { tick } from "svelte"; // Import tick for reactive updates

  export let data;
  import MusicPlayer from "../lib/music-player.svelte";
  import PersonDetail from "$lib/PersonDetail.svelte";

  let persons = [];
  let selectedPersonId = null;
  let musicPlayerRef;

  // Fetch the list of persons from Directus
  export async function load({ fetch }) {
    const url = "https://fdnd.directus.app/items/person/";
    const response = await fetch(url);
    const json = await response.json();
    persons = json.data;
  }

  // Function to handle the click, select the person, and play the music
  async function handlePersonClick(id) {
    selectedPersonId = id; // First, set the selected person

    await tick(); // Wait for the reactive update to take effect

    playPersonTrack(); // Then play the music
  }

  function playPersonTrack() {
    musicPlayerRef.playRandomSong(); // Play a random song from the music player
  }

  // Function to close the detail view
  function closePersonDetail() {
    selectedPersonId = null;
    musicPlayerRef.pause();
  }
</script>

<h1>vinyl records</h1>
<main>
  <h2>pick a track</h2>
  <ul>
    {#each data.persons as person}
      <li>
        <button
          class="vinyl-cover"
          on:click={() => handlePersonClick(person.id)}
        >
          <img
            src={person.avatar}
            class="album-cover"
            alt="{person.name}'s avatar"
            width="150"
            height="150"
          />
        </button>
        <div class="vinyl-record">
          <div class="vinyl-record-label">
            <img
              src={person.avatar}
              class="album-cover"
              alt="{person.name}'s avatar"
              width="50"
              height="50"
            />
          </div>
        </div>
      </li>
    {/each}
  </ul>

  {#if selectedPersonId}
    <!-- Correctly pass the personId prop to PersonDetail -->
    <div class="slide-in slide-in-active">
      <PersonDetail personId={selectedPersonId} />
      <button class="close-btn" on:click={closePersonDetail}>Close</button>
    </div>
    <MusicPlayer bind:this={musicPlayerRef} />
  {/if}
</main>

<style>
  /* slide in detail component */

  /* Add your styling here */
  .slide-in {
    height: 50vh;
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
    z-index: 100;

    position: fixed;
    bottom: 0;
    background-color: white;
    width: 100vw;
  }

  .slide-in-active {
    transform: translateY(0);
  }

  .close-btn {
    position: absolute;
    top: 1rem;
    left: 1rem;
    background-color: red;
    color: white;
    padding: 0.5rem;
    border: none;
    cursor: pointer;
  }

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
    list-style: "";
    position: relative;
    height: 150px;
    width: 150px;
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
    object-fit: cover;
  }

  .vinyl-record {
    --ratio-vinyl: 7em;
    width: var(--ratio-vinyl);
    height: var(--ratio-vinyl);

    position: absolute;

    background: repeating-radial-gradient(
      circle at center,
      #1a1919,
      #1d1c1c 3%,
      var(--primary-dark-color) 4%
    );
    border-radius: 50%;
    border: 0.3em solid var(--primary-dark-color);
    transition:
      transform 3s linear,
      left 1.5s linear;
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
