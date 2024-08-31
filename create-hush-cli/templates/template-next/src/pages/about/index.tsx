import Link from 'next/link';
import { useEffect } from 'react';

const About = () => {
	useEffect(() => {
		console.log(window);
	}, []);

	return (
		<div className="flex h-screen w-full items-center justify-center">
			<div className="flex flex-col gap-4 text-center text-3xl">
				About
				<Link href="/home">
					<button className="rounded-md border px-5 py-2 text-base font-medium hover:shadow-md">
						to Home
					</button>
				</Link>
			</div>
		</div>
	);
};

export default About;
