describe('login', () => {
  const emailSelector = '[data-cy=email] .MuiInputBase-input'
  const emailErrorSelector = '[data-cy=email] .MuiFormHelperText-root'
  const passwordSelector = '[data-cy=password] .MuiInputBase-input'
  const passwordErrorSelector = '[data-cy=password] .MuiFormHelperText-root'
  const submitSelector = '[data-cy=submit]'
  it('access', () => {
    cy.visit('http://localhost:3000/login')
  })
  it('email error', () => {
    cy.get(emailSelector).type('test').should('have.value', 'test')
    cy.get(submitSelector).click()
    cy.get(emailErrorSelector).should('have.text', '正しい形式で入力してください')
  })
  it('email success', () => {
    cy.get(emailSelector).clear().type('test@email.com').should('have.value', 'test@email.com')
    cy.get(submitSelector).click()
    cy.get(emailErrorSelector).should('not.exist');
  })
  it('password error', () => {
    cy.get(passwordSelector).type('pass').should('have.value', 'pass')
    cy.get(submitSelector).click()
    cy.get(passwordErrorSelector).should('have.text', 'パスワードは8桁以上で設定してください')
  })
  it('password success', () => {
    cy.get(passwordSelector).clear().type('password').should('have.value', 'password')
    cy.get(submitSelector).click()
    cy.get(passwordErrorSelector).should('not.exist');
  })
})