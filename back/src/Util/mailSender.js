const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.protonmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'Report.Admin1432@proton.me',
        pass: 'Reportme1432'
    }
});

const sendNotification = (report, recipientMail, url) => {
    const mailOptions = {
        from: 'your-email@gmail.com',
        to: recipientMail,
        subject: 'New Report Created',
        text: `A new report has been created:\n\nID: ${report.id}\nSeverity: ${report.severity}\nDescription: ${report.description} \n\nYou can view the report by clicking on the following link: ${url}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
        } else {
            console.log('Email sent:', info.response);
        }
    });
};

module.exports = sendNotification;