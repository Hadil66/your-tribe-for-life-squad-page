<script>
    import fallBackAvatar from '/fallback-avatar/Dark-side-of-the-moon.jpeg'

    export let data;
    export let avatar = fallBackAvatar

    function fallBackAvatarError(event) {
    console.log('Avatar could not be found, it will be replaced');
    event.target.src = avatar;
  }

</script>

<main>
  
  <h1>squadpage</h1>
  <ul>
    {#each data.persons as person}
      <li>
        <img 
        src={person.avatar || fallBackAvatar} 
        onerror={fallBackAvatarError} 
        alt="Avatar" 
        height="100px"
        width="100px"
        />

        {person.name}
        {person.prefix}
        {person.surname}
      </li>
    {/each}
  </ul>
</main>
  
  
  <style>
      li {
          list-style: "";
      }
  </style>