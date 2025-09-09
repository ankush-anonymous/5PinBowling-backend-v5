const mongoose = require("mongoose");

const { Schema } = mongoose;

const BusinessHourSchema = new Schema(
  {
    day_no: { 
      type: Number, 
      required: true, 
      min: 1, 
      max: 7, 
      // alternative: enum: [1,2,3,4,5,6,7] 
    },
    day_name: { type: String, maxlength: 20, required: true },
    startTime: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ }, // HH:mm:ss
    endTime: { type: String, match: /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/ },
    offDay: { type: Boolean, default: false }
  },
  { timestamps: true }
);

module.exports = mongoose.model("BusinessHour", BusinessHourSchema);
