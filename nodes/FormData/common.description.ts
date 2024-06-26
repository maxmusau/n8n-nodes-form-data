
import type { INodeProperties } from 'n8n-workflow';



export const formFields: INodeProperties = {
	displayName: 'Variables',
	name: 'variables',
	placeholder: 'Add a variable',
	type: 'fixedCollection',
	default: { values: [{ label: '', fieldType: 'text' }] },
	typeOptions: {
		multipleValues: true,
		sortable: true,
	},
	options: [
		{
			displayName: 'Values',
			name: 'values',
			values: [
				{
					displayName: 'Variable Name',
					name: 'name',
					type: 'string',
					default: '',
					placeholder: 'Subscriber ID',
					description: 'Label appears above the input field',

				},
				{
					displayName: 'Variable Type',
					name: 'type',
					type: 'options',
					default: 'string',
					noDataExpression: true,
					// placeholder: 'Subscriber ID',
					description: 'Label appears above the input field',
					options: [

						//String, Number, JSONArray, JSONObject

						{
							name: 'String',
							value: 'string',
						},
						{
							name: 'Number',
							value: 'number',
						},
						{
							name: 'JSONArray',
							value: 'jsonarray',
						},
						{
							name: 'JSONObject',
							value: 'jsonobject',
						},

					]

				},

				// add the input field for entering the field value
				{
					displayName: 'Value',
					name: 'value',
					type: 'string',
					default: '',
					placeholder: 'Enter value e.g 1023',
					description: 'Value of the input field',
					required: true,
				},
				//

			],
		},
	],
};


export const branchingRule: INodeProperties = {
	displayName: 'Branching Rule',
	name: 'branching',
	placeholder: 'Add a branching rule',
	type: 'fixedCollection',
	default: { values: [{ label: '', fieldType: 'text' }] },
	typeOptions: {
		multipleValues: true,
		sortable: true,
	},
	options: [
		{
			displayName: 'Branching Rule',
			name: 'branching',
			values: [
				{
					displayName: 'Rule',
					name: 'rule',
					type: 'string',
					default: '',
					placeholder: 'Subscriber ID',
					description: 'Label appears above the input field',

				},
				{
					displayName: 'Branch Type',
					name: 'branchType',
					type: 'options',
					default: 'text',
					noDataExpression: true,
					// placeholder: 'Subscriber ID',
					description: 'Label appears above the input field',
					options: [

						//String, Number, JSONArray, JSONObject
						{
							name: 'Node',
							value: 'node',
						},

						{
							name: 'Text',
							value: 'text',
						},


					]

				},

				// add the input field for entering the field value

				//

			],
		},
	],
};

