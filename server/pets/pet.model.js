const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    petOwnerId: { type: String, required: true },
    propertyId: { type: String, required: false },
    petImage: { required: false },
    propertyManagerId: { type: String, required: false },
    petName: { type: String, required: true },
    species: { type: String, required: true },
    breed: { type: String, required: true },
    rating: { type: Number, required: false, default:3 },
    created: { type: Date, default: Date.now },
    updated: Date,
    images: { type:Array, required:false }
},

{ toJSON :{ virtuals :true},
  toObject :{ virtuals :true}
});


schema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // remove these props when object is serialized
        delete ret._id;
    }
});

module.exports = mongoose.model('Pet', schema);