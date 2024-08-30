const About = () => {
	const navigate = useNavigate();

	const onClick = () => {
		navigate('/home');
	};

	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="flex flex-col gap-4 text-center text-3xl">
				About
				<button
					onClick={onClick}
					className="rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
				>
					to Home
				</button>
			</div>
		</div>
	);
};

export default About;