export const skipRule: INodeProperties = {

	displayName: 'Skip Rule',
	name: 'skipRule',
	placeholder: 'Add Skip Rule',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
		sortable: true,
	},
	description: 'The type of values to compare',
	default: {},
	options: [
		{
			name: 'boolean',
			displayName: 'Boolean',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'boolean',
					default: false,
					// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
					description: 'The value to compare with the second one',
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					options: [
						{
							name: 'Equal',
							value: 'equal',
						},
						{
							name: 'Not Equal',
							value: 'notEqual',
						},
					],
					default: 'equal',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'boolean',
					default: false,
					// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
					description: 'The value to compare with the first one',
				},
			],
		},
		{
			name: 'dateTime',
			displayName: 'Date & Time',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'dateTime',
					default: '',
					description: 'The value to compare with the second one',
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					options: [
						{
							name: 'Occurred After',
							value: 'after',
						},
						{
							name: 'Occurred Before',
							value: 'before',
						},
					],
					default: 'after',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'dateTime',
					default: '',
					description: 'The value to compare with the first one',
				},
			],
		},
		{
			name: 'number',
			displayName: 'Number',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'number',
					default: 0,
					description: 'The value to compare with the second one',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					noDataExpression: true,
					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
					options: [
						{
							name: 'Smaller',
							value: 'smaller',
						},
						{
							name: 'Smaller or Equal',
							value: 'smallerEqual',
						},
						{
							name: 'Equal',
							value: 'equal',
						},
						{
							name: 'Not Equal',
							value: 'notEqual',
						},
						{
							name: 'Larger',
							value: 'larger',
						},
						{
							name: 'Larger or Equal',
							value: 'largerEqual',
						},
						{
							name: 'Is Empty',
							value: 'isEmpty',
						},
						{
							name: 'Is Not Empty',
							value: 'isNotEmpty',
						},
					],
					default: 'smaller',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'number',


					displayOptions: {
						hide: {
							operation: ['isEmpty', 'isNotEmpty'],
						},
					},
					default: 0,
					description: 'The value to compare with the first one',
				},
			],
		},
		{
			name: 'string',
			displayName: 'String',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'string',
					default: '',
					description: 'The value to compare with the second one',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					noDataExpression: true,
					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
					options: [
						{
							name: 'Contains',
							value: 'contains',
						},
						{
							name: 'Not Contains',
							value: 'notContains',
						},
						{
							name: 'Ends With',
							value: 'endsWith',
						},
						{
							name: 'Not Ends With',
							value: 'notEndsWith',
						},
						{
							name: 'Equal',
							value: 'equal',
						},
						{
							name: 'Not Equal',
							value: 'notEqual',
						},
						{
							name: 'Regex Match',
							value: 'regex',
						},
						{
							name: 'Regex Not Match',
							value: 'notRegex',
						},
						{
							name: 'Starts With',
							value: 'startsWith',
						},
						{
							name: 'Not Starts With',
							value: 'notStartsWith',
						},
						{
							name: 'Is Empty',
							value: 'isEmpty',
						},
						{
							name: 'Is Not Empty',
							value: 'isNotEmpty',
						},
					],
					default: 'equal',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'string',
					displayOptions: {
						hide: {
							operation: ['isEmpty', 'isNotEmpty', 'regex', 'notRegex'],
						},
					},
					default: '',
					description: 'The value to compare with the first one',
				},
				{
					displayName: 'Regex',
					name: 'value2',
					type: 'string',
					displayOptions: {
						show: {
							operation: ['regex', 'notRegex'],
						},
					},
					default: '',
					placeholder: '/text/i',
					description: 'The regex which has to match',
				},
			],
		},
	],
};

// export const branching: INodeProperties = {

// 	displayName: 'Branching',
// 	name: 'branching',
// 	placeholder: 'Add a branching Rule',
// 	type: 'fixedCollection',
// 	default:{ values: [{ label: '', fieldType: 'text' }] },
// 	typeOptions: {
// 		multipleValues: true,
// 		sortable: true,
// 		rows: 3,
// 	},
// 			options: [
// 		{
// 			displayName: 'Branching',
// 			name: 'branching',
// 			values: [
// 				{
// 					displayName: 'Branching Rule',
// 					name: 'rule',
// 					type: 'string',
// 					default: '',
// 					description: 'The rule to define the branching',
// 				},
// 				{
// 					displayName: 'Branch Type',
// 					name: 'branchType',
// 					default: 'text',
// 					description: 'Operation to decide which branch to take',
// 					type: 'options',
// 					noDataExpression: true,
// 					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
// 					options: [
// 						{
// 							name: 'Text Branch',
// 							value: 'text',
// 						},
// 						{
// 							name: 'Node Branch',
// 							value: 'node',
// 						},
// 					]
// 					},
// 				],
// 				},
// 			],
// 		}

