import { observer } from 'mobx-react';
import Link from 'next/link';

import { HelloWorld } from '@/components';
import { countStore } from '@/stores';
import { http } from '@/utils';

const Home = () => {
	const onAdd = () => {
		countStore.increment();
	};

	const onRequest = async () => {
		try {
			const res = await http.getUser({ petId: '1' });
			console.log(res.data.data.name);
		} catch (error) {}
	};

	return (
		<div className="h-full w-full p-8">
			<div className="mt-8 border-b pb-8">
				<h1 className="mb-2 pb-2 text-3xl">use components</h1>
				<HelloWorld />
			</div>

			<div className="mt-8 border-b pb-8">
				<h1 className="mb-2 pb-2 text-3xl">use Router</h1>
				<Link href="/about">
					<button className="mt-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md">
						to about
					</button>
				</Link>
			</div>

			<div className="mt-8 border-b pb-8">
				<h1 className="mb-2 pb-2 text-3xl">use Icon</h1>
				<button className="icon-[ep--menu]" style={{ width: '1.5rem', height: '1.5rem' }} />
			</div>

			<div className="mt-8 border-b pb-8">
				<h1 className="mb-2 pb-2 text-3xl">use store</h1>
				count: {countStore.count}
				<button
					className="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					onClick={onAdd}
				>
					count ++
				</button>
			</div>

			<div className="mt-8 border-b pb-8">
				<h1 className="mb-2 pb-2 text-3xl">use request</h1>
				<button
					className="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					onClick={onRequest}
				>
					request
				</button>
			</div>
		</div>
	);
};

const HomeOb = observer(Home);
export default HomeOb;
