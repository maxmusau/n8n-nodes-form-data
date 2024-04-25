import {
	INodeType, INodeTypeDescription, INodeExecutionData,

	IExecuteFunctions,
	// INodeParameters,
	// NodeOperationError,
	// NodeParameterValue
} from 'n8n-workflow';
// import moment from 'moment';
type CodeExecutionMode = 'runOnceForAllItems' | 'runOnceForEachItem';

// interface CodeExecutionOptions {
// 	mode: 'runOnceForAllItems' | 'runOnceForEachItem';
// }

type CodeNodeEditorLanguage = 'typescript' | 'python' | 'javaScript';


// import type{CodeNodeEdiorLanguage,CodeExecutionMode} from 'n8n-workflow'




// imports for the code section

import set from 'lodash/set';
import { javascriptCodeDescription } from './descriptions/JavascriptCodeDescription';
// import { pythonCodeDescription } from './descriptions/PythonCodeDescription';
import { JavaScriptSandbox } from './JavaScriptSandbox';
// import { PythonSandbox } from './PythonSandbox';
import { getSandboxContext } from './Sandbox';
import { standardizeOutput } from './utils';

const { CODE_ENABLE_STDOUT } = process.env;

import { formFields, } from './common.description';
export class MenuNode implements INodeType {
	description: INodeTypeDescription = {
		// Basic node details will go here

		displayName: 'Menu',
		name: 'MenuNode',
		icon: 'file:menu.svg',
		group: ['transform'],
		version: 1,
		subtitle: 'Menu Node',
		description: 'Displays the Pre-configured menu items',
		defaults: {
			name: 'Menu',
		},
		inputs: ['main'],
		outputs: ['main'],
		properties: [
			// Resources and operations will go here

			{
				displayName: 'Path',
				name: 'path',

				type: 'options',
				typeOptions: {
					multiline: true,
				},
				options: [
					{
						name: 'Main',
						value: 'main',
					},
					{
						name: 'Branch',
						value: 'branch',
					},
				],
				default: 'main',
				description: 'Defines whether this is the natural path of the tree or a branch',
				required: true,

			},

			{
				displayName: 'Node Name',
				name: 'nodeName',

				type: 'string',
				typeOptions: {
					multiline: true,
				},
				default: '',
				description: 'Short descriptive name of the tree',//Only used for identification and is not shown to users
				required: true,

			},


			{
				displayName: 'Node Type',
				name: 'nodeType',

				type: 'string',
				typeOptions: {
					multiline: true,
				},
				default: 'MENU',
				description: 'A list of numbered options for a user to select from',
				required: true,

			},
			{
				displayName: 'Validation Failure Text',
				name: 'validationFailureText',
				type: 'string',
				typeOptions: {
					multiline: true,
				},
				default: '',
				description: 'The validation failure text field displayed if the user enters an invalid value',

			},


			{
				displayName: 'Menu Introduction Text',
				name: 'menuIntroText',

				type: 'string',
				typeOptions: {
					multiline: true,
					rows: 4,

				},
				default: '',
				placeholder: '[Menu Introduction Text] / Please select an option',
				description: 'Text to display as introduction for the menu',
				required: true,


			},

			{
				displayName: 'Input VariableName',
				name: 'variableName',
				type: 'string',
				default: '',
				description: 'Input Variable Name',
				// required: true,
			},
			{
				displayName: 'Input Validation',
				name: 'validation',

				type: 'string',
				typeOptions: {
					multiline: true,
				},
				default: '',
				description: 'Checks if the input matches the Regular expression for the validation',

			},

			{
				displayName: 'Node Status',
				name: 'status',

				type: 'options',
				typeOptions: {
					multiline: true,
				},
				default: 'active',
				description: 'Displays whether the status is active or not',
				required: true,
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
					{
						name: 'Test',
						value: 'test',


					},
				],
			},

			{
				displayName: 'Level',
				name: 'level',
				type: 'number',
				default: '',
				// description: 'Level',
				// required: true,
			},

			{
				displayName: 'Status',
				name: 'status',

				type: 'options',
				typeOptions: {
					multiline: true,
				},
				default: 'active',
				description: 'Displays whether the status is active or not',
				required: true,
				options: [
					{
						name: 'Active',
						value: 'active',
					},
					{
						name: 'Inactive',
						value: 'inactive',
					},
					{
						name: 'Test',
						value: 'test',


					},
				],

			},


			formFields,


			// function code section
			// ...pythonCodeDescription,

			//Processor
			{
				displayName: 'Choose Processor',
				name: 'processors',
				type: 'fixedCollection',
				typeOptions: {
					multiline: true,
				},
				default: {},
				description: 'Displays the processor to be executed',
				// required: true,
				options: [
					{
						displayName: 'Pre Processor',
						name: 'processor',
						values: [
							{
								displayName: 'Value',
								name: 'preProcessor',
								default: '',
								type: 'string',
							}
						]
					},
					{
						displayName: 'Input Processor',
						name: 'processor',
						values: [
							{
								displayName: 'Input Processor',
								name: 'inputProcessor',
								default: '',
								type: 'string',
							}
						]
					},

					{
						displayName: 'Post Processor',
						name: 'processor',
						values: [
							{
								displayName: 'Name',
								name: 'postProcessor',
								default: '',
								type: 'string',
							}
						]


					},
				],
			},



			// Function section

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
			// ...pythonCodeDescription,



			{
				displayName: 'Languages',
				name: 'language',
				type: 'hidden',
				displayOptions: {
					show: {
						'@version': [1],
					},
				},
				default: 'javaScript',
			},

			//skip rule
			{
				displayName: 'Skip Rule',
				name: 'skipRule',

				type: 'string',
				typeOptions: {
					multiline: true,
					multipleValues: true,
					rows: 2,
				},
				default: '',
				description: 'Defines the rule to skip this node',

			},

			// Branching
			{
				displayName: 'Branching Rule',
				name: 'branching',
				type: 'fixedCollection',
				typeOptions: {
					multiline: true,
					multipleValues: true,
				},
				default: {},
				description: 'Displays the branching rule to be executed',
				// required: true,
				options: [
					{
						displayName: 'Node Branch',
						name: 'nodeBranch',
						values: [
							{
								displayName: 'Branching Rule',
								name: 'rule',
								default: '',
								type: 'string',
							}
						]
					},
					{
						displayName: 'Text Branch',
						name: 'textBranch',
						values: [
							{
								displayName: 'Branching Rule',
								name: 'rule',
								default: '',
								type: 'string',
							}
						]
					},
				],
			},




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





	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {

		// const codeExecutionOptions: CodeExecutionOptions = {
		// 	mode: 'runOnceForAllItems',

		// }


		"code for the javascript code section"
		// code for the javascript code section
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

			const Sandbox = JavaScriptSandbox;
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

		const items1 = this.getInputData();

		for (let index = 0; index < items1.length; index++) {
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
			};

			if (result) {
				returnData.push({
					json: standardizeOutput(result.json),
					pairedItem: { item: index },
					...(result.binary && { binary: result.binary }),
				});
			}
		}

		return [returnData];






		"SkipRule Functionlity";
		// code to execute the skipRule functionality





		// const returnDataTrue: INodeExecutionData[] = [];
		// const returnDataFalse: INodeExecutionData[] = [];

		// const items = this.getInputData();

		// let item: INodeExecutionData;
		// let combineOperation: string;

		// const isDateObject = (value: NodeParameterValue) =>
		// 	Object.prototype.toString.call(value) === '[object Date]';
		// const isDateInvalid = (value: NodeParameterValue) => value?.toString() === 'Invalid Date';

		// // The compare operations
		// const compareOperationFunctions: {
		// 	[key: string]: (value1: NodeParameterValue, value2: NodeParameterValue) => boolean;
		// } = {
		// 	after: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || 0) > (value2 || 0),
		// 	before: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || 0) < (value2 || 0),
		// 	contains: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || '').toString().includes((value2 || '').toString()),
		// 	notContains: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		!(value1 || '').toString().includes((value2 || '').toString()),
		// 	endsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 as string).endsWith(value2 as string),
		// 	notEndsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		!(value1 as string).endsWith(value2 as string),
		// 	equal: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 === value2,
		// 	notEqual: (value1: NodeParameterValue, value2: NodeParameterValue) => value1 !== value2,
		// 	larger: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || 0) > (value2 || 0),
		// 	largerEqual: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || 0) >= (value2 || 0),
		// 	smaller: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || 0) < (value2 || 0),
		// 	smallerEqual: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 || 0) <= (value2 || 0),
		// 	startsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		(value1 as string).startsWith(value2 as string),
		// 	notStartsWith: (value1: NodeParameterValue, value2: NodeParameterValue) =>
		// 		!(value1 as string).startsWith(value2 as string),
		// 	isEmpty: (value1: NodeParameterValue) =>
		// 		[undefined, null, '', NaN].includes(value1 as string) ||
		// 		(typeof value1 === 'object' && value1 !== null && !isDateObject(value1)
		// 			? Object.entries(value1 as string).length === 0
		// 			: false) ||
		// 		(isDateObject(value1) && isDateInvalid(value1)),
		// 	isNotEmpty: (value1: NodeParameterValue) =>
		// 		!(
		// 			[undefined, null, '', NaN].includes(value1 as string) ||
		// 			(typeof value1 === 'object' && value1 !== null && !isDateObject(value1)
		// 				? Object.entries(value1 as string).length === 0
		// 				: false) ||
		// 			(isDateObject(value1) && isDateInvalid(value1))
		// 		),
		// 	regex: (value1: NodeParameterValue, value2: NodeParameterValue) => {
		// 		const regexMatch = (value2 || '').toString().match(new RegExp('^/(.*?)/([gimusy]*)$'));

		// 		let regex: RegExp;
		// 		if (!regexMatch) {
		// 			regex = new RegExp((value2 || '').toString());
		// 		} else if (regexMatch.length === 1) {
		// 			regex = new RegExp(regexMatch[1]);
		// 		} else {
		// 			regex = new RegExp(regexMatch[1], regexMatch[2]);
		// 		}

		// 		return !!(value1 || '').toString().match(regex);
		// 	},
		// 	notRegex: (value1: NodeParameterValue, value2: NodeParameterValue) => {
		// 		const regexMatch = (value2 || '').toString().match(new RegExp('^/(.*?)/([gimusy]*)$'));

		// 		let regex: RegExp;
		// 		if (!regexMatch) {
		// 			regex = new RegExp((value2 || '').toString());
		// 		} else if (regexMatch.length === 1) {
		// 			regex = new RegExp(regexMatch[1]);
		// 		} else {
		// 			regex = new RegExp(regexMatch[1], regexMatch[2]);
		// 		}

		// 		return !(value1 || '').toString().match(regex);
		// 	},
		// };

		// // Converts the input data of a dateTime into a number for easy compare
		// const convertDateTime = (value: NodeParameterValue): number => {
		// 	let returnValue: number | undefined = undefined;
		// 	if (typeof value === 'string') {
		// 		returnValue = new Date(value).getTime();
		// 	} else if (typeof value === 'number') {
		// 		returnValue = value;
		// 	}
		// 	if (moment.isMoment(value)) {
		// 		returnValue = value.unix();
		// 	}
		// 	if ((value as unknown as object) instanceof Date) {
		// 		returnValue = (value as unknown as Date).getTime();
		// 	}

		// 	if (returnValue === undefined || isNaN(returnValue)) {
		// 		throw new NodeOperationError(
		// 			this.getNode(),
		// 			`The value "${value}" is not a valid DateTime.`,
		// 		);
		// 	}

		// 	return returnValue;
		// };

		// // The different dataTypes to check the values in
		// const dataTypes = ['boolean', 'dateTime', 'number', 'string'];

		// // Iterate over all items to check which ones should be output as via output "true" and
		// // which ones via output "false"
		// let dataType: string;
		// let compareOperationResult: boolean;
		// let value1: NodeParameterValue, value2: NodeParameterValue;
		// itemLoop: for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
		// 	item = items[itemIndex];

		// 	let compareData: INodeParameters;

		// 	combineOperation = this.getNodeParameter('combineOperation', itemIndex) as string;

		// 	// Check all the values of the different dataTypes
		// 	for (dataType of dataTypes) {
		// 		// Check all the values of the current dataType
		// 		for (compareData of this.getNodeParameter(
		// 			`conditions.${dataType}`,
		// 			itemIndex,
		// 			[],
		// 		) as INodeParameters[]) {
		// 			// Check if the values passes

		// 			value1 = compareData.value1 as NodeParameterValue;
		// 			value2 = compareData.value2 as NodeParameterValue;

		// 			if (dataType === 'dateTime') {
		// 				value1 = convertDateTime(value1);
		// 				value2 = convertDateTime(value2);
		// 			}

		// 			compareOperationResult = compareOperationFunctions[compareData.operation as string](
		// 				value1,
		// 				value2,
		// 			);

		// 			if (compareOperationResult && combineOperation === 'any') {
		// 				// If it passes and the operation is "any" we do not have to check any
		// 				// other ones as it should pass anyway. So go on with the next item.
		// 				returnDataTrue.push(item);
		// 				continue itemLoop;
		// 			} else if (!compareOperationResult && combineOperation === 'all') {
		// 				// If it fails and the operation is "all" we do not have to check any
		// 				// other ones as it should be not pass anyway. So go on with the next item.
		// 				returnDataFalse.push(item);
		// 				continue itemLoop;
		// 			}
		// 		}
		// 	}

		// 	if (combineOperation === 'all') {
		// 		// If the operation is "all" it means the item did match all conditions
		// 		// so it passes.
		// 		returnDataTrue.push(item);
		// 		returnDataTrue.push(...returnData.flat());
		// 	} else {
		// 		// If the operation is "any" it means the the item did not match any condition.
		// 		returnDataFalse.push(item);
		// 	}
		// }

		// return [returnDataTrue, returnDataFalse];
	}
}







