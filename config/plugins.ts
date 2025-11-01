// config/plugins.js
export default ({ env }) => ({
  email: {
    enabled: true,
    config: {
      provider: 'sendgrid',
      providerOptions: {
        apiKey: env('SENDGRID_API_KEY'),
      },
      settings: {
        defaultFrom: env('SENDGRID_EMAIL_FROM'),
        defaultReplyTo: env('SENDGRID_EMAIL_FROM'),
      },
    },
  },
  "users-permissions": { // <-- DOIT ABSOLUMENT ÊTRE LÀ
    config: {
      jwtSecret: env('JWT_SECRET'),
    },
  },
});
