import * as discord from 'discord.js';

declare class BananenBase {
	constructor(options: BananenBaseOptions)
}
interface BananenBaseOptions {
	token: string,
	database: {
		package: "keyv" | "json";
		name: string;
		type?: "mongodb" | "redis" | "sqlite" | "postgres" | "mysql";
		code?: string;
	},
	language: "EN" | "NL",
	bot?: object,
	settings?: boolean,
	prefix: string,
	botConfig?: {
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
	ignore?: {
		bot: boolean,
		pm: boolean
	},
	server?: string | object,
	webPort?: number,
	consoleFunctions?: boolean,
	permissionLevels?: [object],
	pmPrefix: boolean,
	commandErrorThrowing?: boolean,
	eventEmitterMaxFuncions?: number
}

declare class BananenBase_Command {
	constructor(
		client: discord.Client,
		help: {
			name: string,
			description?: string,
			category?: string,
			subCommands?: [string],
			enabled?: boolean,
			guildOnly?: boolean,
			args?: [string]
		},
		checking?: {
			permLevel: number,
			permissions?: {
				me: [string],
				user: [string]
			},
			func?: object
		}
	)
	run(
		message: object,
		args?: [string | undefined],
		client?: object
	): object
	prepare(
		message: object,
		args?: [string | undefined]
	): object
	done(
		message: object,
		args?: [string | undefined]
	): object
	client: discord.Client
}

declare class BananenBase_Event {
	constructor(
		client: discord.Client,
		help: {
			name: string,
		}
	)
	run(
		event: any
	): object
	client: discord.Client
}
export = BananenBase;
export const command = BananenBase_Command;
export const event = BananenBase_Event;