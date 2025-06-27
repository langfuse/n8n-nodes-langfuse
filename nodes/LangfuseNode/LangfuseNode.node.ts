import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import { Langfuse } from 'langfuse';

// Global cache for Langfuse clients keyed by public key
const langfuseClientCache = new Map<string, Langfuse>();

export class LangfuseNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Langfuse',
		name: 'langfuseNode',
		icon: { light: 'file:langfuse.svg', dark: 'file:langfuse.svg' },
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"]}}',
		description: 'Interact with Langfuse',
		usableAsTool: true,
		defaults: {
			name: 'Langfuse',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		credentials: [
			{
				name: 'langfuseCredentialsApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [{ name: 'Prompt', value: 'prompt' }],
				default: 'prompt',
			},
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: { resource: ['prompt'] },
				},
				options: [{ name: 'Get Prompt', value: 'getPrompt', action: 'Get prompt from langfuse' }],
				default: 'getPrompt',
			},
			{
				displayName: 'Prompt Name',
				name: 'promptName',
				type: 'string',
				default: '',
				required: true,
				description: 'The name of the prompt to retrieve from Langfuse',
			},
			{
				displayName: 'Prompt Label',
				name: 'promptLabel',
				type: 'string',
				default: 'production',
				description: 'The label of the prompt version to retrieve (defaults to production)',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// Get or create cached Langfuse client
		const credentials = await this.getCredentials('langfuseCredentialsApi');
		const publicKey = credentials.publicKey as string;

		let langfuse = langfuseClientCache.get(publicKey);

		if (!langfuse) {
			// Create new client and cache it
			langfuse = new Langfuse({
				publicKey: credentials.publicKey as string,
				secretKey: credentials.secretKey as string,
				baseUrl: credentials.host as string,
			});
			langfuseClientCache.set(publicKey, langfuse);
		}

		for (let i = 0; i < items.length; i++) {
			try {
				const promptName = this.getNodeParameter('promptName', i) as string;
				const promptLabel = this.getNodeParameter('promptLabel', i) as string;

				// Get prompt from Langfuse
				const prompt = await langfuse.getPrompt(promptName, undefined, {
					label: promptLabel,
				});

				// Return the raw prompt data
				returnData.push({
					json: {
						promptName,
						promptLabel,
						prompt: prompt.prompt,
						config: prompt.config as any,
						version: prompt.version,
						labels: prompt.labels,
						type: prompt.type,
					},
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: error.message,
						},
						pairedItem: {
							item: i,
						},
					});
					continue;
				}
				throw new NodeOperationError(this.getNode(), error as Error, {
					itemIndex: i,
				});
			}
		}

		return [returnData];
	}
}
