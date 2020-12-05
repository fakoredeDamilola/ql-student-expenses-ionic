const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    studentId: { type: String, required: true },
    reportId: { type: String, required: false },
    reportsManagerId: { type: String, required: false },
    expenseName: { type: String, required: true },
    expenseCost:{ type: String, required: true },
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

module.exports = mongoose.model('Expense', schema);