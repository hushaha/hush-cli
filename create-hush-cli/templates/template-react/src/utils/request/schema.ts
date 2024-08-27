import type { APISchemaResponse, ApiSchemas } from '@hushaha/request';

export interface APISchemaRes extends APISchemaResponse {
	getUser: {
		request: {
			petId: string;
		};
		response: {
			code: number;
			data: {
				id: number;
				name: string;
			};
		};
	};
}

export const apis: ApiSchemas<APISchemaRes> = {
	getUser: {
		path: 'GET pet/:petId',
		headers: {
			'Content-Type': 'application/json'
		}
	}
};
