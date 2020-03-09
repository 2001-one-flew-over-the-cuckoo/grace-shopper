'use strict'

const db = require('../server/db')
const {User, Product, Order, Product_Order} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  const users = await Promise.all([
    User.create({
      email: 'cody@email.com',
      password: '123',
      name: 'Cody',
      address: '123 Main St.',
      phone: 1234567890,
      isAdmin: true
    }),
    User.create({email: 'murphy@email.com', password: '123'}),
    User.create({
      email: 'ron@email.com',
      password: '123',
      name: 'Ron',
      isAdmin: true
    }),
    User.create({email: 'leslie@email.com', password: '123'})
    //admin with empty cart and non-admin with populated cart
  ])
  console.log('Product', Product)
  const products = await Promise.all([
    Product.create({
      name: 'Get Well Box',
      price: 3000,
      description:
        'Our Get Well box is filled with all the love and goodies to help your friend recover.',
      image:
        'https://images.unsplash.com/photo-1571649857564-e0533116e8f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }),
    Product.create({
      name: 'Happy Birthday Box',
      price: 3000,
      description: 'Great for a long-distance BFF for their birthday.',
      image:
        'https://images.unsplash.com/photo-1577217534079-41d6bb68ac50?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    }),
    Product.create({
      name: 'Breakup Box',
      price: 3000,
      description:
        'Breakups are the worst. Be a good friend and get her a Breakup Box filled with everything she needs to feel better. ',
      image:
        'https://images.unsplash.com/photo-1519869491916-8ca6f615d6bd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }),
    Product.create({
      name: 'Housewarming Box',
      price: 3000,
      description:
        'Help your friend make her new house a home with our Housewarming Box.',
      image:
        'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }),
    Product.create({
      name: 'Money Moves Box',
      price: 3000,
      description:
        "Celebrate your friend's new career milestone with a box of everything she needs to make it from 9 to 5.",
      image: ''
    }),
    Product.create({
      name: 'Engagement Box',
      price: 3000,
      description: '.',
      image: ''
    }),
    Product.create({
      name: "Galentine's Day Box",
      price: 3000,
      description:
        "Show your gal pals how much you love them with our Galentine's Day Box.",
      image:
        'https://images.unsplash.com/photo-1513075675228-cffb4b1b91f7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }),
    Product.create({
      name: "Treat Yo' Self Box",
      price: 3000,
      description:
        "Adulting is hard, you've earned this box filled with bath bombs, sheet masks, candles and everything you need to unwind.",
      image:
        'https://images.unsplash.com/photo-1572501322283-bdbe6d4dad6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60'
    }),
    Product.create({
      name: 'Hangover Box',
      price: 3000,
      description:
        "You will thank your past self for having ordered this box of pain killers, sports drinks, and snacks for when you can't make it off the couch.",
      image: ''
    }),
    Product.create({
      name: 'Couch Potato Box',
      price: 3000,
      description:
        'Get yourself this box filled with popcorn and movie snacks for your next binge-watching session.',
      image: ''
    }),
    Product.create({
      name: 'Bon Voyage Box',
      price: 3000,
      description:
        'Goodbyes are tough. Send your friend off on their next adventure with our Bon Voyage Box.',
      image: ''
    }),
    Product.create({
      name: 'Socks',
      price: 1000,
      image:
        'https://images.unsplash.com/photo-1580973757787-e22cdecb9cd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description: 'Everyone loves warm, comfy socks!'
    }),
    Product.create({
      name: 'Notebook',
      price: 1500,
      image:
        'https://images.unsplash.com/photo-1528938102132-4a9276b8e320?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description: 'A place to record all your brilliant thoughts.'
    }),
    Product.create({
      name: 'Plant',
      price: 2000,
      image:
        'https://images.unsplash.com/photo-1578704694513-08946e996642?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description: 'Test out your green thumb '
    }),
    Product.create({
      name: 'Truffles',
      price: 1500,
      image:
        'https://images.unsplash.com/photo-1551529834-d47a1c10ecde?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description:
        'Get yourself or your friend a decadent treat that is sure to make you feel better.'
    }),
    Product.create({
      name: 'Beer flight',
      price: 3500,
      image:
        'https://images.unsplash.com/photo-1572501322283-bdbe6d4dad6d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description: 'The perfect gift for the beer lover in your life.'
    }),
    Product.create({
      name: 'Wine tasting',
      price: 3500,
      image:
        'https://images.unsplash.com/photo-1493112360111-f1490417763f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description: 'The perfect gift for the wine lover in your life.'
    }),
    Product.create({
      name: 'Sweetheart Box',
      price: 3000,
      image:
        'https://images.unsplash.com/photo-1485376026565-375e3f216bbd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60',
      description: 'Get this box for the love interest in your life.'
    })
  ])
  const order = await Order.create()
  await order.addProducts(products)
  await users[0].addOrder(order)

  console.log(`seeded ${users.length} users`)
  console.log(`seeded ${products.length} users`)
  console.log('seeded order')
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
