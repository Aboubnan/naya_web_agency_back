// src/index.ts
// import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  bootstrap({ strapi }) {
    strapi.db.lifecycles.subscribe({
      models: ['api::contact-message.contact-message'],
      async afterCreate(event) {
        const { name, email, message } = event.result;

        try {
          await strapi
            .plugin('email')
            .service('email')
            .send({
              to: 'abderbabeel@gmail.com',
              from: 'a.boubnan.dev@outlook.com',
              subject: `Naya Web - Nouveau message de contact de ${name}`,
              text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
              html: `<h1>Nouveau message de contact</h1>
                     <p><strong>Nom:</strong> ${name}</p>
                     <p><strong>Email:</strong> ${email}</p>
                     <p><strong>Message:</strong></p>
                     <p>${message}</p>`,
            });

          strapi.log.info('E-mail envoyé avec succès via SendGrid !');
        } catch (error) {
          strapi.log.error('Erreur lors de l\'envoi de l\'e-mail :', error);
        }
      },
    });
  },
};
