import fetchJson from "$lib/fetch-json"

export async function load() {
  const url = 'https://fdnd.directus.app/items/person/'

  const persons = await fetchJson(url);

  var personAvatars = persons.data.map(person => person.avatar);
  console.log(personAvatars);

  return {
    persons: persons.data
  }
}
