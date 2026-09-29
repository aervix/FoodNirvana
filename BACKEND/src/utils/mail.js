import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "Gmail",
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: "maddison53@ethereal.email",
    pass: "jn7jnAPss4f63QBp6D",
  },
});

export const sendOtpMail = async (to, otp) => {
    await transporter.sendMail({
    from: '"Maddison Foo Koch" <maddison53@ethereal.email>',
    to: to,
    subject: "Reser Your Password",
    text: "Hello world?", // plain‑text body
    html: `<p>Your OTP For Reset Password is <b> ${otp} </b>, It Expire In 5 Minutes </p>`, // HTML body
  });
};
