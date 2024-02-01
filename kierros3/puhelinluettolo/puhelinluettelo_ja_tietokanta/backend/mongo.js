const mongoose = require('mongoose')
if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
  }
  console.log(process.argv.length)
  const password = process.argv[2]
  const url = `mongodb+srv://fullstack:${password}@cluster0.cxxyy2a.mongodb.net/?retryWrites=true&w=majority`
  mongoose.set('strictQuery', false)
  mongoose.connect(url)
  const personsSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  const Person = mongoose.model('Person', personsSchema)
  if (process.argv.length<4) {
    console.log("Phonebook")
    Person.find({}).then(result => {
        result.forEach(person => {
          console.log(person)
        })
        mongoose.connection.close()
      })
  }
  else if (process.argv.length<6){
    const name = process.argv[3]
    const number = process.argv[4]
    console.log(number)
    const person = new Person({
        name: name,
        number: number,
      })
      person.save().then(result => {
        console.log(`added ${person} to phonebook`)
        mongoose.connection.close()
      })
  }
  else {
    console.log("no valid arguments. connection closed")
    mongoose.connection.close()
  }