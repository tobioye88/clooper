import INotifyService from "../interfaces/i-notify";
import IProperty from "../interfaces/i-property";
import nodemailer from "nodemailer";

export default class EmailHelper implements INotifyService {
  notify(property: IProperty) {
    const { user } = property;
    const fromEmail = process.env.FROM_EMAIL || "";
    const toEmail = process.env.TO_EMAIL || "";
    const data = `
    ============================\n
    PROPERTY: ${property.name}\n
    ============================\n
    \n
    Property Address: ${property.address}\n
    Property Type: ${property.type}\n
    Property Description: ${property.description}\n
    Property Image Url: ${property.image_url}\n
    Property Total Rooms: ${property.total_rooms}\n
    Property Occupancy Type: ${property.occupancy_type}\n
    Property Rent Amount: ${property.rent_amount}\n
    Property Rent Frequency: ${property.rent_frequency}\n
    Property UserId: ${property.userId}\n
    \n
    Posted on: ${property.createdAt}
    Posted By: ${user?.first_name} ${user?.last_name}
    `;
    console.log(data);
    this.send(toEmail, fromEmail, "PROPERTY PUBLISHED", data);
  }

  async send(to: string, from: string, subject: string, body: string) {
    const data = {
      from,
      to,
      subject,
      text: body,
    };
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_SMTP_HOST,
      port: Number(process.env.MAIL_SMTP_HOST) || 2525,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.MAIL_SMTP_USERNAME,
        pass: process.env.MAIL_SMTP_PASSWORD,
      },
      logger: true,
    });

    try {
      const info = await transporter.sendMail({
        from: process.env.FROM_EMAIL || "App",
        to: process.env.TO_EMAIL || "to@example.com",
        subject: subject,
        text: body,
      });

      console.log("Message sent: %s", info.response);
    } catch (e) {
      console.log("Email failed", e);
    }
  }
}
