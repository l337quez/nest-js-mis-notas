 
import { ConfigModule, ConfigService} from "@nestjs/config";
import { dirname, join } from "path";
import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

/*
*  Mailer Config
*    the template directory is taken from the mailer module, that's why it has that path
*/
  export default class MailerConfig {
        static getMailerConfig(configService: ConfigService): any {

          return  {
              transport: {
                host: configService.get("MAIL_HOST"),
                port: configService.get("MAIL_PORT"),
                secure: true,
                auth: {
                  user: configService.get("MAIL_USER"),
                  pass: configService.get("MAIL_PASS"),
                },
              },
              defaults: {
                from: configService.get("MAIL_FROM"),
              },
              template: {
                dir: join(__dirname, "./templates"),
                adapter: new HandlebarsAdapter(),
                options: {
                  strict: true,
                },
              },

          }
        }
      }


      export const mailerConfigAsync: any = {
        imports: [ConfigModule],
        useFactory: async (
          configService: ConfigService
        ): Promise<MailerOptions> => MailerConfig.getMailerConfig(configService),
        inject: [ConfigService],
      };










