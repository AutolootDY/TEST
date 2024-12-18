import emailjs from '@emailjs/browser';

export const sendEmail = (email,message,succeed,failed) => {
    let temp = {
        user_name:"test",
        user_email:email,
        message:message
    }  
    //emailjs.send('service_1izkvhc', 'template_l86x5fe', temp, 'G_I1Fw-Q-S55niWyy')
    // emailjs.send('service_7u0ku4e', 'template_gohn7p4', temp, '2X3b4maLrrGv1fYMJ')
    emailjs.send('service_w5wi4yl', 'template_s491xe7', temp, 'ZvZN5sNtbVSlHjYH2')
        .then((result) => {
            succeed()
        }, (error) => {
            failed(error.text)
        });
};
