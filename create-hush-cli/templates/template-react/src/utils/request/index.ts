import { createRequest } from '@hushaha/request';

import { apis, APISchemaRes } from './schema';

const { apiList: http } = createRequest<APISchemaRes>(
	{
		baseURL: '/api'
	},
	apis
);

export { http };
