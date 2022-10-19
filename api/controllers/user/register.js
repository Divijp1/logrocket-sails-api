const { renameTask } = require("grunt");

module.exports = {


  friendlyName: 'Register',


  description: 'Register user.',


  inputs: {
    fullName: {
      type: 'string',
      required: true,
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
      isEmail: true,
    },
    password: {
      type: 'string',
      required: true,
      minLength: 6,
    },
  },


  exits: {
    success: {
      statusCode: 201,
      description: 'New muna user created',
    },
    emailAlreadyInUse: {
      statusCode: 400,
      description: 'Email address already in use',
    },
    error: {
      description: 'Something went wrong',
    },

  },


  fn: async function (inputs,exits,env) {
    try{
      const newEmailAddress = inputs.email.toLowerCase();
      const token = await sails.helpers.strings.random('url-friendly');
      x= Date.now() + 24 * 60 * 60 * 1000;
      // console.log(x,typeof(x));
      console.log({token})
      let newUser = await User.create({
        fullName: inputs.fullName,
        email: newEmailAddress,
        password: inputs.password,
        emailProofToken: token,
        emailProofTokenExpiresAt:
         x
         
      }).fetch();
      console.log("before email")
      const confirmLink = `${sails.config.custom.baseUrl}/user/confirm?token=${token}`;
      const email = {
        to: newUser.email,
        subject: 'Confirm Your account',
        template: 'confirm',
        context: {
          name: newUser.fullName,
          confirmLink: confirmLink,
        },
      };
await sails.helpers.sendMail(email);
res= env.res
console.log("success")
// return env.res.redirect('/account_created.html')
//// return exits.success({
////   message: `An account has been created for ${newUser.email} successfully. Check your email to verify`,
//// });

    }
    catch (error){
        if (error.code === 'E_UNIQUE') {
        // return exits.emailAlreadyInUse({
        //   message: 'Oops :) an error occurred',
        //   error: 'This email address already exits',
        // });
        // return env.res.redirect('/error_emailalreadyexists.html')
}
// return exits.error({
//   message: 'Oops :) an error occurred',
//   error: error.message,
// });
// return env.res.redirect('/error_somethingwentwrong.html')

    }

    // All done.
   return console.log("DONE registering")

  }
};