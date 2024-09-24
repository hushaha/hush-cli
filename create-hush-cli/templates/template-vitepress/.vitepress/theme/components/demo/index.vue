<template>
	<ClientOnly>
		<component :is="demoComponent" v-if="demoComponent" v-bind="$attrs" />
	</ClientOnly>
</template>

<script setup lang="ts">
import { onMounted, shallowRef } from 'vue';
import exampleList from '../../../../examples';

interface Props {
	path: string;
}

const props = withDefaults(defineProps<Props>(), {});

const demoComponent = shallowRef(null);

onMounted(() => {
	if (!exampleList[props.path]) {
		throw new Error(`${props.path} not found`);
	}
	exampleList[props.path]().then((module) => {
		demoComponent.value = module.default;
	});
});
</script>

<style scoped lang="scss">
.language-vue {
	margin: 0 !important;
	border-radius: 0 !important;
}
</style>
