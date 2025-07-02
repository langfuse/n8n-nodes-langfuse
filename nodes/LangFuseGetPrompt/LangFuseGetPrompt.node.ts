import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';

export class LangFuseGetPrompt implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'LangFuse Get Prompt',
		name: 'langFuseGetPrompt',
		icon: 'file:langfuse.svg',
		group: ['transform'],
		version: 1,
		description: 'Fetches a prompt by name from LangFuse',
		defaults: {
			name: 'Get Prompt (LangFuse)',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'langFuseApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{$credentials.host}}',
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Prompt',
						value: 'prompt',
					},
				],
				default: 'prompt',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['prompt'],
					},
				},
				options: [
					{
						name: 'Get',
						value: 'get',
						action: 'Get a prompt',
						description: 'Retrieve a prompt by name',
						routing: {
							request: {
								method: 'GET',
								url: '=/api/public/v2/prompts/{{$parameter["promptName"]}}',
							},
						},
					},
				],
				default: 'get',
			},
			{
				displayName: 'Prompt Name',
				name: 'promptName',
				type: 'string',
				required: true,
				default: '',
				description: 'The name of the prompt to retrieve from LangFuse',
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['prompt'],
						operation: ['get'],
					},
				},
				options: [
					{
						displayName: 'Label',
						name: 'label',
						type: 'string',
						default: 'production',
						description: 'Deployment label of the prompt version to retrieve (defaults to Production)',
						routing: {
							request: {
								qs: {
									label: '={{$value}}',
								},
							},
						},
					},
				],
			},
		],
	};
}