export const branching: INodeProperties = {

	displayName: 'Branching',
	name: 'branching',
	placeholder: 'Add a branching Rule',
	type: 'fixedCollection',
	typeOptions: {
		multipleValues: true,
		sortable: true,
	},



	description: 'The type of values to compare',
	default: {},
	options: [


		{
			name: 'boolean',
			displayName: 'Boolean',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'boolean',
					default: false,
					// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
					description: 'The value to compare with the second one',
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					options: [
						{
							name: 'Equal',
							value: 'equal',
						},
						{
							name: 'Not Equal',
							value: 'notEqual',
						},
					],
					default: 'equal',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'boolean',
					default: false,
					// eslint-disable-next-line n8n-nodes-base/node-param-description-boolean-without-whether
					description: 'The value to compare with the first one',
				},
			],
		},
		{
			name: 'dateTime',
			displayName: 'Date & Time',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'dateTime',
					default: '',
					description: 'The value to compare with the second one',
				},
				// eslint-disable-next-line n8n-nodes-base/node-param-operation-without-no-data-expression
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					options: [
						{
							name: 'Occurred After',
							value: 'after',
						},
						{
							name: 'Occurred Before',
							value: 'before',
						},
					],
					default: 'after',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'dateTime',
					default: '',
					description: 'The value to compare with the first one',
				},
			],
		},
		{
			name: 'number',
			displayName: 'Number',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'number',
					default: 0,
					description: 'The value to compare with the second one',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					noDataExpression: true,
					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
					options: [
						{
							name: 'Smaller',
							value: 'smaller',
						},
						{
							name: 'Smaller or Equal',
							value: 'smallerEqual',
						},
						{
							name: 'Equal',
							value: 'equal',
						},
						{
							name: 'Not Equal',
							value: 'notEqual',
						},
						{
							name: 'Larger',
							value: 'larger',
						},
						{
							name: 'Larger or Equal',
							value: 'largerEqual',
						},
						{
							name: 'Is Empty',
							value: 'isEmpty',
						},
						{
							name: 'Is Not Empty',
							value: 'isNotEmpty',
						},
					],
					default: 'smaller',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'number',
					displayOptions: {
						hide: {
							operation: ['isEmpty', 'isNotEmpty'],
						},
					},
					default: 0,
					description: 'The value to compare with the first one',
				},
			],
		},
		{
			name: 'string',
			displayName: 'String',
			values: [
				{
					displayName: 'Value 1',
					name: 'value1',
					type: 'string',
					default: '',
					description: 'The value to compare with the second one',
				},
				{
					displayName: 'Operation',
					name: 'operation',
					type: 'options',
					noDataExpression: true,
					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
					options: [
						{
							name: 'Contains',
							value: 'contains',
						},
						{
							name: 'Not Contains',
							value: 'notContains',
						},
						{
							name: 'Ends With',
							value: 'endsWith',
						},
						{
							name: 'Not Ends With',
							value: 'notEndsWith',
						},
						{
							name: 'Equal',
							value: 'equal',
						},
						{
							name: 'Not Equal',
							value: 'notEqual',
						},
						{
							name: 'Regex Match',
							value: 'regex',
						},
						{
							name: 'Regex Not Match',
							value: 'notRegex',
						},
						{
							name: 'Starts With',
							value: 'startsWith',
						},
						{
							name: 'Not Starts With',
							value: 'notStartsWith',
						},
						{
							name: 'Is Empty',
							value: 'isEmpty',
						},
						{
							name: 'Is Not Empty',
							value: 'isNotEmpty',
						},
					],
					default: 'equal',
					description: 'Operation to decide where the the data should be mapped to',
				},
				{
					displayName: 'Value 2',
					name: 'value2',
					type: 'string',
					displayOptions: {
						hide: {
							operation: ['isEmpty', 'isNotEmpty', 'regex', 'notRegex'],
						},
					},
					default: '',
					description: 'The value to compare with the first one',
				},
				{
					displayName: 'Regex',
					name: 'value2',
					type: 'string',
					displayOptions: {
						show: {
							operation: ['regex', 'notRegex'],
						},
					},
					default: '',
					placeholder: '/text/i',
					description: 'The regex which has to match',
				},
			],
		},
	],
};







const commonDescription: INodeProperties = {
	displayName: 'Python',
	name: 'pythonCode',
	type: 'string',
	typeOptions: {
		editor: 'codeNodeEditor',
		alwaysOpenEditWindow: true,
		editorLanguage: 'python',
		rows: 5,

		codeAutocomplete: 'functionItem',
	},
	default: '// Code here will run once per input item',
	description:
		'Python code to execute.<br><br>Tip: You can use built-in methods and variables like <code>_today</code> for dates and <code>_jmespath</code> for querying JSON structures. <a href="https://docs.n8n.io/code/builtin/">Learn more</a>.',
	noDataExpression: true,
};

export const pythonCodeDescription: INodeProperties[] = [
	{
		...commonDescription,
		displayOptions: {
			show: {
				language: ['python'],
				mode: ['runOnceForAllItems'],
			},
		},
	},
	{
		...commonDescription,
		displayOptions: {
			show: {
				language: ['python'],
				mode: ['runOnceForEachItem'],
			},
		},
	},
	{
		displayName:
			'Debug by using <code>print()</code> statements and viewing their output in the browser console.',
		name: 'notice',
		type: 'notice',
		displayOptions: {
			show: {
				language: ['python'],
			},
		},
		default: '',
	},
];

