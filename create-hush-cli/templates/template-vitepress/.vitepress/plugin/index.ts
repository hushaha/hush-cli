import path from 'path';
import fs from 'fs';
import MarkdownIt from 'markdown-it';
import container from 'markdown-it-container';
import type { RenderRule } from 'markdown-it/lib/renderer.mjs';

type ContainerArgs = [typeof container, string, { render: RenderRule }];

const getExampleFileByPath = (source: string) => {
	return fs.readFileSync(path.resolve('./', 'examples', `${source}.vue`), 'utf-8');
};

const createDemoContainer = (): ContainerArgs => {
	return [
		container,
		'demo',
		{
			render(tokens, idx, _options) {
				const token = tokens[idx];

				if (token.nesting === 1) {
					const sourceFileToken = tokens[idx + 2];
					const sourceToken = sourceFileToken.children![0];
					const sourceContent = sourceToken?.content || '';

					// hidden paragraph
					const paragraphTokens = [tokens[idx + 1], tokens[idx + 3]];
					paragraphTokens.forEach((itm) => {
						if (itm.type.includes('paragraph')) {
							itm.block = false;
							itm.hidden = true;
						}
					});

					let source = '';
					if (sourceFileToken.type === 'inline') {
						source = getExampleFileByPath(sourceContent);
					}
					if (!source) throw new Error(`Incorrect source file: ${sourceContent}`);

					sourceToken.content = source;
					sourceToken.type = 'fence';
					sourceToken.tag = 'code';
					sourceToken.info = 'vue';
					sourceToken.block = true;
					sourceToken.markup = '```';

					return `<div class="example">
								<div class="p-4 q-border-b">
									<Demo path="${sourceContent}" />
								</div>
								<div class="op-btn">显示代码</div>
					`;
				} else return `</div>`;
			}
		}
	];
};

export const mdPlugin = (md: MarkdownIt) => {
	md.use(...createDemoContainer());
};
