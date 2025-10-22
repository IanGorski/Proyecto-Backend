import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'testsigdev@gmail.com',
        pass: 'N8v$3rFq!w7XzLp2@bY'
    },
    tls: {
        rejectUnauthorized: false
    }
});

const mailOptions = {
    from: 'testsigdev@gmail.com',
    to: 'testsigdev@gmail.com',
    subject: 'Prueba de correo',
    text: 'Este es un correo de prueba.'
};

transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        console.log('Error al enviar correo:', error);
    } else {
        console.log('Correo enviado:', info.response);
    }
});