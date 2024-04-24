
// import { NodeVM, makeResolverFromLegacyOptions, type Resolver } from '@n8n/vm2';
// import type { IExecuteFunctions, INodeExecutionData, IWorkflowDataProxyData, } from 'n8n-workflow';



// // import { ValidationError } from './ValidationError';
// // import { ExecutionError } from './ExecutionError';
// import type { SandboxContext } from './Sandbox';
// import { Sandbox } from './Sandbox';



// export class JavaSandbox extends Sandbox {
// 	private readonly context: JavaSandboxContext;

// 	constructor(
// 		context: SandboxContext,
// 		private javaCode: string,
// 		itemIndex: number | undefined,
// 		helpers: IExecuteFunctions['helpers'],
// 	) {
// 		super(
// 			{
// 				object: {
// 					singular: 'object',
// 					plural: 'objects',
// 				},
// 			},
// 			itemIndex,
// 			helpers,
// 		);
// 		// Since java doesn't allow variable names starting with `$`,
// 		// rename them to all to start with `_` instead
// 		this.context = Object.keys(context).reduce((acc, key) => {
// 			acc[key.startsWith('$') ? key.replace(/^\$/, '_') : key] = context[key];
// 			return acc;
// 		}, {} as JavaSandboxContext);
// 	}

// 	async runCode(): Promise<unknown> {
// 		const { Java } = await import('java');
// 		Java.ensureJvm();
// 		const exports = Java.compile(this.javaCode);
// 		return exports.main();
// 	}

// 	async runCodeAllItems(): Promise<INodeExecutionData[]> {
// 		return this.$input.all().map(async (item: Array<string>) => {
// 			const output: INodeExecutionData = {
// 				json: await this.runCode(),
// 				binary: {},
// 			};

// 			Object.assign(output.binary, item.binary);

// 			return this.validateRunCodeEachItem(output);
// 		});
// 	}
// }



