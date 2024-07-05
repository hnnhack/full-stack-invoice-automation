import nodemailer from 'nodemailer'
import puppeteer from 'puppeteer';

const htmlToPdf = async (htmlContent) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf();
  await browser.close();
  return pdfBuffer;
}

const sendInvoiceEmail = async (clientEmail) => {

  const pdfBuffer = await htmlToPdf(generateEmailHTML());

  // Create transporter object using SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail', // e.g., 'gmail', 'hotmail', etc.
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    tls: {
      servername: "gmail.com"
    },
    auth: {
      user: 'mijn_app@gmail.com',
      pass: 'jouw geheim code hier',
    },
  });

  // Define email options
  let mailOptions = {
    from: '"MijnApp 👻" <noreply@gmail.com>',
    to: clientEmail,
    subject: 'Test Invoice for your order',
    html: generateEmailHTML(), // HTML content for the email body
    attachments: [
      {
        filename: 'mijnApp-invoice.pdf',
        content: pdfBuffer,
        contentType: 'application/pdf',
      },
    ],
  };

  try {
    // Send mail with defined transport object
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
  } catch (error) {
    console.error('Error occurred:', error);
    throw error;
  }
}

const generateEmailHTML = () => {
  const getCurrentYear = new Date().getFullYear();

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Thanks email</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
          color: #333;
        }
        .container {
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
          background-color: #fff;
          border-radius: 10px;
          // box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
          text-align: center;
          margin-bottom: 20px;
        }
        .logo {
          max-width: 100%;
          height: auto;
          display: inline-block;
        }
        .footer {
          text-align: center;
          margin-top: 20px;
          color: #666;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <img class="logo" src="/assets/logo.png" alt="Logo">
        </div>
        <div class="body">
          <p>Hello,</p>
          <p>Thank you for your order! Please find the invoice attached.</p>
        </div>
        <div class="footer">
          <p>&copy; ${getCurrentYear} MijnApp. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export default sendInvoiceEmail