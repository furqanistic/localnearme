import mailgun from 'mailgun-js'
import { createError } from '../error.js'
import Business from '../models/Business.js'
import Newsletter from '../models/Newsletter.js'
import Subscription from '../models/Subscription.js'

const mg = mailgun({
  apiKey: 'e7996d90b21b9f5e2f58641638c7c421-79295dd0-f99b6f29',
  domain: 'sandboxc53e86125c274a9f8b71a6cd2cd2371e.mailgun.org',
})

export const sendNewsletter = async (req, res, next) => {
  try {
    const { businessId } = req.params
    const { subject, message, templateId } = req.body
    const attachments = req.files || []

    // Check if business exists and user has permission
    const business = await Business.findById(businessId).populate('owner')
    if (!business) {
      return next(createError(404, 'Business not found'))
    }

    if (
      business.owner._id.toString() !== req.user.id &&
      req.user.role !== 'Admin'
    ) {
      return next(
        createError(403, 'You do not have permission to send newsletters')
      )
    }

    // Get all active subscribers with their details
    const subscriptions = await Subscription.find({
      business: businessId,
      status: 'active',
      'notifications.email': true,
    }).populate('user', 'email name address')

    if (subscriptions.length === 0) {
      return next(createError(400, 'No active subscribers found'))
    }

    // Prepare attachments
    const mailgunAttachments = attachments.map((file) => {
      return new mg.Attachment({
        data: file.buffer,
        filename: file.originalname,
        contentType: file.mimetype,
      })
    })

    // Send personalized emails to each subscriber
    const sendPromises = subscriptions.map(async (subscription) => {
      const subscriber = subscription.user

      // Replace template variables with actual data
      let personalizedSubject = subject
        .replace(/{businessName}/g, business.name)
        .replace(
          /{month}/g,
          new Date().toLocaleString('default', { month: 'long' })
        )

      let personalizedMessage = message
        .replace(/{subscriberName}/g, subscriber.name || 'Valued Customer')
        .replace(/{businessName}/g, business.name)
        .replace(/{subscriberCity}/g, subscriber.address?.city || '')
        .replace(/{subscriberCountry}/g, subscriber.address?.country || '')

      // Create HTML email template
      const emailHTML = `
        <!DOCTYPE html>
        <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>${personalizedSubject}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
              }
              .header {
                margin-bottom: 20px;
                text-align: center;
              }
              .content {
                white-space: pre-line;
                margin: 20px 0;
              }
              .footer {
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #eee;
                font-size: 12px;
                color: #666;
                text-align: center;
              }
            </style>
          </head>
          <body>
            <div class="header">
              ${
                business.logo
                  ? `<img src="${business.logo}" alt="${business.name}" style="max-width: 200px;" />`
                  : ''
              }
              <h1>${business.name}</h1>
            </div>
            <div class="content">
              ${personalizedMessage}
            </div>
            <div class="footer">
              <p>${business.name}</p>
              ${
                business.address
                  ? `
                <p>${business.address.street || ''}</p>
                <p>${business.address.city || ''}, ${
                      business.address.state || ''
                    } ${business.address.zipCode || ''}</p>
                <p>${business.address.country || ''}</p>
              `
                  : ''
              }
              <p>
                <a href="%unsubscribe_url%">Unsubscribe</a> from these emails
              </p>
            </div>
          </body>
        </html>
      `

      // Send individual email with modified from address
      const emailData = {
        from: `${business.name} <mailgun@sandboxc53e86125c274a9f8b71a6cd2cd2371e.mailgun.org>`,
        to: subscriber.email,
        subject: personalizedSubject,
        html: emailHTML,
        attachment: mailgunAttachments,
      }

      return mg.messages().send(emailData)
    })

    // Wait for all emails to be sent
    await Promise.all(sendPromises)

    // Log newsletter activity with findOneAndUpdate
    await Newsletter.findOneAndUpdate(
      {
        email: business.owner.email,
        name: business.name,
      },
      {
        email: business.owner.email,
        name: business.name,
        subscriptionType: 'Business',
        subscriptions: [business._id],
        isSubscribedToMain: true,
        preferences: new Map([['newsletters', true]]),
        lastSentAt: new Date(),
      },
      {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true,
      }
    )

    res.status(200).json({
      status: 'success',
      message: 'Newsletter sent successfully',
      recipientCount: subscriptions.length,
    })
  } catch (error) {
    console.error('Newsletter sending error:', error)
    next(error)
  }
}
