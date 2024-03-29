'use strict';
/**
*Module dependencies
*/
//-----------------------------------------------------------------------------
const
  mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');
//=============================================================================
/**
*User schema
*/
//-----------------------------------------------------------------------------
var UserSchema = mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true
      },
    phoneNumber: {
      type: String,
      unique: true,
      required: true
    }
  });
//=============================================================================
/**
*Create user model
*/
//-----------------------------------------------------------------------------
var UserModel = mongoose.model('User', UserSchema);
//==============================================================================
/**
*Export user model
*/
//-----------------------------------------------------------------------------
module.exports = UserModel;
//==============================================================================
