<template>
	<div class="h-full w-full p-8">
		<div class="mt-8 border-b pb-8">
			<h1 class="mb-2 pb-2 text-3xl">use components</h1>
			<HelloWorld />
		</div>

		<div class="mt-8 border-b pb-8">
			<h1 class="mb-2 pb-2 text-3xl">use Router</h1>
			<button
				class="mt-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
				@click="onClick"
			>
				to about
			</button>
		</div>

		<div class="mt-8 border-b pb-8">
			<h1 class="mb-2 pb-2 text-3xl">use Icon</h1>
			<button class="icon-[ep--menu]" style="width: 1.5rem; height: 1.5rem" />
		</div>

		<div class="mt-8 border-b pb-8">
			<h1 class="mb-2 pb-2 text-3xl">use store</h1>
			count: {{ countStore.count }}
			<button
				class="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
				@click="onAdd"
			>
				count ++
			</button>
		</div>

		<div class="mt-8 border-b pb-8">
			<h1 class="mb-2 pb-2 text-3xl">use request</h1>
			<button
				class="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
				@click="onRequest"
			>
				request
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
import { HelloWorld } from '@/components';
import { useCountStore } from '@/stores';
import { http } from '@/utils';

const countStore = useCountStore();

const router = useRouter();

const onClick = () => {
	router.push('about');
};

const onAdd = () => {
	countStore.increment();
};

const onRequest = async () => {
	const res = await http.getUser({ petId: '1' });
	console.log(res.data.data.name);
};
</script>

<style scoped></style>
