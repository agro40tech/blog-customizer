import { SyntheticEvent, useRef, useState } from 'react';

import { clsx } from 'clsx';

import { Button } from 'components/button';
import { ArrowButton } from 'components/arrow-button';
import {
	ArticleStateType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';

import { Text } from '../text';
import { Select } from '../select';
import { Separator } from '../separator';
import { RadioGroup } from '../radio-group';
import { useClose } from './hooks/useClose';
import styles from './ArticleParamsForm.module.scss';

type TProps = {
	setArticleState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setArticleState }: TProps) => {
	const [open, setOpen] = useState<boolean>(false);

	// Состояние параметров формы
	const [formState, setFormState] =
		useState<ArticleStateType>(defaultArticleState);

	// Refs для элементов
	const sidebarRef = useRef<HTMLElement | null>(null);

	// Хендлеры
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setArticleState(formState);
	};

	const handleReset = () => {
		setArticleState(defaultArticleState);
		setFormState(defaultArticleState);
	};

	// Хук для ивентов закрытия сайдбара
	useClose({
		isOpen: open,
		onClose: () => setOpen(false),
		rootRef: sidebarRef,
	});

	return (
		<>
			<ArrowButton onClick={() => setOpen(!open)} open={open} />
			<aside
				className={clsx(styles.container, { [styles.container_open]: open })}
				ref={sidebarRef}>
				<form className={styles.form} onSubmit={handleSubmit}>
					<Text as='h1' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>

					{/* Выбор шрифта */}
					<Select
						onChange={(option) =>
							setFormState({
								...formState,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						selected={formState.fontFamilyOption}
						title='шрифт'
					/>

					{/* Выбор размеров шрифта */}
					<RadioGroup
						name='font'
						onChange={(option) =>
							setFormState({
								...formState,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						selected={formState.fontSizeOption}
						title='размер шрифта'
					/>

					{/* Выбор цвета шрифта */}
					<Select
						onChange={(option) =>
							setFormState({
								...formState,
								fontColor: option,
							})
						}
						options={fontColors}
						selected={formState.fontColor}
						title='цвет шрифта'
					/>

					{/* Разделение формы */}
					<Separator />

					{/* Выбор цвета страницы */}
					<Select
						onChange={(option) =>
							setFormState({
								...formState,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						selected={formState.backgroundColor}
						title='цвет фона'
					/>

					{/* Выбор ширины контента */}
					<Select
						onChange={(option) =>
							setFormState({
								...formState,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						selected={formState.contentWidth}
						title='ширина контента'
					/>

					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' onClick={handleReset} />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
