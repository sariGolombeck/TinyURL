
import mongoose from 'mongoose';

const linkSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true },
  clicks: [{
    _id: { type: Number, required: true },
    insertedAt: { type: Date, required: true, default: Date.now },
    ipAddress: { type: String, required: true },
    targetParamValue: { type: String }  // הוספת שדה עבור ערך הפרמטר הממוקד
  }],
  targetParamName: { type: String },  // שם הפרמטר הממוקד
  targetValues: [{
    _id: false,
    name: { type: String },
    value: { type: String }
  }]
});

const Link = mongoose.model('Link', linkSchema);

export default Link;
