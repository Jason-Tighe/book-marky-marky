const {model, Schema} = require('mongoose')

const bookmarkSchema = new Schema({
  name: String,
  url: String
}
)

module.exports = model('Bookmark', bookmarkSchema)
