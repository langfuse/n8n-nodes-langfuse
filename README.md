# n8n-nodes-langfuse

This is an n8n community node. It lets you use Langfuse in your n8n workflows.

[Langfuse](https://langfuse.com) is an open-source LLM engineering platform that provides observability, metrics, evaluations, prompt management and a playground.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)
[Development](#development)  
[Resources](#resources)

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

```bash
npm install @langfuse/n8n-nodes-langfuse
```

## Operations

### Get Prompt

This node can be used to get a prompt from [Langfuse Prompt Management](https://langfuse.com/docs/prompts).

Steps

1. Enter the `name` of the prompt
2. Enter the `label` that identifies the prompt version that you want to fetch. Defaults to "production". Learn more about prompt labels in Langfuse [here](https://langfuse.com/docs/prompts/get-started#labels).

_Example workflow that retrieves the system prompt for the agent from Langfuse:_

![n8n-changelog](https://github.com/user-attachments/assets/4d224c2f-86b6-4ad4-a64a-45c7fe6e3595)

## Credentials

To use this node, you need to authenticate with Langfuse. You'll need:

1. A Langfuse account, either [Langfuse Cloud](https://cloud.langfuse.com) or [self-hosted](https://langfuse.com/self-hosting).
2. API credentials from your Langfuse project settings: hostname, public key, secret key

## Development

### Prerequisites

You need the following installed on your development machine:

- [git](https://git-scm.com/downloads)
- Node.js and npm. Minimum version Node 20. You can find instructions on how to install both using nvm (Node Version Manager) for Linux, Mac, and WSL [here](https://github.com/nvm-sh/nvm). For Windows users, refer to Microsoft's guide to [Install NodeJS on Windows](https://docs.microsoft.com/en-us/windows/dev-environment/javascript/nodejs-on-windows).
- Install n8n with:
  ```
  npm install n8n -g
  ```
- Recommended: follow n8n's guide to [set up your development environment](https://docs.n8n.io/integrations/creating-nodes/build/node-development-environment/).

### Build new version

```bash
npm run build
npm link
```

### Test in local n8n

```bash
cd ~/.n8n/custom
npm link n8n-nodes-langfuse
```

## Resources

- [n8n community nodes documentation](https://docs.n8n.io/integrations/#community-nodes)
- [Langfuse documentation](https://langfuse.com/docs)
- [Langfuse Prompt Management](https://langfuse.com/docs/prompts)

## License

[MIT](https://github.com/langfuse/n8n-nodes-langfuse/blob/master/LICENSE.md)
