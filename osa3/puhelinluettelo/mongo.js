const mongoose = require('mongoose')

if ( process.argv.length<3 ) {
  console.log('give password as argument')
  process.exit(1)
}

const getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-51e3m.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const noteSchema = new mongoose.Schema({
    id: Number,
    name: String,
    number: String,
})

const Person = mongoose.model('Person', noteSchema)

const person = new Person({
    id: getRandomInt(1000000),
    name: process.argv[3],
    number: process.argv[4],
})

if (process.argv.length === 3) {
    Person.find({}).then(result => {
        console.log(`phonebook:`)
        result.forEach(person => {
          console.log(`${person.name} ${person.number}`)
        })
        mongoose.connection.close()
      })
}
else {
    person.save().then(response => {
        console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`);
        mongoose.connection.close();
      })
}

