<script>
  export let personId = null;
  let person = null;

  // Fetch person details when the component is initialized or when personId changes
  $: if (personId) {
    fetchPersonDetails(personId);
  }

  async function fetchPersonDetails(id) {
    try {
      const url = `https://fdnd.directus.app/items/person/${id}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Failed to fetch person data");
      }
      const json = await response.json();
      person = json.data;
    } catch (error) {
      console.error(error);
      person = null; // Handle errors (e.g., show a message)
    }
  }

  let needlePlay = false;
  let spinningVinyl = false;

  function togglePlay() {
    needlePlay = !needlePlay;
    spinningVinyl = !spinningVinyl;
  }

  export { togglePlay };
</script>

{#if person}
  <section class="detail">
    <div class="recordplayer">
      <div class="vinyl-record" class:spinningVinyl>
        <div class="vinyl-record-label">
          <img src={person.avatar} width="50" height="50" />
        </div>
      </div>
      <div class="needle-container">
        <svg
          class:needlePlay
          width="66"
          height="237"
          viewBox="0 0 66 237"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g filter="url(#filter0_d_20_141)">
            <circle
              cx="33.2652"
              cy="56.7315"
              r="28"
              transform="rotate(0.1352 33.2652 56.7315)"
              fill="#A6ACAD"
              stroke="#3E3D3D"
            />
            <path
              class="needle"
              d="M23.9584 0.0568804L43.75 0.103582L43.702 20.4708L38.0472 20.4574L37.9912 44.2191L47.0388 44.2405L46.9934 63.4762L38.2285 63.4555L37.6601 184.526L41.0342 192.455L29.0752 228.07L14.9557 220.681L29.1633 190.73L29.178 184.506L29.202 174.323L29.4637 63.4348L21.547 63.4161L21.5924 44.1804L29.5091 44.1991L29.5651 20.4374L23.9104 20.4241L23.9584 0.0568804Z"
              fill="black"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_20_141"
              x="0.765137"
              y="0.0568848"
              width="65"
              height="236.013"
              filterUnits="userSpaceOnUse"
              color-interpolation-filters="sRGB"
            >
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="2" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_20_141"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_20_141"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
        <ul class="button-container">
          <li class="button1"></li>
          <li class="button2"></li>
        </ul>
      </div>
    </div>

    <section class="person-info">
      <h2>{person.name}</h2>
      <p>{person.bio}</p>
    </section>
  </section>
  <!-- Add more details about the person here -->
{:else if personId}
  <p>Loading person details...</p>
{/if}

<style>
  /* RECORDPLAYER ANIMATION (FOR THE POP-UP) */
  li {
    list-style: "";
  }

  svg {
    scale: 0.7;
  }

  .detail {
    display: grid;
    place-items: center;
    width: 100%;
  }

  .recordplayer {
    height: 15em;
    width: 18em;
    background: #403935;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1em;
    border-radius: 12px;
    margin: 1em;
  }

  .recordplayer .vinyl-record {
    height: 10em;
    width: 10em;
    justify-self: center;
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

  .spinningVinyl {
    animation: spinning-record 3s linear infinite;
    height: 17em;
    width: 17em;
    justify-self: center;
    position: absolute;
    background: repeating-radial-gradient(
      circle at center,
      #1a1919,
      #1d1c1c 3%,
      var(--primary-dark-color) 4%
    );
    border-radius: 50%;
    border: 0.3em solid var(--primary-dark-color);
  }

  @keyframes spinning-record {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  .needle-container {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 25em;
  }

  .needlePlay {
    transform-origin: 25%;
    animation: needlePlay 1s ease-in-out 0.5s forwards;
  }

  @keyframes needlePlay {
    to {
      transform: rotate(45deg);
      translate: -38px -30px;
    }
  }

  .button-container {
    display: flex;
    flex-direction: row;
    gap: 0.5em;
    justify-content: flex-end;
    margin-top: -2em;
  }

  .button1,
  .button2 {
    height: 1.2em;
    width: 1.2em;
    border-radius: 50%;
    background: #a6abad;
  }

  .person-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    margin-top: 1em;
    padding: 1em;
    max-width: 20em;
  }

  @media (min-width: 47em) {
    svg {
      scale: 1;
    }

    .recordplayer {
      height: 22em;
      width: 25em;
    }

    .recordplayer .vinyl-record {
      height: 17em;
      width: 17em;
      justify-self: center;
    }

    .recordplayer {
      margin-top: 2em;
    }

    .person-info {
      margin-top: 0em;
    }
  }
</style>
