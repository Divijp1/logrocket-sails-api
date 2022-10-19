const { exists } = require("grunt");
const { exits } = require("../controllers/home");

/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */
 module.exports = {
  tableName: "users",
  attributes: {
    fullName: {
      type: 'string',
      required: true,
      columnName: 'full_name'
    },
    email: {
      type: 'string',
      required: true,
      unique: true,
    },
    emailStatus: {
      type: 'string',
      isIn: ['unconfirmed', 'confirmed'],
      defaultsTo: 'unconfirmed',
      columnName: 'email_status'
    },
    emailProofToken: {
      type: 'string',
      description: 'This will be used in the account verification email',
      columnName: 'email_proof_token'
    },
    emailProofTokenExpiresAt: {
      type: 'number',
      description: 'time in milliseconds representing when the emailProofToken will expire',
      columnName: 'email_proof_token_expires_at'
    },
    password: {
      type: 'string',
      required: true
    }
  },
  customToJSON: function() {
    return _.omit(this, ["password"]);
  }, 
  // LIFE CYCLE
   beforeCreate: async function (values, proceed) {
  // Hash password
  const hashedPassword = await sails.helpers.passwords.hashPassword(
    values.password
  );
  values.password = hashedPassword;
  return proceed();
 
},

};
