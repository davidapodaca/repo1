

describe('Verificar la info del hotel', () => {
    beforeEach(() => { // visita la paguina antes de cada prueba
      cy.visit('https://automationintesting.online/');
    });

    it('Debe haber al menos una imagen visible en la página', () => { // Verifica imagen 
    cy.get('img').should('be.visible');
  });

   it('Debe mostrar el texto de bienvenida esperado', () => { // Verifica texto de bienvenida 
    cy.contains('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.')
      .should('be.visible');
  });

  it('Debe mostrar la dirección del hotel', () => { // Verifica dirección
    cy.contains('Shady Meadows B&B, The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S')
      .should('be.visible');
  });

  it('Debe mostrar el teléfono del hotel', () => { // Verifica teléfono
    cy.contains('012345678901').should('be.visible');
  });

  it('Debe mostrar el email del hotel', () => { // Verifica email 
    cy.contains('fake@fakeemail.com').should('be.visible');
  });
});