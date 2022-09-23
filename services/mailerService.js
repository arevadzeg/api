
const nodemailer = require('nodemailer')

const sendMail = async (email) => {
    const transporter = nodemailer.createTransport({
        service: "Outlook365",
        host: "smtp.office365.com",
        port: "587",

        auth: {
            user: 'auction-app-123-431@outlook.com',
            pass: 'Zxcvbnm123'
        }
    });

    let info = await transporter.sendMail({
        from: 'auction-app-123-431@outlook.com',
        to: email,
        subject: "TEST",
        text: "TEST",
        html: `<h1>Zd dzma meige
        <button>Click me</button>
        </h1>`
    });
}

module.exports = sendMail