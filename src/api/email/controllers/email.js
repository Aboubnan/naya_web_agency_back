// src/api/email/controllers.js
export async function sendContactEmail(ctx) {
  try {
    // On accède aux données envoyées par le webhook
    const { name, email, message } = ctx.request.body.data;

    await strapi.plugins.email.services.email.send({
      to: 'a.boubnan@nayaweb.fr', // Remplacer par ton adresse mail
      from: 'a.boubnan@nayaweb.fr', // Remplacer par ton adresse mail d'expéditeur
      subject: `Nouveau message de contact de ${name}`,
      text: `Nom: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h1>Nouveau message de contact</h1><p><strong>Nom:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong></p><p>${message}</p>`,
    });

    ctx.send({
      message: 'Email sent successfully!',
    });
  } catch (error) {
    ctx.badRequest('Failed to send email.');
  }
}