<script>
    export let data;
    import { onMount } from 'svelte';
    import Vibrant from 'node-vibrant';

    let gradientStyle = ''; // Standaard stijl voor de achtergrond

    // Functie om twee kleuren te halen uit een afbeelding
    const getColorsFromImage = async (imageUrl) => {
        try {
            const vibrant = new Vibrant(imageUrl);
            const palette = await vibrant.getPalette();
            // Haal twee meest vibrant kleuren op uit het palet
            const color1 = palette.Vibrant.hex;
            const color2 = palette.LightVibrant.hex;
            // Maak een gradient style
            gradientStyle = `background: linear-gradient(to bottom, ${color1}, ${color2});`;
        } catch (error) {
            console.error('Fout bij het ophalen van kleuren:', error);
        }
    };

    // Roep de functie aan zodra de component gemount is
    onMount(() => {
        // Controleer of er data is en de eerste persoon een avatar heeft
        if (data && data.persons && data.persons.length > 0 && data.persons[0].avatar) {
            const profileImageUrl = data.persons[0].avatar; // Gebruik het avatar van de eerste persoon
            getColorsFromImage(profileImageUrl);
        }
    });

    // De functie voor fallback afbeelding
    function fallBackAvatarError(event){
        console.log('Avatar could not be found, it will be replaced');
        event.target.src = avatar;
    }
</script>

<div class="gradient-background" style={gradientStyle}>
    <h1>squadpage</h1>

    <ul>
        {#each data.persons as person}
            <li>
                <img 
                src={person.avatar} 
                onerror={fallBackAvatarError}
                alt="{person.name}" 
                width="100px" 
                height="100px" 
                />
                {person.name} {person.prefix} {person.surname}
            </li>
        {/each}
    </ul>
    
</div> 


