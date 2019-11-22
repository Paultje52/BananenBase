declare module "bananenbase" {
  declare class BananenBase {
    constructor(
      token: string,
      database: {
        package: string;
        name: string;
        type: string;
        code: string;
      },
      language: "EN" | "NL",
      bot: object,
      settings: boolean,
      prefix: string,
      botConfig: {
        botOwners: [string],
        authorSettings: object,
        guildSettings: {
          prefix: string,
          embed: {
            color: string,
            footerText: string,
            time: boolean,
            footerImage: string
          }
        }
      },
      ignore: {
        bot: boolean,
        pm: boolean
      },
      server: string | object,
      webPort: number,
      consoleFunctions: boolean,
      permissionLevels: [object],
      pmPrefix: boolean,
      commandErrorThrowing: boolean,
      eventEmitterMaxFuncions: number
    )
  }
  declare class command {
    constructor(
      client: object,
      help: {
        name: string,
        description: string,
        category: string,
        subCommands: [string],
        enabled: boolean,
        guildOnly: boolean,
        args: [string]
      },
      checking: {
        permLevel: number,
        permissions: {
          me: [string],
          user: [string]
        },
        func: object
      }
    )
    run(
      message: object,
      args: [string | undefined],
      client: object
    ): object
    prepare(
      message: object,
      args: [string | undefined]
    ): object
    done(
      message: object,
      args: [string | undefined]
    ): object
  } 
}
