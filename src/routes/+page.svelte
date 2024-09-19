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

  let needlePlay = false
  let spinningVinyl = false

    function togglePlay() {
      needlePlay = !needlePlay
      spinningVinyl = !spinningVinyl
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

  <button class="info-button" on:click={() => openPopup(48)}>i</button> 

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

    </div>
    <div class="needle-container">
      <svg class:needlePlay={needlePlay} on:click="{() => needlePlay = !needlePlay}"width="66" height="237" viewBox="0 0 66 237" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g filter="url(#filter0_d_20_141)">
        <circle cx="33.2652" cy="56.7315" r="28" transform="rotate(0.1352 33.2652 56.7315)" fill="#A6ACAD" stroke="#3E3D3D"/>
        <path d="M23.9584 0.0568804L43.75 0.103582L43.702 20.4708L38.0472 20.4574L37.9912 44.2191L47.0388 44.2405L46.9934 63.4762L38.2285 63.4555L37.6601 184.526L41.0342 192.455L29.0752 228.07L14.9557 220.681L29.1633 190.73L29.178 184.506L29.202 174.323L29.4637 63.4348L21.547 63.4161L21.5924 44.1804L29.5091 44.1991L29.5651 20.4374L23.9104 20.4241L23.9584 0.0568804Z" fill="black"/>
        </g>
        <defs>
        <filter id="filter0_d_20_141" x="0.765137" y="0.0568848" width="65" height="236.013" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
        <feFlood flood-opacity="0" result="BackgroundImageFix"/>
        <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha"/>
        <feOffset dy="4"/>
        <feGaussianBlur stdDeviation="2"/>
        <feComposite in2="hardAlpha" operator="out"/>
        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_20_141"/>
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_20_141" result="shape"/>
        </filter>
        </defs>
      </svg>
      <ul class="button-container">
        <li class="button1"></li>
        <li class="button2"></li>
      </ul>
    </div>
  </div>

    <button class="play-button" on:click="{togglePlay}"> Play </button>  

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
    background-color: bisque;
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

