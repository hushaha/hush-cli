import { action, makeObservable, observable } from 'mobx';

class CounterStore {
	constructor() {
		makeObservable(this, {
			count: observable,
			increment: action,
			decrement: action,
			reset: action
		});
	}

	count = 0;

	increment() {
		console.log(this);
		this.count++;
	}
	decrement() {
		this.count--;
	}
	reset() {
		this.count = 0;
	}
}
export default new CounterStore();
