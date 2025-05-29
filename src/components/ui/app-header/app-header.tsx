import React, { FC } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import styles from './app-header.module.css';
import { TAppHeaderUIProps } from './type';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon
} from '@zlden/react-developer-burger-ui-components';

export const AppHeaderUI: FC<TAppHeaderUIProps> = ({ userName }) => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <header className={styles.header}>
      <nav className={`${styles.menu} p-4`}>
        <div className={styles.menu_part_left}>
          <>
            <BurgerIcon
              type={
                path == '/' || path.startsWith('/ingredients')
                  ? 'primary'
                  : 'secondary'
              }
            />
            <NavLink
              to={'/'}
              className={({ isActive }) =>
                `text text_type_main-default ml-2 mr-10 ${
                  styles.link
                } ${isActive || path.startsWith('/ingredients') ? styles.link_active : ''}`
              }
            >
              Конструктор
            </NavLink>
          </>
          <>
            <ListIcon
              type={path.startsWith('/feed') ? 'primary' : 'secondary'}
            />
            <NavLink
              to={'/feed'}
              className={({ isActive }) =>
                `text text_type_main-default ml-2 ${
                  styles.link
                } ${isActive ? styles.link_active : ''}`
              }
            >
              Лента заказов
            </NavLink>
          </>
        </div>
        <div className={styles.logo}>
          <Logo className='' />
        </div>
        <div className={styles.link_position_last}>
          <ProfileIcon
            type={path.startsWith('/profile') ? 'primary' : 'secondary'}
          />
          <NavLink
            to={'/profile'}
            className={({ isActive }) =>
              `text text_type_main-default ml-2 ${
                styles.link
              } ${isActive ? styles.link_active : ''}`
            }
          >
            {userName || 'Личный кабинет'}
          </NavLink>
        </div>
      </nav>
    </header>
  );
};