import { SES } from "aws-sdk";
import fs from "fs";
import Handlebars from "handlebars";
import nodemailer, { Transporter } from "nodemailer";

import { IMailProvider } from "../IMailProvider";

class SESMailProvider implements IMailProvider {
    private client: Transporter;
    constructor() {
        this.client = nodemailer.createTransport({
            SES: new SES({
                apiVersion: "2010-12-10",
                region: process.env.AWS_REGION,
            }),
        });
    }
    async sendMail(
        to: string,
        subject: string,
        variables: any,
        path: string
    ): Promise<void> {
        const templateFileContent = fs.readFileSync(path).toString("utf-8");

        const templateParse = Handlebars.compile(templateFileContent);

        const templateHTML = templateParse(variables);

        await this.client.sendMail({
            from: "Rentx <kevin@rentex.com.br>",
            to,
            subject,
            html: templateHTML,
        });
    }
}

export { SESMailProvider };
