import nodemailer from 'nodemailer';
import config from '../mailer.config.json';
import generateInitialEmail from './templates/initial';
import { BASE_URL } from '../lib/constants';
import generateBlogEmail from './templates/blog';

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.FROM_EMAIL,
      pass: process.env.GMAIL_APP_PASSWORD,
    }
  });
  

var mailer = {};

mailer.send = async function (user, cb) {
    var message = {
        "html": generateInitialEmail({
            firstName: user.firstName,
            email: user.email}),
        "subject": config.email.template.subject,
        "from": {
            address: process.env.FROM_EMAIL,
            name: config.email.template.from_name,
        },
        "to": [{
            "address": user.email,
            "name": user.firstName + " " + user.lastName,
            "type": "to"
        }],
        "bcc": {
            address: process.env.FROM_EMAIL,
            name: config.email.template.from_name,
        },
    };

    console.log(message);

    const res = await new Promise((res, rej) => {
        transporter.sendMail(message, function(error, info){
            if (error) {
                cb(error);
                rej(error);
            } else {
                cb(null, info.response)
                console.log('Email sent: ' + info.response);
                res(info.response)
            }
        });
    })
    
    console.log(res);
    return res;
};

mailer.blog = function (subs, post) {

    var message = {
       
        "subject": post.title,
        "from": {
            address: process.env.FROM_EMAIL,
            name: config.email.template.from_name,
        },
    };

    const url = `${BASE_URL}/${post.slug}`

    subs.forEach(user => {
        const newMessage = {
            ...message,
            "to": [{
                "address": user.email,
                "name": user.firstName + " " + user.lastName,
                "type": "to"
            }],
            "html": generateBlogEmail({
                firstName: user.firstName,
                title: post.title,
                url,
            }),
        }

        transporter.sendMail(newMessage, function(error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log(info.response)
                console.log('Email sent: ' + info.response);
            }
          });
    });
};

module.exports = mailer;
