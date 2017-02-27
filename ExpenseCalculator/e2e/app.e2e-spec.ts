import { ExpenseCalculatorPage } from './app.po';

describe('expense-calculator App', function() {
  let page: ExpenseCalculatorPage;

  beforeEach(() => {
    page = new ExpenseCalculatorPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
