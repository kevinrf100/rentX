import { container } from "tsyringe";

import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
);
