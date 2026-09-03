import mongoose from 'mongoose'

const serviceSchema = new mongoose.Schema({
    businessId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business",
      required: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
description: {
      type: String,
      trim: true,
    },
category: {
      type: String,
      required: true,
      trim: true,
    },
     price: {
      type: Number,
      required: true,
      min: 0,
    },
 estimatedDuration: {
      type: Number, 
      required: true,
    },
 images: [
      {
        type: String,
      },
    ],
  isActive: {
      type: Boolean,
      default: true,
    },
},
     {
    timestamps: true,
  }

)

export default mongoose.model('Service',serviceSchema)