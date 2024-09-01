// models/Investment.js

const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    investmentType: {
      type: String,
      required: [true, 'Please specify investment type'],
    },
    assetName: {
      type: String,
      required: [true, 'Please specify asset name'],
    },
    amountInvested: {
      type: Number,
      required: [true, 'Please specify amount invested'],
    },
    currentValue: {
      type: Number,
      required: [true, 'Please specify current value'],
    },
    purchaseDate: {
      type: Date,
      required: [true, 'Please specify purchase date'],
    },
    description: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Investment', investmentSchema);
