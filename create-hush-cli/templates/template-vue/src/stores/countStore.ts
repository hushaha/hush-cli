import { defineStore } from 'pinia';

export const useCountStore = defineStore('counter', () => {
	const count = ref<number>(0);
	const doubleCount = computed<number>(() => count.value * 2);

	function increment() {
		count.value++;
	}
	function decrement() {
		count.value--;
	}
	function reset() {
		count.value = 0;
	}

	return { count, doubleCount, increment, decrement, reset };
});
