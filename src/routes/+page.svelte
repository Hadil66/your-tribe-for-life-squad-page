<script>
    export let data;
    import MusicPlayer from '../lib/music-player.svelte';
  </script>
  
  <h1>squadpage</h1>
  
  <main>
    <ul>
      {#each data.persons as person}
        <li>
          {person.name}
          {#if person.prefix}
          {person.prefix}
          {/if}
          {person.surname}
        </li>
      {/each}
    </ul>

    <MusicPlayer />

  </main>
  
  
  <style>
      li {
          list-style: "";
      }
  </style>