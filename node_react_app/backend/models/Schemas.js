// this will define datastructure for tables, users, items, etc we are using

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // _id: ObjectId  (automaticlly created by mongoose everytime a doc is made)
    username: {type:String, required:true},
    fullname: {type: String, required:true},
    entryDate: {type:Date, default:Date.now}
});

const channelSchema = new Schema({
    // _id: ObjectId
    channel: {type:String, required:true},
    user: {type:Schema.Types.ObjectId, ref:'users'} // refrencing trough user id
    // SELECT FROM a INNER JOIN b ON a.id = b.id
});

const itemSchema = new Schema ({
    item: {type:String, reuired:true},
    price: {type:String, reuired:true},
    channel: {type:String, reuired:true},
    user:{type:Schema.Types.ObjectId, ref:'users'} // refrences user table tru id
});


const Users = mongoose.model('users', userSchema, 'users');
const Channels = mongoose.model('channels', channelSchema, 'channels')
const Items = mongoose.model('items', itemSchema, 'items')

const mySchemas = {'Users':Users, 'Channels':Channels, 'Items':Items};

// we can create multiple models of these schemas put it together as one and export it

module.exports = mySchemas;
