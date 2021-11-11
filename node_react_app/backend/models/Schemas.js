// this will define datastructure for tables, users, items, etc we are using

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    // _id: ObjectId  (automatically created by mongoose everytime a doc is made)
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, requierd: true },
},{timestamps:true});

const channelSchema = new Schema({
    // _id: ObjectId
    channel: {type: String, required: true},
    user: {type: Schema.Types.ObjectId, ref: 'users'} // referencing through user id
    // SELECT FROM a INNER JOIN b ON a.id = b.id
});
const itemSchema = new Schema ({
    item: {type: String, required: true},
    description: {type: String, requierd: true},
    etsyPrice: {type: String, required: false},
    ebayPrice:{type:String, required:false},
    user:{type: Schema.Types.ObjectId, ref: 'users'} // references user table tru id
},{timestamps:true});


const Users = mongoose.model('users', userSchema, 'users');
const Channels = mongoose.model('channels', channelSchema, 'channels')
const Items = mongoose.model('items', itemSchema, 'items')

const mySchemas = {'Users': Users, 'Channels': Channels, 'Items': Items};

// we can create multiple models of these schemas put it together as one and export it

module.exports = mySchemas;
