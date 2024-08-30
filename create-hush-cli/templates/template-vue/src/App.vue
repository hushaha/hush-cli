<template>
	<RouterView v-slot="{ Component }">
		<template v-if="Component">
			<Transition mode="out-in">
				<Suspense>
					<component :is="Component"></component>
					<template #fallback> <Loading /> </template>
				</Suspense>
			</Transition>
		</template>
	</RouterView>
</template>

<script setup lang="ts">
import { Loading } from '@/features';
</script>

<style scoped></style>
