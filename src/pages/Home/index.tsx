import { useState, useEffect, useCallback } from "react";
import Sidebar from "../../components/Sidebar";
import { fetchStations } from "../../api/radioApi";
import { Station } from "../../types";
import Modal from "../../components/Modal";
import {
  saveToLocalStorage,
  getFromLocalStorage,
} from "../../utils/localStorageUtils";
import { Pencil, Stop, Play, Trash, List } from "phosphor-react";
import React from "react";

const Home: React.FC = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const [favorites, setFavorites] = useState<Station[]>(() =>
    getFromLocalStorage<Station[]>("favorites", [])
  );
  const [loading, setLoading] = useState(true);
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredFavorites, setFilteredFavorites] = useState<Station[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const itemsPerPage = 10;
  const totalStations = 100000;

  const getStations = useCallback(
    async (limit: number = 10, offset: number = 0) => {
      try {
        setLoading(true);
        const data = await fetchStations(limit, offset);
        setStations(data);
      } catch (error) {
        console.error("Failed to fetch stations:", error);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    getStations(itemsPerPage, offset);
  }, [currentPage]);

  useEffect(() => {
    saveToLocalStorage("favorites", favorites);
  }, [favorites]);

  useEffect(() => {
    // Filtra os favoritos com base no termo de busca
    const filtered = favorites.filter((fav) =>
      fav.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFavorites(filtered);
  }, [searchTerm, favorites]);

  const toggleFavorite = (station: Station) => {
    const isFavorite = favorites.some(
      (fav) => fav.stationuuid === station.stationuuid
    );
    if (isFavorite) {
      setFavorites(
        favorites.filter((fav) => fav.stationuuid !== station.stationuuid)
      );
    } else {
      setFavorites([...favorites, station]);
    }
  };

  const removeFavorite = (stationuuid: string) => {
    setFavorites(favorites.filter((fav) => fav.stationuuid !== stationuuid));
  };

  const playStation = (station: Station) => {
    setCurrentStation(station);
    setIsPlaying(true);
  };

  const stopStation = () => {
    setIsPlaying(false);
  };

  const openEditModal = (station: Station) => {
    setCurrentStation(station);
    setIsModalOpen(true);
  };

  const handleSave = (updatedStation: Station) => {
    setStations((prevStations) =>
      prevStations.map((s) =>
        s.stationuuid === updatedStation.stationuuid ? updatedStation : s
      )
    );
  };

  const handleNextPage = () => {
    if (currentPage * itemsPerPage < totalStations) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="relative flex">
      {/* Sidebar sempre aberta para telas grandes e controlada no mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-40 transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform sm:translate-x-0 sm:relative sm:w-64`}
      >
        <Sidebar
          stations={stations}
          favorites={favorites}
          toggleFavorite={toggleFavorite}
          loading={loading}
          fetchStations={getStations}
          totalStations={totalStations}
          handleNextPage={handleNextPage}
          handlePreviousPage={handlePreviousPage}
          currentPage={currentPage}
        />

        {sidebarOpen && (
          <button
            className="absolute top-4 right-4 sm:hidden p-4 z-50"
            onClick={() => setSidebarOpen(false)}
          >
            <List size={32} className="text-white" />
          </button>
        )}
      </div>

      {/* Seção de Favoritos */}
      <div
        className={`flex-grow bg-gray-900 text-white p-6 h-screen ${
          sidebarOpen ? "mt-12" : ""
        }`}
      >
        <div>
          {/* Botão de menu para mobile */}
          {!sidebarOpen && (
            <button
              className="sm:hidden p-4 z-50"
              onClick={() => setSidebarOpen(true)}
            >
              <List size={32} className="text-white" />
            </button>
          )}

          <h2 className="text-xl mb-4">Favorite Radios</h2>
        </div>

        <div className="w-full p-4 bg-gray-800">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Pesquise uma estação"
            className="w-full p-2 rounded bg-gray-700 text-white"
          />
        </div>
        <div className="flex flex-col space-y-3 mt-5">
          {filteredFavorites.length === 0 ? (
            <p>Nenhuma rádio adicionada ainda.</p>
          ) : (
            filteredFavorites.map((fav) => (
              <div
                key={fav.stationuuid}
                className="flex justify-between items-center bg-gray-700 rounded-lg p-4"
              >
                <div className="flex items-center space-x-4">
                  {fav.favicon ? (
                    <img
                      src={fav.favicon}
                      alt={`${fav.name} logo`}
                      className="w-10 h-10"
                    />
                  ) : (
                    <div className="w-10 h-10 bg-gray-500"></div>
                  )}
                  <div>
                    <h3 className="font-bold">{fav.name}</h3>
                    <p className="text-sm text-gray-400">{fav.country}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <Pencil
                    size={24}
                    className="text-gray-300 cursor-pointer"
                    onClick={() => openEditModal(fav)}
                  />
                  {isPlaying &&
                  currentStation?.stationuuid === fav.stationuuid ? (
                    <Stop
                      size={24}
                      className="text-red-500 cursor-pointer"
                      onClick={stopStation}
                    />
                  ) : (
                    <Play
                      size={24}
                      className="text-green-500 cursor-pointer"
                      onClick={() => playStation(fav)}
                    />
                  )}
                  <Trash
                    size={24}
                    className="text-red-500 cursor-pointer"
                    onClick={() => removeFavorite(fav.stationuuid)}
                  />
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        station={currentStation}
        onSave={handleSave}
      />

      {currentStation && isPlaying && (
        <audio
          controls
          autoPlay
          src={currentStation.url_resolved}
          className="hidden"
        />
      )}
    </div>
  );
};

export default Home;
