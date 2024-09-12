<script>
    export let data;
</script>
  
<h1>vinyl records</h1>

<main>
  <h2>pick a track</h2>
  <ul>
    {#each data.persons as person}
      <li>
        <button class="vinyl-cover">
          <img src={person.avatar} alt="{person.name}'s avatar" width="150" height="150" />
        </button>
        <div class="vinyl-record">
          <div class="vinyl-record-label">
            <img src={person.avatar} alt="{person.name}'s avatar" width="45" height="45" />
          </div>
        </div>
      </li>
    {/each} 
  </ul>
</main>



<style>
  @font-face {
  font-family: "Inter-Regular";
  src: url("../fonts/Inter_24pt-Regular.ttf");
  } 

  main {
    font-family: "Inter-Regular";
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
    gap: 2em 4em;
  }

  li {
    list-style:"";
    list-style: none;
  }

  button.vinyl-cover {
    border: none;
    background-color: transparent;
    cursor: pointer;
  }

  img {
    border-radius: 0.25em;
    box-shadow: 0 0.5em 0.8em #aaaaaa;
  }

  .vinyl-record {
    position: relative;
    width: 8em;
    height: 8em;
    background: repeating-radial-gradient(circle at center, #1a1919, #1d1c1c 3%, #000 4%);
    border-radius: 50%;
    border: 0.3em solid #000;
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