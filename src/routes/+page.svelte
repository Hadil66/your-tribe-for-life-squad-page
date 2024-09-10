<script>
    export let data;
    
    const fallBackAvatar = "/fallback-avatar/fallback-avatar.jpeg";

    function fallBackAvatarError(event) {
    console.log("Error loading image, switching to fallback:", fallBackAvatar);
    event.target.src = fallBackAvatar;
    event.target.onerror = null; // Prevents infinite loop if fallback also fails
  }

  
</script>
  
  <h1>squadpage</h1>
  
  <ul>
    {#each data.persons as person}
      <li>
        <img src={person.avatar || fallBackAvatar} 
        on:error={fallBackAvatarError} alt="Avatar" height="100px" width="100px"/>
        {person.name}
        {person.prefix}
        {person.surname}
      </li>
    {/each}
  </ul>
  
  
  <style>
      li {
          list-style: "";
      }
  </style>