import nodemailer from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import mg from "nodemailer-mailgun-transport";

const sendEmail = async (
  email: string,
  subject: string,
  payload: Record<string, string>,
  template: string
  // eslint-disable-next-line consistent-return
): Promise<unknown> => {
  try {
    // create reusable nodemailerMailgun object using the default SMTP transport;
    const api_key = "f635b317d4808173f1505ce8cf661d74-fa6e84b7-12eb441d";
    // const domain = "sandboxe84e584cd0e2469bad494e3a0dc0f913.mailgun.org";
    const domain = "musicbox.decagon.com";
    const auth = {
      auth: { api_key, domain },
    };
    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    const templateSource = fs.readFileSync(
      path.join(__dirname, "../../../templates/", template),
      "utf8"
    );
    const compiledTemplate = handlebars.compile(templateSource);
    const options = () => {
      return {
        from: "musicboxb@outlook.com",
        to: email,
        subject,
        html: compiledTemplate(payload),
      };
    };

    // Send email
    return nodemailerMailgun.sendMail(options(), (error, info) => {
      if (error) {
        return error;
      }
      return { info };
    });
  } catch (error) {
    return error;
  }
};

export default sendEmail;
