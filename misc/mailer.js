
// import nodemailer from 'nodemailer';
// import mailer from '../config/mailer';
// import config from '../config/mailer'

// const transport = nodemailer.createTransport({
//   service: 'Mailjet',
//   auth: {
//     user: config.MAILGUN_USER,
//     pass: config.MAILGUN_PASS
//   },
//   tls: {
//     rejectUnauthorized: false
//   }
// });

// const Mailer = ()=>{
//   sendEmail(from, to, subject, html) {
//     return new Promise((resolve, reject) => {
//       transport.sendMail({ from, subject, to, html }, (err, info) => {
//         if (err) reject(err);
//         resolve(info);
//       });
//     });
//   };
// }

// export default  Mailer;