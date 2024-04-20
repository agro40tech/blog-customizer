import { SyntheticEvent, useLayoutEffect, useRef, useState } from 'react';

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
import styles from './ArticleParamsForm.module.scss';

type TProps = {
	setState: (value: ArticleStateType) => void;
};

export const ArticleParamsForm = ({ setState }: TProps) => {
	const [open, setOpen] = useState<boolean>(false);

	// Состояние параметров формы
	const [selectedOpt, setSelectedOpt] =
		useState<ArticleStateType>(defaultArticleState);

	// Refs для элементов
	const sidebarRef = useRef<HTMLElement | null>(null);
	const rowBtnRef = useRef<HTMLDivElement | null>(null);

	// Хендлеры
	const handleSubmit = (e: SyntheticEvent) => {
		e.preventDefault();
		setState(selectedOpt);
	};

	const handleReset = () => {
		setState(defaultArticleState);
		setSelectedOpt(defaultArticleState);
	};

	const handleClickOutside = (e: MouseEvent) => {
		if (
			!rowBtnRef.current?.contains(e.target as Node) &&
			!sidebarRef.current?.contains(e.target as Node)
		) {
			setOpen(false);
		}
	};

	useLayoutEffect(() => {
		if (open) {
			document.addEventListener('click', handleClickOutside);
		} else {
			document.removeEventListener('click', handleClickOutside);
		}

		// В случае если в дальнейшем его будут демонтировать то же убираем слушатель
		return () => {
			document.removeEventListener('click', handleClickOutside);
		};
	}, [open]);

	return (
		<>
			<ArrowButton onClick={() => setOpen(!open)} open={open} ref={rowBtnRef} />
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
							setSelectedOpt({
								...selectedOpt,
								fontFamilyOption: option,
							})
						}
						options={fontFamilyOptions}
						selected={selectedOpt.fontFamilyOption}
						title='шрифт'
					/>

					{/* Выбор размеров шрифта */}
					<RadioGroup
						name='font'
						onChange={(option) =>
							setSelectedOpt({
								...selectedOpt,
								fontSizeOption: option,
							})
						}
						options={fontSizeOptions}
						selected={selectedOpt.fontSizeOption}
						title='размер шрифта'
					/>

					{/* Выбор цвета шрифта */}
					<Select
						onChange={(option) =>
							setSelectedOpt({
								...selectedOpt,
								fontColor: option,
							})
						}
						options={fontColors}
						selected={selectedOpt.fontColor}
						title='цвет шрифта'
					/>

					{/* Разделение формы */}
					<Separator />

					{/* Выбор цвета страницы */}
					<Select
						onChange={(option) =>
							setSelectedOpt({
								...selectedOpt,
								backgroundColor: option,
							})
						}
						options={backgroundColors}
						selected={selectedOpt.backgroundColor}
						title='цвет фона'
					/>

					{/* Выбор ширины контента */}
					<Select
						onChange={(option) =>
							setSelectedOpt({
								...selectedOpt,
								contentWidth: option,
							})
						}
						options={contentWidthArr}
						selected={selectedOpt.contentWidth}
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
