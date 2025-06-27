import { ICredentialType, INodeProperties } from 'n8n-workflow';

export class LangfuseCredentialsApi implements ICredentialType {
	name = 'langfuseCredentialsApi';
	displayName = 'Langfuse Credentials API';

	documentationUrl = 'https://langfuse.com/docs';

	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'Langfuse Host',
			name: 'host',
			type: 'string',
			default: 'https://cloud.langfuse.com',
		},
		{
			displayName: 'Langfuse Public Key',
			name: 'publicKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
		{
			displayName: 'Langfuse Secret Key',
			name: 'secretKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];
}
