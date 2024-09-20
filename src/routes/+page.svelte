<script>
  import { tick } from "svelte"; // Import tick for reactive updates

  export let data;
  import MusicPlayer from "../lib/music-player.svelte";
  import PersonDetail from "$lib/PersonDetail.svelte";

  let persons = [];
  let selectedPersonId = null;
  let musicPlayerRef;
  let PersonDetailRef;

  // Fetch the list of persons from Directus
  export async function load({ fetch }) {
    const url = "https://fdnd.directus.app/items/person/";
    const response = await fetch(url);
    const json = await response.json();
    persons = json.data;
  }

  function playPersonTrack() {
    musicPlayerRef.playRandomSong(); // Play a random song from the music player
  }
  // Function to handle the click, select the person, and play the music
  async function handlePersonClick(id) {
    selectedPersonId = id; // First, set the selected person

    await tick(); // Wait for the reactive update to take effect

    playPersonTrack(); // Then play the music

    PersonDetailRef.togglePlay();
  }

  // Function to close the detail view
  function closePersonDetail() {
    selectedPersonId = null;
    musicPlayerRef.pause();
  }
</script>
<Notification />

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
              height="50">
          </div>
        </div>
      </li>
    {/each}
  </ul>

  <section class="popup">
    {#if selectedPersonId}
      <!-- Correctly pass the personId prop to PersonDetail -->
      <div class="slide-in slide-in-active">
        <PersonDetail bind:this={PersonDetailRef} personId={selectedPersonId} />
        <button class="close-btn" on:click={closePersonDetail}>Close</button>
      </div>
      <MusicPlayer bind:this={musicPlayerRef} />
    {/if}
  </section>

   <!-- Naald --> 
  <div class="recordplayer">
    <div class="vinyl-record" class:spinningVinyl={spinningVinyl} on:click="{togglePlay}">
    {#each data.persons as person}
      <div class="vinyl-record-label">
        <img 
          src={person.avatar}
          width="50" 
          height="50" 
        />
      </div>
    {/each} 
</main>

<style>
  /* slide in detail component */

  main {
    overflow: hidden;
  }

  /* Add your styling here */
  .slide-in {
    height: 70vh;
    border-radius: 10px;
    transform: translateY(110%);
    transition: transform 0.3s ease-out;

    position: fixed;
    bottom: 0;
    background-color: white;
    z-index: 100;
  }

  .slide-in-active {
    transform: translateY(0);
  }

  @media (min-width: 47em) {
    .slide-in {
      width: 80vw;
      justify-items: center;
    }
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
    --ratio-vinyl: 150px;
    width: var(--ratio-vinyl);
    height: var(--ratio-vinyl);
  }

  .vinyl-cover {
    border: none;
    background-color: bisque;
    cursor: pointer;
    z-index: 2;
  }

  .album-cover {
    z-index: 2;      
  
  img {
    border-radius: 0.25em;
    box-shadow: 0 0.5em 0.8em var(--primary-dark-color);
    object-fit: cover
  }

  .vinyl-record {
    --ratio-vinyl: 6em;
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

  .vinyl-cover:hover + .vinyl-record {
    transform: rotate(360deg);
    left: 6.5em;
  }

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

    /* RECORDPLAYER ANIMATION (FOR THE POP-UP) */

    .recordplayer {
      height: 22em;
      width: 25em;
      background: #403935;
      display: flex; 
      align-items: center; 
      justify-content: space-between; 
      padding: 1em;
      border-radius: 12px;
      margin: 1em;
    }
    
    .recordplayer .vinyl-record {
      height: 17em;
      width: 17em;
      justify-self: center;
    }
    
    .spinningVinyl {
      animation: spinning-record 3s linear infinite;
      height: 17em;
      width: 17em;
      justify-self: center;
      position: absolute;
      background: repeating-radial-gradient(circle at center, #1a1919, #1d1c1c 3%, var(--primary-dark-color) 4%);
      border-radius: 50%;
      border: 0.3em solid var(--primary-dark-color);
    }
    
    @keyframes spinning-record {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    
    .needle-container {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 25em;
    }
    svg {
    transition: transform 0.8s ease;
      transform-origin: top center;
    }
    
    .needlePlay {
      transform: rotate(45deg);
    }
    
    .button-container {
      display: flex;
      flex-direction: row; 
      gap: 0.5em;
      margin: 2em 0.5em 0.5em 0.5em;
      justify-content: flex-end;
    }
    
    .button1, .button2 {
      height: 1.2em;
      width: 1.2em;
      border-radius: 50%;
      background: #A6ABAD;
      margin: 0.1em;
    }
  </style>

