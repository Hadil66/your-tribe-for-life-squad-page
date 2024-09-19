<script>
  export let data;
  import MusicPlayer from '../lib/music-player.svelte';
  let selectedPerson = null;
  let showPopup = false;

  // funtie openen popup met data van persoon adhv gegeven id
    function openPopup(personId) {
    selectedPerson = data.persons.find(person => person.id === personId);
    showPopup = true;
  }

  // functie sluiten popup
  function closePopup() {
    showPopup = false;
  }

</script>
<h1>vinyl records</h1>

<main>
  <h2>pick a track</h2>
  <ul>
    {#each data.persons as person}
      <li>
        <button class="vinyl-cover">
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
              alt="{person.name}'s avatar" 
              width="50" 
              height="50" 
            />
          </div>
        </div>
      </li>
    {/each} 
  </ul>

  <MusicPlayer />

  <!-- condition om info popup te openen -->

  {#if showPopup && selectedPerson}
    <div class="popup">
      <div class="popup-content">
        <button class="close-button" on:click={closePopup}>×</button>
        <h3>Credits</h3>
        <div class="person-info">
          <img src={selectedPerson.avatar} alt="{selectedPerson.name}'s avatar" width="100" height="100"/>
          <div>
            <h4>{selectedPerson.prefix} {selectedPerson.name} {selectedPerson.surname}</h4>
            <p><strong>Github:</strong> <a href={`https://github.com/${selectedPerson.github_handle}`} target="_blank">{selectedPerson.github_handle}</a></p>
            <p><strong>Bio:</strong> {selectedPerson.bio}</p>
          </div>
        </div>
      </div>
    </div>
  {/if}

  <!--info button -->

  <button class="info-button" on:click={() => openPopup(48)}>i</button> <!-- При нажатии передаем id = 48 -->

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

   /* - - - info button - - - */

   .info-button {
    position: relative;
    width: 40px;
    height: 40px;
    background-color: transparent;
    color: rgb(0, 0, 0);
    border-radius: 50%;
    border: 1.5px solid black;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info-button:hover {
    background-color: black;
    color: white;
  }

  /* - - - - popup - - - - */

  .popup {
    z-index: 10000;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(34, 34, 34, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .popup-content {
    background: #333;
    padding: 20px;
    width: 80%;
    position: relative;
    color: white;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: none;
    border: none;
    font-size: 24px;
    color: white;
    cursor: pointer;
  }

  .person-info {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  /* mediaqueries */
  @media (max-width: 768px) {
    .popup-content {
      align-self: self-end;
      width: 100%;
      height: 70%;
    }

    .info-button {
      width: 20px;
      height: 20px;
      font-size: 17px;
    }
  }

</style>

