// src/api/email/routes.js
export const routes = [
  {
    method: 'POST',
    path: '/email/contact-message',
    handler: 'email.sendContactEmail', // La route appelle ton contrôleur
    config: {
      auth: false,
    },
  },
];