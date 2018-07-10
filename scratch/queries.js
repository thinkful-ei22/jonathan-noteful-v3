'use strict';

const mongoose = require('mongoose');
const { MONGODB_URI } = require('../config');

const Note = require('../models/note');

mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
  .then(() => {
    const searchTerm = 'cats';
    let filter = {};

    if (searchTerm) {
      filter = {$or: [ {title: {$regex: searchTerm}}, {content: {$regex: searchTerm}} ]};
    }

    return Note.find(filter).sort({ updatedAt: 'desc' });
  })    
  .then(results => {
    console.log(results);
  })
  .then(() => {
    return mongoose.disconnect();
  })
  .catch(err => {
    console.error(`ERROR: ${err.message}`);
    console.error(err);
  });

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(() => {
//     return Note
//       .findById('000000000000000000000001')
//       .then(results => {
//         console.log(results);
//       })
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .catch (err => {
//         console.error(`ERROR: ${err.message}`);
//         console.error(err);
//       });
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(() => {
//     return Note
//       .create({
//         title: 'Hello, hello',
//         content: 'Gibberish, gibberish, gibberish'
//       })
//       .then(results => {
//         console.log(results);
//       })
//       .then(() => {
//         mongoose.disconnect();
//       })
//       .catch(err => {
//         console.error(`ERROR: ${err.message}`);
//         console.error(err);
//       });
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(() => {
//     return Note
//       .findByIdAndUpdate('5b4503233eea5c81299f76a8', {
//         'title': 'Goodbye, my hello',
//         'content': 'More and more gibberish',
//       }, {upsert: true, new: true})
//       .then (results => {
//         console.log(results);
//       })
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .catch(err => {
//         console.error(`ERROR: ${err.message}`);
//         console.error(err);
//       });
//   });

// mongoose.connect(MONGODB_URI, { useNewUrlParser: true })
//   .then(() => {
//     return Note
//       .findByIdAndRemove('5b4503233eea5c81299f76a8')
//       .then(result => {
//         console.log(result);
//       })
//       .then(() => {
//         return mongoose.disconnect();
//       })
//       .catch(err => {
//         console.error(`ERROR: ${err.message}`);
//         console.error(err);
//       });
//   });