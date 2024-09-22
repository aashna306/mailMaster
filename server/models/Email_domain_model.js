import mongoose from "mongoose"

const emailSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function(v) {
        // Basic email validation
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

const Email = mongoose.model('Email', emailSchema);
module.exports = Email;

const domainSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  domainName: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

const Domain = mongoose.model('Domain', domainSchema);
export default Domain;
