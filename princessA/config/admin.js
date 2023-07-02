module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET', '0afe9fe889b85ba5bfd15236b99cab78'),
  },
});
