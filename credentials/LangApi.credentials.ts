import {
	ICredentialType,
	INodeProperties,
	IAuthenticateGeneric,
	ICredentialTestRequest,
} from 'n8n-workflow';

export class LangfuseApi implements ICredentialType {
	name = 'langfuseApi';
	displayName = 'Langfuse API';
	documentationUrl = 'https://langfuse.com/docs/api#authentication';

	properties: INodeProperties[] = [
		{
			displayName: 'Langfuse Host URL',
			name: 'host',
			type: 'string',
			default: 'https://cloud.langfuse.com',
			description: 'The base URL for your Langfuse instance',
		},
		{
			displayName: 'Public Key',
			name: 'publicKey',
			type: 'string',
			typeOptions: { password: true },
			required: true,
			default: '',
			description: 'Langfuse public API key (used as username for Basic Auth)',
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
			description: 'Langfuse secret API key (used as password for Basic Auth)',
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

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.host}}',
			url: '/api/public/projects',
			method: 'GET',
		},
	};
}
