<script>
  import { onMount } from 'svelte';
  let showPopup = false;
  let fadingOut = false;
  let slideIn = false; // Nieuwe variabele voor slide-in effect

  onMount(() => {
    // Toon de popup wanneer de website wordt geladen
    showPopup = true;
    
    // Wacht kort om de slide-in class toe te passen na het tonen van de popup
    setTimeout(() => {
      slideIn = true;
    }, 10); // 10ms is voldoende om de overgang te triggeren

    // Start een timer om de popup na 3 seconden te laten faden
    setTimeout(() => {
      fadingOut = true;
      slideIn = false; // Schakel de slide-in class uit tijdens het faden
      // Wacht op het einde van de fade-out (500ms) voordat je de popup definitief sluit
      setTimeout(() => {
        showPopup = false;
      }, 500);
    }, 3000);
  });
</script>

{#if showPopup}
  <div class="popup-overlay {fadingOut ? 'fade-out' : ''} {slideIn ? 'slide-in' : ''}">
    <section class="popup-content">
      <!-- Notificatie met Google-icoon en tekst -->
      <span class="material-symbols-outlined icon">notifications</span>
      <h2>Turn on sound for the best experience</h2>
    </section>
  </div>
{/if}

<style>
  .popup-overlay {
    position: fixed;
    top: 20px;
    right: 20px;
    width: 300px;
    background-color: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 20px;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    transition: transform 0.5s ease, opacity 0.5s ease;
    opacity: 1;
    transform: translateX(100%); /* Startpositie buiten het scherm */
  }

  /* Slide-in animatie */
  .slide-in {
    transform: translateX(0); /* Naar binnen schuiven */
  }

  /* Fade-out animatie */
  .fade-out {
    opacity: 0;
    transform: translateX(100%); /* Terug naar buiten schuiven */
  }

  .popup-content {
    display: flex;
    align-items: center;
    text-align: left;
  }

  /* Styling voor het icoon */
  .icon {
    font-size: 1.8em; /* Vergroot icoon voor betere zichtbaarheid */
    margin-right: 10px; /* Ruimte tussen icoon en tekst */
  }

  h2 {
    font-size: 1.2em;
    margin: 0;
  }
</style>
