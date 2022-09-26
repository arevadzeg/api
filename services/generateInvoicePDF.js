const puppeteer = require('puppeteer');


const generateInvoicePDF = async () => {


    try {
        const browser = await puppeteer.launch()
        const page = await browser.newPage()

        await page.setContent('<h1> Hello world </h1>')

        await page.pdf({
            path: 'output.pdf',
            format: 'A4',
            printBackground: true
        })

    } catch (err) {
        console.log(err)
    }
}

module.exports = generateInvoicePDF