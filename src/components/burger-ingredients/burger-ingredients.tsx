import { useState, useRef, useEffect, FC, useMemo } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode, TIngredient } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useAppSelector } from '../../services/store';
import { 
  selectIngredients,
  selectIngredientsLoading,
  selectIngredientsError
} from '../../services/slices/ingredientsSlice';

export const BurgerIngredients: FC = () => {
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);

  // Получаем данные из хранилища
  const ingredients = useAppSelector(selectIngredients);
  const loading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);

  // Фильтруем ингредиенты по типам
  const [buns, mains, sauces] = useMemo(() => {
    const buns = ingredients.filter((item: TIngredient) => item.type === 'bun');
    const mains = ingredients.filter((item: TIngredient) => item.type === 'main');
    const sauces = ingredients.filter((item: TIngredient) => item.type === 'sauce');
    return [buns, mains, sauces];
  }, [ingredients]);

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

  return (tab: string) => { 
    const validTab = tab as TTabMode; 
    setCurrentTab(validTab);
    refMap[validTab].current?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'start'
    });
  };
}, []);

  // Состояния загрузки и ошибки
  if (loading) return <div className="loading-message">Загрузка ингредиентов...</div>;
  if (error) return <div className="error-message">Ошибка: {error}</div>;

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