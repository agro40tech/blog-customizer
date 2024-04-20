import { CSSProperties, StrictMode, useState } from 'react';

import clsx from 'clsx';

import { createRoot } from 'react-dom/client';

import styles from './styles/index.module.scss';
import { Article } from './components/article/Article';
import {
	ArticleStateType,
	defaultArticleState,
} from './constants/articleProps';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';

import './styles/index.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	// Общее состояние css свойств страницы
	const [state, setState] = useState<ArticleStateType>(defaultArticleState);

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': state.fontFamilyOption.value,
					'--font-size': state.fontSizeOption.value,
					'--font-color': state.fontColor.value,
					'--container-width': state.contentWidth.value,
					'--bg-color': state.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setState={setState} />
			<Article />
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
