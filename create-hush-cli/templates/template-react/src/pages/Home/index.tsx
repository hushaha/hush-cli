import { observer } from 'mobx-react';

import { HelloWorld } from '@/components';
import { countStore } from '@/stores';
import { http } from '@/utils';

const Home = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate('/about');
	};

	const onAdd = () => {
		countStore.increment();
	};

	const onRequest = async () => {
		const res = await http.getUser({ petId: '1' });

		console.log(res.data.data.name);
	};

	return (
		<div className="flex h-full w-full flex-col gap-8 divide-y divide-dashed p-8 text-center">
			<div>
				<h1 className="text-3xl">use Router</h1>
				<div className="mx-auto mt-4 flex w-32 flex-col">
					<HelloWorld />
					<button
						onClick={onClick}
						className="mt-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					>
						to about
					</button>
				</div>
			</div>

			<div>
				<h1 className="text-3xl">use Icon</h1>
				<div className="mt-4">
					<button className="icon-[ep--menu]" style={{ width: '1.5rem', height: '1.5rem' }} />
				</div>
			</div>

			<div>
				<h1 className="text-3xl">use store</h1>
				<div className="mt-4">
					count: {countStore.count}
					<button
						onClick={onAdd}
						className="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					>
						count ++
					</button>
				</div>
			</div>

			<div>
				<h1 className="text-3xl">use request</h1>
				<div className="mt-4">
					<button
						onClick={onRequest}
						className="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					>
						request
					</button>
				</div>
			</div>
		</div>
	);
};

const HomeOb = observer(Home);
export default HomeOb;
