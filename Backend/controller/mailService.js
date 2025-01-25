const nodemailer = require('nodemailer');

// Create a transporter for sending emails
const transporter = nodemailer.createTransport({
  service: 'Gmail', 
  auth: {
    user: 'bhumika8singh@gmail.com',
    pass: 'rmyu iwza qqtn qwit',
  },
});


// Function to send the verification code via email
const sendVerificationCode = async (email, code) => {
  try {
    
    const mailOptions = {
      from: 'ArtSphere@gmail.com',
      to: email,
      subject: 'Verification Code',
      text: `Your verification code is: ${code}`,
    };

    
    // Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.response);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = {
  sendVerificationCode,
};