import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI } from '@ui';
import { useAppDispatch, useAppSelector } from '../../services/store';
import { fetchIngredients } from '../../services/slices/ingredientsSlice';
import {
  selectBuns,
  selectMains,
  selectSauces,
  selectIngredientsLoading,
  selectIngredientsError,
  selectAllIngredients
} from '../../services/selectors';

export const BurgerIngredients: FC = () => {
  const dispatch = useAppDispatch();
  const buns = useAppSelector(selectBuns);
  const mains = useAppSelector(selectMains);
  const sauces = useAppSelector(selectSauces);
  const loading = useAppSelector(selectIngredientsLoading);
  const error = useAppSelector(selectIngredientsError);
  const ingredientsState = useAppSelector(state => state.ingredients);
  
  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');
  const titleBunRef = useRef<HTMLHeadingElement>(null);
  const titleMainRef = useRef<HTMLHeadingElement>(null);
  const titleSaucesRef = useRef<HTMLHeadingElement>(null);
  

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 });
  const [mainsRef, inViewFilling] = useInView({ threshold: 0 });
  const [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  useEffect(() => {
    console.log('Начало вызова fetchIngredients'); // Должен появиться в консоли
    dispatch(fetchIngredients())
      .unwrap()
      .then(() => console.log('fetchIngredients завершился успешно'))
      .catch((err) => console.error('Ошибка fetchIngredients:', err));
  }, [dispatch]);

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewFilling) setCurrentTab('main');
  }, [inViewBuns, inViewFilling, inViewSauces]);

  if (loading) return <div>Загрузка ингредиентов...</div>;
  if (error) return <div>Ошибка: {error.toString()}</div>;

  const onTabClick = (tab: string) => {
    const refMap = {
      bun: titleBunRef,
      main: titleMainRef,
      sauce: titleSaucesRef
    } as const;
    
    setCurrentTab(tab as TTabMode);
    refMap[tab as TTabMode].current?.scrollIntoView({ behavior: 'smooth' });
  };

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