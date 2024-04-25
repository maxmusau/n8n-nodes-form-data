import { INodeProperties } from 'n8n-workflow';


export const branching: INodeProperties = {

	displayName: 'Branching',
	name: 'branching',
	placeholder: 'Add a branching Rule',
	type: 'fixedCollection',
	default: { values: [{ label: '', fieldType: 'text' }] },
	typeOptions: {
		multipleValues: true,
		// sortable: true,
	},
	options: [
		{
			displayName: 'Branching',
			name: 'branching',
			values: [
				{
					displayName: 'Branching Rule',
					name: 'rule',
					type: 'string',
					default: '',
					description: 'The rule to define the branching',
				},
				{
					displayName: 'Branch Type',
					name: 'branchType',
					default: 'text',
					description: 'Operation to decide which branch to take',
					type: 'options',
					noDataExpression: true,
					// eslint-disable-next-line n8n-nodes-base/node-param-options-type-unsorted-items
					options: [
						{
							name: 'Node Branch',
							value: 'node',
						},
						{
							name: 'Text Branch',
							value: 'text',
						},

					]
				},
			],
		},
	],
}


