///<reference types = "cypress"/>

describe('добавление ингредиента', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000');
  });
  it('добавление булочки', function () {
    cy.get('[data-cy=constructor]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor-bun-1]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-cy=constructor-bun-2]').contains('Краторная булка N-200i').should('exist');
  });
  it('добавление ингредиентов', function () {
    cy.get('[data-cy=constructor]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('not.exist');
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor]').contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('exist');
  });
});

describe('работа модального окна', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000');
  });
  it('открытие модального окна', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals').contains('Краторная булка N-200i').should('exist');
  });
  it('закрытие модального окна нажатием на крестик', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.contains('Детали ингредиента').should('not.exist');
  });
  it('закрытие модального окна кликом на оверлей', function () {
    cy.contains('Детали ингредиента').should('not.exist');
    cy.contains('Краторная булка N-200i').click();
    cy.contains('Детали ингредиента').should('exist');
    cy.get('[data-cy=modal-overlay]').click('top', { force: true });
    cy.contains('Детали ингредиента').should('not.exist');
  });
});

describe('создание заказа', function () {
  beforeEach(function () {
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    cy.intercept('POST', 'api/orders', { fixture: 'order.json' });
    window.localStorage.setItem(
      'refreshToken',
      JSON.stringify('test-refresh-token')
    );
    cy.setCookie('accessToken', 'test-access-token');
    cy.viewport(1920, 1080);
    cy.visit('http://localhost:4000');
  });
  this.afterEach(function () {
    cy.clearAllLocalStorage();
    cy.clearCookies();
  });
  it('создание заказа бургера', function () {
    cy.get('[data-cy=constructor]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
    cy.get('[data-cy=bun-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=main-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=sauce-ingredients]').contains('Добавить').click();
    cy.get('[data-cy=constructor]').contains('Краторная булка N-200i').should('exist');
    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('exist');
    cy.get('[data-cy=constructor]').contains('Биокотлета из марсианской Магнолии').should('exist');
    cy.get('[data-cy=order-number]').should('not.exist');
    cy.get('[data-cy=order-button]').contains('Оформить заказ').click();
    cy.get('[data-cy=order-number]').contains('123').should('exist');
    cy.get('#modals button[aria-label="Закрыть"]').click();
    cy.get('[data-cy=order-number]').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Краторная булка N-200i').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Соус Spicy-X').should('not.exist');
    cy.get('[data-cy=constructor]').contains('Биокотлета из марсианской Магнолии').should('not.exist');
  });
});