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
</script>

{#if person}
  <div class="person-detail">
    <h2>{person.name}</h2>
    <p>{person.bio}</p>
    <!-- Add more details about the person here -->
  </div>
{:else if personId}
  <p>Loading person details...</p>
{:else}
  <p>Select a person to view details.</p>
{/if}

<style>
  .person-detail {
    padding: 1rem;
    background-color: #f9f9f9;
    border-top: 1px solid #ccc;
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 40vh;
    transform: translateY(100%);
    transition: transform 0.3s ease-out;
    overflow: auto;
    box-shadow: 0 -4px 10px rgba(0, 0, 0, 0.2);
  }
</style>
