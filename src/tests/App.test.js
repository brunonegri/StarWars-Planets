import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import App from '../App';
import mock from './mock'
import userEvent from '@testing-library/user-event'

describe('Testes da aplicação',()=>{
  beforeEach(async ()=>{
    global.fetch = jest.fn(()=> Promise.resolve(({json: ()=> Promise.resolve(mock)})))
    await act(async () => {
      render(<App />);
    })
  })
  afterEach(()=>{
    jest.clearAllMocks();
    cleanup();
  })

  test('Testa se os botões e inputs renderizam', () => {
    const nameFilter = screen.getByTestId('name-filter')
    const columnFilter = screen.getByTestId('column-filter')
    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')

    expect(nameFilter).toBeInTheDocument();
    expect(columnFilter).toBeInTheDocument();
    expect(comparisonFilter).toBeInTheDocument();
    expect(valueFilter).toBeInTheDocument();
    expect(btnFilter).toBeInTheDocument();
  });

  test('Testa a chamada do fetch', async ()=>{
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)
  })

  test('Testa funcionalidade dos filtros', async () => {
    expect(fetch).toHaveBeenCalled()
    expect(await screen.findAllByRole('row')).toHaveLength(11)

    const comparisonFilter = screen.getByTestId('comparison-filter')
    const valueFilter = screen.getByTestId('value-filter')
    const btnFilter = screen.getByTestId('button-filter')

    userEvent.click(comparisonFilter)

    userEvent.click(screen.getByRole('option', { name: /maior que/i }));

    userEvent.type(valueFilter, '1000000')
    userEvent.click(btnFilter);

    expect(await screen.findAllByRole('row')).toHaveLength(7)
  });

})
