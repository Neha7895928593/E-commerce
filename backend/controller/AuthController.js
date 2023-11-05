const Customer = require('../modal/Customer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {SECRET_KEY}= require('../key');


const registerController = async (req, res) => {
  
  try {
    const { FirstName, LastName, Email, Password, Phone, Address } = req.body;
    const existingUser = await Customer.findOne({ Email });
    

    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use.' });
    }

    if (!FirstName || !LastName || !Email || !Password || !Phone || !Address) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    function isValidEmail(email) {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      return emailPattern.test(email);
    }

    if (!isValidEmail(Email)) {
      return res.status(400).json({ message: 'Invalid Email.' });
    }

    function isValidPassword(password) {
      const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
      return passwordPattern.test(password);
    }

    if (!isValidPassword(Password)) {
      return res.status(400).json({ message: 'Invalid password.' });
    }

    const hashedPassword = await bcrypt.hash(Password, 10); // Hash the password

    const data = new Customer({
      FirstName,
      LastName,
      Email,
      Password: hashedPassword,
      Phone,
      Address,
    });

    const result = await data.save();

    return res.status(201).json({ message: 'User registration successful.', result });
   
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Registration failed. Please try again later.' });
  }
};
const loginController = async (req, res) => {
  try {
    const { Email, Password } = req.body;

    const user = await Customer.findOne({Email});

    if (!user) {
      return res.status(401).json({ message: 'Authentication failed. User not found.' });
    }

    try {
      const passwordMatch = await bcrypt.compare(Password, user.Password);

      if (passwordMatch) {
        const token = jwt.sign({ userId: user._id, email: user.Email }, SECRET_KEY, {
          expiresIn: '1h',
        });

        return res.status(200).json({ message: 'Authentication successful', token: token, });
       
      } else {
        return res.status(401).json({ message: 'Authentication Failed' });
      }
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Authentication failed. Please try again later.' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Login failed. Please try again later.' });
  }
};
const testfun=(req,res)=>{
  res.send("how are you")
}

module.exports = {loginController, registerController,testfun};



// const Customer = require('../modal/Customer'); 
// const {hashpassword} = require('../helper/authhelper');
// const {jwt} = require('jsonwebtoken');
// const SECRET_KEY=require('../key')
// const bcrypt=require('bcrypt')

// const registerController = async (req, res) => {
//   const { FirstName, LastName, Email, Password, Phone, Address } = req.body;
//   console.log(req.body)

//   try {
    
//     const existingUser = await Customer.findOne({ Email });

//     if (existingUser) {
//       return res.status(400).json({ message: 'Email already in use.' });
//     }

//     if (!FirstName || !LastName || !Email || !Password || !Phone || !Address) {
//       return res.status(400).json({ message: 'All fields are required.' });
//     }

    
//     function isValidEmail(Email) {
//       const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
//       return emailPattern.test(Email);
//     }

//     if (!isValidEmail(Email)) {
//       return res.status(400).json({ message: 'Invalid Email.' });
//     }

   
//     function isValidPassword(Password) {
//       const passwordPattern = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}$/;
//       return passwordPattern.test(Password);
//     }

//     if (!isValidPassword(Password)) {
//       return res.status(400).json({ message: 'Invalid password.' });
//     }

   
//     const hashedPassword = await hashpassword(Password); 

//     const data = new Customer({
//       FirstName,
//       LastName,
//       Email,
//       Password: hashedPassword,
//       Phone,
//       Address,
//     });

//     const result = await data.save();

//     return res.status(201).json({ message: 'User registration successful.', result });
//   } catch (error) {
//     console.log(error)
//     return res.status(500).json({ message: 'Registration failed. Please try again later.' });
//   }
// };
// module.exports = registerController;

// const loginController = async (req, res) => {
//   try {
//     const { Email, Password } = req.body;

//     const user = await Customer.findOne({ Email });

//     if (!user) {
//       return res.status(401).json({ message: 'Authentication failed. User not found.' });
//     }

//     try {
//       const passwordMatch = await bcrypt.compare(Password, user.Password);
//       console.log(passwordMatch)

//       if (passwordMatch) {
//         const token = jwt.sign({ userId: user._id, email: user.Email }, SECRET_KEY.SECRET_KEY, {
//           expiresIn: '1h',
//         });
        
//         return res.status(200).json({ message: 'Authentication successful', token: token });
//       } else {
//         return res.status(401).json({ message: 'Authentication Failed' });
//       }
//     } catch (error) {
//       console.error(error);
//       return res.status(500).json({ message: 'Authentication failed. Please try again later.' });
//     }
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: 'Login failed. Please try again later.' });
//   }
// };
// module.exports = loginController;


// // const logincontroller=async  (req,res) => {

// //   try {
// //     const {Email,Password} = req.body;
   
    
// //     const use = await Customer.findOne({Email});
// //     if (!use) {
// //       return res.status(401).json({ message: 'Authentication failed. User not found.' });
// //     }
// //     else{
// //       try {
// //         if (await bcrypt.compare(Password, use.Password )) {
// //           const token = jwt.sign({ userId: use._id, email: use.Email }, SECRET_KEY.SECRET_KEY, {
// //               expiresIn: '1h', 
// //              });
             
// //              return res.status(200).json({ message: 'Authentication successful', token:token });   
// //         }
// //         else{
// //           res.status(402).json({message:'Authentication Failed'})
// //         }
        
// //       } catch (error) {
// //         res.status(402).json({message:"errorbcrypt"})
        
// //       }
      
// //     }
   
// //   } catch (error) {
// //     return res.status(500).json({ message: 'Login failed. Please try again later.' });
// //   }
// // };

// // module.exports=logincontroller


