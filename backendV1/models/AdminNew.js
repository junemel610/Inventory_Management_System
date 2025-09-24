const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AdminSchema = new Schema({
    email: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    fullname: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
});

AdminSchema.methods.comparePassword = async function (password) {
    if (!password) throw new Error('The password cannot be compared because it is missing.');
  
    try {
      return this.password === password;
    } catch (error) {
      console.log('Error while comparing password.', error.message);
      return false; // Return false if an error occurs during comparison
    }
  };
  

AdminSchema.statics.isThisEmailInUse = async function(email) {
    if(!email) throw new Error('Invalid Email')
    try {
        const user = await this.findOne({email: email})
        if(user) return false

        return true;
    } catch (error) {
        console.log('Error inside isThisEmailInUse', error.message)
        return false
    }
    
};

module.exports = mongoose.model('Admin', AdminSchema);