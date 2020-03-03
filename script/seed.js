'use strict'

const db = require('../server/db')
const {User, Product} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({email: 'cody@email.com', password: '123'}),
    User.create({email: 'murphy@email.com', password: '123'})
  ])
  const products = await Promise.all([
    Product.create({
      name: 'Get Well Box',
      price: 30.0,
      description:
        'Our Get Well box is filled with all the love and goodies to help your friend recover.'
    }),
    Product.create({
      name: 'Happy Birthday Box',
      price: 30.0,
      description: 'Great for a long-distance BFF for their birthday.'
    }),
    Product.create({
      name: 'Breakup Box',
      price: 30.0,
      description:
        'Breakups are the worst. Be a good friend and get her a Breakup Box filled with everything she needs to feel better. '
    })
  ])

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} users`)
  console.log(`seeded successfully`)
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
