'use strict';

const express = require('express');
const mongoose = require('mongoose');
const Note = require('../models/note');
const router = express.Router();

/* ========== GET/READ ALL ITEMS ========== */
router.get('/', (req, res, next) => {
  const searchTerm = req.query;
  let filter = {};

  if (searchTerm) {
    filter = {$or: [ {title: {$regex: searchTerm}}, {content: {$regex: searchTerm}} ]};
  }

  Note.find(filter).sort({ updatedAt: 'desc' })
    .then(results => res.json(results))
    .catch(err => {
      next(err);
    });
  
});

/* ========== GET/READ A SINGLE ITEM ========== */
router.get('/:id', (req, res, next) => {
  const {id} = req.params;
  Note.findById(id)
    .then(result => {
      if (result) {
        res.json(result);
      } else {
        next();
      }
    })
    .catch(err => {
      next(err);
    });
});

/* ========== POST/CREATE AN ITEM ========== */
router.post('/', (req, res, next) => {
  const {title, content} = req.body;
  const createNote = {title, content,};

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }

  Note.create(createNote)
    .then(results => {
      res.location(`${req.originalUrl}/${results.id}`).status(201).json(results);
    })
    .catch(err => next(err)); 

});

/* ========== PUT/UPDATE A SINGLE ITEM ========== */
router.put('/:id', (req, res, next) => {
  const {title, content} = req.body;
  const {id} = req.params;
  const updateNote = {};

  if (!title) {
    const err = new Error('Missing `title` in request body');
    err.status = 400;
    return next(err);
  }
  Note.findAndUpdateById(id, updateNote, {new: true}) 
    .then(results => {
      if(results) {
        res.json(results);
      }else {
        next();
      }
    })
    .catch(err => next(err));

});

/* ========== DELETE/REMOVE A SINGLE ITEM ========== */
router.delete('/:id', (req, res, next) => {
  const {id} = req.params;

  Note.findByIdAndRemove(id)
    .then(() => res.sendStatus(204))
    .catch(err => next(err)); 
});

module.exports = router;