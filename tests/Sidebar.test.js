import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Sidebar from '../src/components/Sidebar';

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

const mockFavorites = [];
const toggleFavorite = jest.fn();

describe('Sidebar', () => {
  test('renderiza as estações corretamente', () => {
    render(
      <Sidebar
        stations={mockStations}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        loading={false}
        fetchStations={jest.fn()}
        totalStations={100000}
        handleNextPage={jest.fn()}
        handlePreviousPage={jest.fn()}
        currentPage={1}
      />
    );

    expect(screen.getByText('Newstalk ZB Auckland')).toBeInTheDocument();
  });

  test('exibe o ícone de favoritar quando clicado', () => {
    render(
      <Sidebar
        stations={mockStations}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        loading={false}
        fetchStations={jest.fn()}
        totalStations={100000}
        handleNextPage={jest.fn()}
        handlePreviousPage={jest.fn()}
        currentPage={1}
      />
    );

    fireEvent.click(screen.getByText('Newstalk ZB Auckland'));
    expect(toggleFavorite).toHaveBeenCalledTimes(1);
  });

  test('mostra o spinner durante o carregamento', () => {
    render(
      <Sidebar
        stations={mockStations}
        favorites={mockFavorites}
        toggleFavorite={toggleFavorite}
        loading={true}
        fetchStations={jest.fn()}
        totalStations={100000}
        handleNextPage={jest.fn()}
        handlePreviousPage={jest.fn()}
        currentPage={1}
      />
    );

    expect(screen.getByRole('status')).toBeInTheDocument();
  });
});
