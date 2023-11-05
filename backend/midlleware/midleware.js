const jwt = require('jsonwebtoken');
const SECRET_KEY = require('../key');
// const Customer = require('../modal/Customer');

async function checkLogin(req, res, next) {
  try {
    const token = req.header('Authorization');
    console.log(token);

    if (!token) {
      res.status(401).json({
        message: 'Not Logged In'
      });
    } else {
      const tokenWithoutBearer = token.replace('Bearer ', '');

      const userData = jwt.verify(tokenWithoutBearer, SECRET_KEY);
         

      if (!userData) {
        res.status(401).json({
          message: 'Looks like there was an error while verifying the token'
        });
      } else {
        next();
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: 'There was an error while interacting with the database'
    });
  }
}
// const checkAdmin = async (req, res, next) =>{
//     try {
//         const user= await Customer.findById(req.)
        
//     } catch (error) {
//         console.log(error)
        
//     }


// const Customer = require('../modal/Customer');
// const jwt = require('jsonwebtoken');
// const SECRET_KEY = require('../key')

// async function checkLogin(req, res, next) {
//   try {
//     const token = req.header('Authorization');
//      console.log(token)

//     if (!token) {
//       res.status(401).json({
//         message: 'Not Logged In'
//       });
//     } else {
      
//       const tokenWithoutBearer = token.replace('Bearer ', '');

//       const userData = jwt.verify(tokenWithoutBearer, SECRET_KEY.SECRET_KEY);

//       if (!userData) {
//         res.status(401).json({
//           message: 'Looks like there was an error while verifying the token'
//         });
//       } else {
//         next();
//       }
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({
//       message: 'There was an error while interacting with the database'
//     });
//   }
// }

// async function isAdmin(req,res,next) {
//     const user=await Customer.findOne(req.user._id)
//     if (!user || Customer.isAdmin==false){
//         return res.status(401).send({
//             mesage:"Authorized"
//         })
    

//     }
//     else{
//         next();   
//     }
//     }  
module.exports={checkLogin}