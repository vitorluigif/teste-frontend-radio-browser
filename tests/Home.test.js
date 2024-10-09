import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import Home from '../src/pages/Home'
import { fetchStations } from '../src/api/radioApi';
import { saveToLocalStorage, getFromLocalStorage } from '../src/utils/localStorageUtils';

jest.mock('../src/api/radioApi');
jest.mock('../src/utils/localStorageUtils');

const mockStations = [
  {
    stationuuid: 'a25700ef-e952-4b73-8b4e-b92d938cb020',
    name: 'Newstalk ZB Auckland',
    country: 'New Zealand',
    favicon: 'https://www.newstalkzb.co.nz/content/news/images/interface/icons/newstalkzb/apple-touch-icon.png',
    url: 'https://ais-nzme.streamguys1.com/nz_002_aac',
    url_resolved: 'https://ais-nzme.streamguys1.com/nz_002_aac',
  },
];

describe('Home', () => {
  beforeEach(() => {
    fetchStations.mockResolvedValue(mockStations);
    getFromLocalStorage.mockReturnValue([]);
    saveToLocalStorage.mockImplementation(() => {});
  });

  test('renderiza a Home com estações e favoritos', async () => {
    render(<Home />);

    expect(screen.getByText(/Favorite Radios/i)).toBeInTheDocument();
    expect(await screen.findByText('Newstalk ZB Auckland')).toBeInTheDocument();
  });

  test('favorita uma estação corretamente', async () => {
    render(<Home />);

    const station = await screen.findByText('Newstalk ZB Auckland');
    fireEvent.click(station);

    expect(saveToLocalStorage).toHaveBeenCalledWith('favorites', expect.any(Array));
  });

  test('abre o modal de edição ao clicar no lápis', async () => {
    render(<Home />);

    const editButton = await screen.findByRole('button', { name: /edit/i });
    fireEvent.click(editButton);

    expect(screen.getByText(/Editar Informação da Rádio/i)).toBeInTheDocument();
  });

  test('navega para a próxima página', async () => {
    await act(async () => {
      render(<Home />);
  
      const nextButton = await screen.findByText(/Next/i);
      fireEvent.click(nextButton);
  
      expect(fetchStations).toHaveBeenCalledTimes(2);
    });
  });
});
