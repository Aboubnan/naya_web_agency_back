// /**
//  * contact-message router
//  */

// import { factories } from '@strapi/strapi';

// export default factories.createCoreRouter('api::contact-message.contact-message');

// src/api/contact-message/routes/contact-message.js
export default ({ strapi }) => ({
  routes: [
    // Routes CRUD
    {
      method: 'GET',
      path: '/contact-messages',
      handler: 'contact-message.find',
      config: { auth: false },
    },
    {
      method: 'GET',
      path: '/contact-messages/:id',
      handler: 'contact-message.findOne',
      config: { auth: false },
    },
    {
      method: 'POST',
      path: '/contact-messages',
      handler: 'contact-message.create',
      config: { auth: false },
    },
    {
      method: 'PUT',
      path: '/contact-messages/:id',
      handler: 'contact-message.update',
      config: { auth: false },
    },
    {
      method: 'DELETE',
      path: '/contact-messages/:id',
      handler: 'contact-message.delete',
      config: { auth: false },
    },
    // Route personnalisée
    {
      method: 'POST',
      path: '/contact-messages/send',
      handler: 'contact-message.send',
      config: { auth: false },
    },
  ],
});
