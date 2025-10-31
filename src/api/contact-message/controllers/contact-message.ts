// /**
//  * contact-message controller
//  */

// import { factories } from '@strapi/strapi'

// export default factories.createCoreController('api::contact-message.contact-message');

// src/api/contact-message/controllers/contact-message.js
// src/api/contact-message/controllers/contact-message.js
// src/api/contact-message/controllers/contact-message.js


import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::contact-message.contact-message', ({ strapi }) => ({
  async send(ctx) {
    const { name, email, message } = ctx.request.body;

    if (!name || !email || !message) {
      return ctx.badRequest('Veuillez remplir tous les champs requis.');
    }

    try {
      const newContactMessage = await strapi.entityService.create('api::contact-message.contact-message', {
        data: { name, email, message },
      });

      const senderEmail = process.env.SENDGRID_EMAIL_FROM;

      // Mail à l’agence
      await strapi.plugin('email').service('email').send({
        to: senderEmail,
        from: senderEmail,
        replyTo: email,
        subject: `Nouveau message de contact de ${name}`,
        html: `<p><strong>Nom :</strong> ${name}</p><p><strong>Email :</strong> ${email}</p><p><strong>Message :</strong> ${message}</p>`,
        text: `Nom: ${name}\nEmail: ${email}\nMessage: ${message}`,
      });

      // Mail accusé de réception
      try {
        await strapi.plugin('email').service('email').send({
          to: email,
          from: senderEmail,
          subject: `Confirmation de la réception de votre message`,
          html: `<p>Bonjour ${name},</p><p>Nous avons bien reçu votre message et nous vous en remercions. Notre équipe vous recontactera dans les plus brefs délais.</p><p>Cordialement,<br>L'équipe Naya Web</p>`,
          text: `Bonjour ${name},\n\nNous avons bien reçu votre message et nous vous en remercions. Notre équipe vous recontactera dans les plus brefs délais.\n\nCordialement,\nL'équipe Naya Web`,
        });
      } catch (error) {
        strapi.log.error('Erreur envoi accusé de réception', error);
      }

      return ctx.send({ message: 'Messages envoyés avec succès !', data: newContactMessage });

    } catch (err) {
      strapi.log.error('Erreur lors de l\'envoi ou de la sauvegarde', err);
      return ctx.internalServerError('Une erreur est survenue lors de l\'envoi de votre message.');
    }
  }
}));
