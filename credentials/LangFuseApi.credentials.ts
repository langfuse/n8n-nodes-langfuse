import { ICredentialType, INodeProperties, IAuthenticateGeneric } from 'n8n-workflow';

export class LangFuseApi implements ICredentialType {
	name = 'langFuseApi';
	displayName = 'LangFuse API';
	documentationUrl = 'https://langfuse.com/docs/api#authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'LangFuse Host URL',
			name: 'host',
			type: 'string',
			default: 'https://cloud.langfuse.com',
			description: 'The base URL for your LangFuse instance',
		},
		{
			displayName: 'Public Key',
			name: 'publicKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'LangFuse public API key (used as username for Basic Auth)',
		},
		{
			displayName: 'Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			required: true,
			default: '',
			description: 'LangFuse secret API key (used as password for Basic Auth)',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			auth: {
				username: '={{$credentials.publicKey}}',
				password: '={{$credentials.secretKey}}',
			},
		},
	};
}