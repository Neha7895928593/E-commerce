const bcrypt = require("bcrypt");

const hashpassword = async (Password) => {
  try {
    const hashedpassword = await bcrypt.hash(Password, 10);
    return hashedpassword;
  } catch (error) {
    console.log(error);
  }
};




module.exports = { hashpassword}
  
