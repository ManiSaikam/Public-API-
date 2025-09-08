import Pokedex from 'pokedex-promise-v2'
const P = new Pokedex()

const name = process.argv[2] || 'pikachu'

function getPokemon_Callbacks(pokeName, cb) {
  P.getPokemonByName(pokeName, (response, error) => {
    if (!error) cb(null, response)
    else cb(error)
  })
}

function getPokemon_Promises(pokeName) {
  return P.getPokemonByName(pokeName)
}

async function getPokemon_Async(pokeName) {
  const data = await P.getPokemonByName(pokeName)
  return data
}

console.log(`\nFetching "${name}" using three styles…\n`)

getPokemon_Callbacks(name, (err, data) => {
  console.log('=== Callbacks ===')
  if (err) {
    console.error('Error:', err.message || err)
  } else {
    console.log({ name: data.name, id: data.id, height: data.height, weight: data.weight })
  }

  console.log('\n=== Promises (.then) ===')
  getPokemon_Promises(name)
    .then(d => {
      console.log({ name: d.name, id: d.id, base_experience: d.base_experience })
    })
    .catch(e => console.error('Error:', e.message || e))
    .finally(async () => {
      console.log('\n=== Async/Await ===')
      try {
        const d = await getPokemon_Async(name)
        console.log({
          name: d.name,
          types: d.types.map(t => t.type.name),
          abilities: d.abilities.map(a => a.ability.name)
        })
      } catch (e) {
        console.error('Error:', e.message || e)
      }
      console.log('\nDone.\n')
    })
})
