import {
	INodeType, INodeTypeDescription, INodeExecutionData,

	IExecuteFunctions
} from 'n8n-workflow';

type CodeExecutionMode = 'runOnceForAllItems' | 'runOnceForEachItem';

// interface CodeExecutionOptions {
// 	mode: 'runOnceForAllItems' | 'runOnceForEachItem';
// }

type CodeNodeEditorLanguage = 'typescript' | 'python' | 'javaScript';


// import type{CodeNodeEdiorLanguage,CodeExecutionMode} from 'n8n-workflow'




// imports for the code section

import set from 'lodash/set';
import { javascriptCodeDescription } from './descriptions/JavascriptCodeDescription';
import { pythonCodeDescription } from './descriptions/PythonCodeDescription';
import { JavaScriptSandbox } from './JavaScriptSandbox';
// import { PythonSandbox } from './PythonSandbox';
import { getSandboxContext } from './Sandbox';
import { standardizeOutput } from './utils';

const { CODE_ENABLE_STDOUT } = process.env;

import { formFields } from './common.description';
export class FormData implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here

		displayName: 'Form',
		name: 'FormData',
		icon: 'file:form.png',
		group: ['transform'],
		version: 1,
		subtitle: 'Form Node',
		description: 'Captures user input through a form',
		defaults: {
			name: 'Form',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Resources and operations will go here
			{
				displayName: 'Node Display Text',
				name: 'displayText',

				type: 'string',
				typeOptions: {
					multiline: true,
					rows: 5,

				},
				default: 'Please Enter your response',
				description: 'Text to display as introduction to the form',
				required: true,


			},
			{
				displayName: 'User Response',
				name: 'response',
				type: 'string',
				default: '',
				description: 'User input response',
				required: true,
			},
			formFields,

			{
				displayName: 'Validation',
				name: 'validation',

				type: 'string',
				typeOptions: {
					multiline: true,
				},
				default: '',
				description: 'Regular expression for the validation',

			},

			{
				displayName: 'Status',
				name: 'status',

				type: 'string',
				typeOptions: {
					multiline: true,
				},
				default: 'Active',
				description: 'Displays whether the status is active or not',
				required: true,

			},








			// {
			// 	displayName: 'Processors',
			// 	name: 'processors',
			// 	type: 'collection',
			// 	default: {},
			// 	description: 'Processors to transform data',
			// 	placeholder: 'Add Processor',
			// 	options: [
			// 		{
			// 			displayName: 'Processor {{Name}} Name Name or ID',
			// 			name: 'preProcessor',
			// 			type: 'options',
			// 			default: '',
			// 			typeOptions: {
			// 				loadOptionsMethod: 'getProcessors',
			// 			},
			// 			description: 'Choose from the list or specify an ID. Choose from the list, or specify an ID using an <a href="https://docs.n8n.io/code-examples/expressions/">expression</a>.',
			// 		},
			// 	],
			// },



			// function code section
			// ...pythonCodeDescription,
			//Processor

			{
				displayName: 'Processors',
				name: 'processors',
				type: 'string',
				default: "",
				description: 'Displays whether the status is active or not',
				required: true,

			},

			// Function section
			{
				displayName: 'Mode',
				name: 'mode',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Run Once for All Items',
						value: 'runOnceForAllItems',
						description: 'Run this code only once, no matter how many input items there are',
					},
					{
						name: 'Run Once for Each Item',
						value: 'runOnceForEachItem',
						description: 'Run this code as many times as there are input items',
					},
				],
				default: 'runOnceForAllItems',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						'@version': [2],
					},
				},
				options: [
					{
						name: 'JavaScript',
						value: 'javaScript',
					},
					{
						name: 'Python (Beta)',
						value: 'python',
					},
				],
				default: 'javaScript',
			},
			...javascriptCodeDescription,
			...pythonCodeDescription,



			{
				displayName: 'Processors',
				name: 'language',
				type: 'hidden',
				displayOptions: {
					show: {
						'@version': [1],
					},
				},
				default: 'Processors',
			},

			//skip rule








			//flags
			{
				displayName: 'Flags',
				name: 'flags',
				type: 'collection',
				default: {},
				description: 'Flags to control behavior',
				placeholder: 'Add Flag',
				options: [
					{
						displayName: 'Sanitize',
						name: 'sanitize',
						type: 'boolean',
						default: false,
					},
					{
						displayName: 'Encrypt',
						name: 'encrypt',
						type: 'boolean',
						default: false,
						description: 'Whether or not to Encrypt user input',
					},
					{
						displayName: 'Last Node',
						name: 'lastNode',
						type: 'boolean',
						default: false,
						description: 'Whether to indicate this as last node in workflow or not',
					},
					{
						displayName: 'Close Session',
						name: 'closeSession',
						type: 'boolean',
						default: false,
						description: 'Whether to Flag to close workflow session or not',
					},
					{
						displayName: 'Publish',
						name: 'publish',
						type: 'boolean',
						default: false,
						description: 'Whether to publish workflow output or not',
					},
				],
			},

		]
	};





	async execute(this: IExecuteFunctions) {

		// const codeExecutionOptions: CodeExecutionOptions = {
		// 	mode: 'runOnceForAllItems',

		// }
		const nodeMode = this.getNodeParameter('mode', 0) as CodeExecutionMode;

		const workflowMode = this.getMode();

		const node = this.getNode();
		const language: CodeNodeEditorLanguage =
			node.typeVersion === 2
				? (this.getNodeParameter('language', 0) as CodeNodeEditorLanguage)
				: 'javaScript';
		const codeParameterName = language === 'python' ? 'pythonCode' : 'jsCode';

		const getSandbox = (index = 0) => {
			const code = this.getNodeParameter(codeParameterName, index) as string;
			const context = getSandboxContext.call(this, index);
			if (nodeMode === 'runOnceForAllItems') {
				context.items = context.$input.all();
			} else {
				context.item = context.$input.item;
			}

			const Sandbox =  JavaScriptSandbox;
			const sandbox = new Sandbox(context, code, index, this.helpers);
			sandbox.on(
				'output',
				workflowMode === 'manual'
					? this.sendMessageToUI
					: CODE_ENABLE_STDOUT === 'true'
						? (...args) =>
							console.log(`[Workflow "${this.getWorkflow().id}"][Node "${node.name}"]`, ...args)
						: () => { },
			);
			return sandbox;
		};

		// ----------------------------------
		//        runOnceForAllItems
		// ----------------------------------

		if (nodeMode === 'runOnceForAllItems') {
			const sandbox = getSandbox();
			let items: INodeExecutionData[];
			try {
				items = (await sandbox.runCodeAllItems()) as INodeExecutionData[];
			} catch (error) {
				if (!this.continueOnFail()) {
					set(error, 'node', node);
					throw error;
				}
				items = [{ json: { error: error.message } }];
			}

			for (const item of items) {
				standardizeOutput(item.json);
			}

			return [items];
		}

		// ----------------------------------
		//        runOnceForEachItem
		// ----------------------------------

		const returnData: INodeExecutionData[] = [];

		const items = this.getInputData();

		for (let index = 0; index < items.length; index++) {
			const sandbox = getSandbox(index);
			let result: INodeExecutionData | undefined;
			try {
				result = await sandbox.runCodeEachItem();
			} catch (error) {
				if (!this.continueOnFail()) {
					set(error, 'node', node);
					throw error;
				}
				returnData.push({
					json: { error: error.message },
					pairedItem: {
						item: index,
					},
				});
			}

			if (result) {
				returnData.push({
					json: standardizeOutput(result.json),
					pairedItem: { item: index },
					...(result.binary && { binary: result.binary }),
				});
			}
		}

		return [returnData];



	}
}










