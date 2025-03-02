const { Resend } = require("resend")
const fs = require("fs")
const handlebars = require("handlebars")

const resend = new Resend(process.env.MAIL_API_KEY)

const sendEmail = async (to, subject, route, data) => {

    const templateData = {
      ...data,
      url: process.env.IMAGE_URL
    }

    const path = `templates/${route}.html`
    const template = fs.readFileSync(path, 'utf8')

    const compile = handlebars.compile(template)
    const htmlContent = compile(templateData)

    try {
      const data = await resend.emails.send({
        from: 'remitente@resend.dev',
        to: to,
        subject: subject,
        html: htmlContent,
      });
  
      console.log('Correo enviado:', data);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
    }
  };

  module.exports = {sendEmail}