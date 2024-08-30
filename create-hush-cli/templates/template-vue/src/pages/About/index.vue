<template>
	<div className="flex h-full w-full items-center justify-center">
		<div className="flex flex-col gap-4 text-center text-3xl">
			About
			<button
				className="rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
				@click="onClick"
			>
				to Home
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
const router = useRouter();

const onClick = () => {
	router.push('home');
};
</script>

<style scoped></style>
