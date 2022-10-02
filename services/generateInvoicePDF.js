const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars')
const { v4: uuidv4 } = require('uuid');


const generateInvoicePDF = async (email, username, price, productName) => {

    const invoiceId = uuidv4()

    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        const generateContent = await generateEmailHtml({
            invoiceId,
            date: Date.now(),
            username,
            email,
            price,
            productName
        })

        await page.setContent(generateContent)

        const x = await page.pdf({
            path: `invoices/${invoiceId}.pdf`,
            format: 'A4',
            printBackground: true
        })

        return invoiceId
    } catch (err) {
        console.log(err)
    }
}

const generateEmailHtml = async (data) => {
    const html = await fs.promises.readFile(path.join(__dirname, `../views/invoice.hbs`));
    const template = handlebars.compile(html.toString());
    return template(data);
}
module.exports = generateInvoicePDF