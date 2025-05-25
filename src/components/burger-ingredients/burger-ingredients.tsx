import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useAppSelector } from '../../services/store';
import {
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/selectors';

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Получаем данные из хранилища
  const { buns, mains, sauces, loading, error } = useAppSelector(state => ({
    buns: selectBuns(state),
    mains: selectMains(state),
    sauces: selectSauces(state),
    loading: selectIngredientsLoading(state),
    error: selectIngredientsError(state)
  }));

  // Настройка отслеживания видимости разделов
  const [bunsRef, inViewBuns] = useInView({ threshold: 0.1 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0.1 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0.1 });

  // Определение активного таба при скролле
  useEffect(() => {
    const visibilityMap = {
      bun: inViewBuns,
      sauce: inViewSauces,
      main: inViewFilling
    };

    const visibleSection = (Object.entries(visibilityMap).find(
      ([, isVisible]) => isVisible
    )?.[0] as TTabMode) || 'bun';

    setCurrentTab(visibleSection);
  }, [inViewBuns, inViewFilling, inViewSauces]);

  // Оптимизированный обработчик клика по табам
  const onTabClick = useMemo(() => {
    const refMap = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    };

    return (tab: TTabMode) => {
      setCurrentTab(tab);
      refMap[tab].current?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    };
  }, []);

  // Состояния загрузки и ошибки
  if (loading) return <div className="loading-message">Загрузка ингредиентов...</div>;
  if (error) return <div className="error-message">Ошибка: {error.toString()}</div>;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={buns}
      mains={mains}
      sauces={sauces}
      titleBunRef={titleBunRef}
      titleMainRef={titleMainRef}
      titleSaucesRef={titleSaucesRef}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};