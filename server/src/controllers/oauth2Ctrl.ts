// const User = require('../models/user')
// const tokenServices = require('../services/token-services')
// const bcrypt = require('bcrypt-nodejs')
// const config = require('../config/config')
// const {OAuth2Client} = require('google-auth-library');
// const client = new OAuth2Client(config.GOOGLE_CLIENT_ID);

// function verifyGoogleToken(req, res, next) {

// 	const tokenBearer = req.get("authorization")
//   let arr = tokenBearer.split(" ")
//   const token = arr[1]
//   // verify token
// 	async function verify() {
// 		const ticket = await client.verifyIdToken({
// 	      idToken: token,
// 	      audience: config.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
// 	      // Or, if multiple clients access the backend:
// 	      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
// 	  });
// 	  const payload = ticket.getPayload();
// 	  const userid = payload['sub'];
// 	  // If request specified a G Suite domain:
// 	  //const domain = payload['hd'];
// 		// console.log(payload);
// 		// console.log(userid);
// 		//coger datos de payload y guardarlo en base de datos como usuario
// 		const user = new User({
// 	    email: payload.email,
// 	    name: payload.given_name,
// 	    avatar: payload.picture,
// 	    provider: 'google',
// 			provider_id: payload.sub
// 	  })
// 		// check if user exists in database
// 	  User.findOne({ email: user.email }, function(err, existingUser) {
// 	    // case if error in search
// 	    if (err) {
// 	      console.log(`Error: ${err}`)
// 	      return res.status(500).send({
// 	        message: `Error al registrar usuario: ${err}`
// 	      })
// 	    }
// 	    // case if user not exists ==> register
// 	    if (!existingUser) {
// 	      console.log("No existe usuario con ese email, registrando...")
// 	      // saving user in DB
// 	      user.save((err) => {
// 	        if (err) return res.status(500).send({
// 	          message: `Error al crear el usuario: ${err}`
// 	        })
// 	        return res.status(200).send({
// 						message: 'Te has logueado correctamente',
// 	          token: tokenServices.createToken(user),
// 	          user: user
// 	        })
// 	      })
// 	    }
// 	    // case if user exists ==> RETURN Error
// 	    if (existingUser) {
// 	      console.log("Este email ya está registrado, no se puede continuar registrando. LOGUEANDO...")
// 				return res.status(200).send({
// 					message: 'Te has logueado correctamente',
// 					token: tokenServices.createToken(existingUser),
// 					user: existingUser
// 				})
// 	    }
// 	  })
// 	}
// 	verify().catch(console.error);
// }

// module.exports = {
//   verifyGoogleToken
// }
