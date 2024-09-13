<script>
  import fallBackAvatar from '/fallback-avatar/Dark-side-of-the-moon.jpeg'

  export let data;
  export let avatar = fallBackAvatar

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
          <img src={person.avatar || fallBackAvatar} on:error={fallBackAvatarError} alt="{person.name}'s avatar" width="150" height="150" />
        </button>
        <div class="vinyl-record">
          <div class="vinyl-record-label">
            <img src={person.avatar} alt="{person.name}'s avatar" width="50" height="50" />
          </div>
        </div>
      </li>
    {/each} 
  </ul>
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
    gap: 2em 4em;
  }

  li {
    display: flex;
    flex-direction: row;
    align-items: center;
    list-style:"";
  }

  button.vinyl-cover {
    border: none;
    background-color: transparent;
    cursor: pointer;
    z-index: 2;
  }

  img {
    border-radius: 0.25em;
    box-shadow: 0 0.5em 0.7em #3b3a3a;
    object-fit: cover;

  }

  .vinyl-record {
    position: relative;
    width: 9em;
    height: 9em;
    background: repeating-radial-gradient(circle at center, #181717, #0f0f0f 3%, #000 4%);
    box-shadow: 0 0.5em 0.7em #3b3a3a;
    border-radius: 50%;
    border: 0.3em solid #000;
    z-index: 1;
    margin-left: -4em;
  }

  .vinyl-record-label img {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    border: 0.1em solid #000;
    box-shadow: none;
  }
</style>
