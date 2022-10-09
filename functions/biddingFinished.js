const Product = require('../models/Product')
const User = require('../models/User')
const schedule = require('node-schedule');
const sendMail = require('../services/mailerService')
const generateInvoicePDF = require('../services/generateInvoicePDF')
const _ = require('lodash')

const handleBiddingFinished = async (id) => {
    schedule.scheduleJob(savedProduct.auctionDate, async () => {
        const product = await Product.findById(id)
        const winner = product.bidHistory[0]?.bidder || null
        const winnerUser = await User.findOne({ username: winner })
        const allParticipatingUserEmails = _.uniqBy(product.bidHistory, 'bidder').filter((user) => user.bidder !== winnerUser.username).map((user) => user.bidder);
        const allParticipatingUsers = await User.find({
            'username': {
                $in: allParticipatingUserEmails
            }
        })
        product.active = false
        product.winner = winner
        const invoiceId = generateInvoicePDF()
        const invoiceURL = `http://localhost:3005/invoices/${invoiceId}.pdf`

        const emailData = {
            productName: product.name,
            price: product.bidHistory[0].bid,
            productLink: `http://localhost:3000/auction/${product._id}`,
        }
        const winnerEmailData = {
            username: winnerUser.username,
            winnerEmail: true,
            ...emailData
        }

        const winnerSubject = "Congratulations on you recent purchase"
        const loserSubject = "Bidding has been finished"

        sendMail(winnerUser.email, winnerSubject, 'biddingFinished', winnerEmailData)

        allParticipatingUsers.forEach((participant) => {
            sendMail(participant.email,
                loserSubject,
                'biddingFinished',
                { ...emailData, username: participant.username, winnerEmail: false, })
        })
    })
}

module.exports = handleBiddingFinished