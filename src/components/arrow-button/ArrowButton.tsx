import { clsx } from 'clsx';

import arrow from 'src/images/arrow.svg';

import styles from './ArrowButton.module.scss';
import { forwardRef } from 'react';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

type TProps = {
	onClick: OnClick;
	open: boolean;
};

export const ArrowButton = forwardRef<HTMLDivElement, TProps>((props, ref) => {
	return (
		/* Не забываем указаывать role и aria-label атрибуты для интерактивных элементов */
		<div
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, {
				[styles.container_open]: props.open,
			})}
			onClick={props.onClick}
			ref={ref}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: props.open })}
			/>
		</div>
	);
});

// Явно уазываем имя компонента
ArrowButton.displayName = 'ArrowButton';
