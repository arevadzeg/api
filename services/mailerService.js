
const nodemailer = require('nodemailer')
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars')

const sendMail = async (email, subject, template, data) => {
    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: "587",

        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        }
    });

    await transporter.sendMail({
        from: 'auction-app-123-431@outlook.com',
        to: email,
        subject,
        html: await generateEmailHtml(template, data)
    });
}

const generateEmailHtml = async (view, data) => {
    const html = await fs.promises.readFile(path.join(__dirname, `../views/${view}.hbs`));
    const template = handlebars.compile(html.toString());

    return template(data);
}

module.exports = sendMail