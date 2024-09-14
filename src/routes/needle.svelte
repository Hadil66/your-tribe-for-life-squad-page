<script>
    export let data
    
  let play = needle-play
  
  </script>
  
  <h1>squadpage</h1>
  
  <ul>
    {#each data.persons as person}
      <li>
        {person.name}
        {person.prefix}
        {person.surname}
        <!-- Naald --> 
        <svg class="needle" width="66" height="237" viewBox="0 0 66 237" fill="none" xmlns="http://www.w3.org/2000/svg">
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
        <button class="play-button" on:click={play}> Play </button>        
      </li>
    {/each}
  </ul>
  
  <style>
      li {
          list-style: "";
      }

      .needle {
        transition: transform 0.8s ease;
        transform-origin: top center;
      }

      .needle-play {
        transform: rotate(45deg);
      }
  </style>