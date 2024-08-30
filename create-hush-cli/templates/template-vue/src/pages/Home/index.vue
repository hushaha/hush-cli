<template>
	<div class="flex h-full w-full flex-col gap-8 divide-y divide-dashed p-8 text-center">
		<div>
			<h1 class="text-3xl">use Router</h1>
			<div class="mx-auto mt-4 flex w-32 flex-col">
				<HelloWorld a="1" />
				<button
					class="mt-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					@click="onClick"
				>
					to about
				</button>
			</div>
		</div>

		<div>
			<h1 class="text-3xl">use Icon</h1>
			<div class="mt-4">
				<button class="icon-[ep--menu]" style="width: 1.5rem; height: 1.5rem" />
			</div>
		</div>

		<div>
			<h1 class="text-3xl">use store</h1>
			<div class="mt-4">
				count: {{ countStore.count }}
				<button
					class="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					@click="onAdd"
				>
					count ++
				</button>
			</div>
		</div>

		<div>
			<h1 class="text-3xl">use request</h1>
			<div class="mt-4">
				<button
					class="ml-2 rounded-md border px-5 py-2 text-base font-medium hover:shadow-md"
					@click="onRequest"
				>
					request
				</button>
			</div>
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
