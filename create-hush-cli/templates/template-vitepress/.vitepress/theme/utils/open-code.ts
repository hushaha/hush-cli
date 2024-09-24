import { inBrowser } from 'vitepress';

export const useOpenCode = () => {
	if (inBrowser) {
		window.addEventListener('click', (e) => {
			const el = e.target as HTMLElement;
			if (el.matches('div.op-btn')) {
				const sibling = el.nextElementSibling!;
				const isOpen = Array.from(sibling.classList).includes('show');

				if (isOpen) {
					el.innerText = '显示代码';
					sibling.classList.remove('show');
				} else {
					el.innerText = '隐藏代码';
					sibling.classList.add('show');
				}
			}
		});
	}
};
