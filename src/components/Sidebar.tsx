import {
  CheckCircle,
  Circle,
  ArrowLeft,
  ArrowRight,
  Spinner,
} from "phosphor-react";
import { useState, useEffect } from "react";
import { Station } from "../types";
import React from 'react';

interface SidebarProps {
  stations: Station[];
  favorites: Station[];
  toggleFavorite: (station: Station) => void;
  loading: boolean;
  fetchStations: (limit: number, offset: number) => void;
  totalStations: number;
  currentPage: number;
  handleNextPage: () => void;
  handlePreviousPage: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  stations,
  favorites,
  toggleFavorite,
  loading,
  fetchStations,
  totalStations,
  currentPage,
  handleNextPage,
  handlePreviousPage,
}) => {
  const itemsPerPage = 10;
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredStations, setFilteredStations] = useState(stations);
  const [filterCriteria, setFilterCriteria] = useState<keyof Station>('name');

  useEffect(() => {
    const offset = (currentPage - 1) * itemsPerPage;
    fetchStations(itemsPerPage, offset);
  }, [currentPage, fetchStations]);

  useEffect(() => {
    const filtered = stations.filter((station) => {
      const valueToFilter = station[filterCriteria];
      if (typeof valueToFilter === 'string') {
        return valueToFilter.toLowerCase().includes(searchTerm.toLowerCase());
      }
      return false;
    });
    setFilteredStations(filtered);
  }, [searchTerm, stations, filterCriteria]);
  

  return (
    <div className="w-full sm:w-64 bg-gray-800 text-white p-4 flex flex-col h-screen">
      {/* Search input */}
      <input
        type="text"
        placeholder={`Search by ${filterCriteria}`}
        className="bg-gray-700 rounded-lg p-2 mb-4 text-white"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Filter select */}
      <select
        className="bg-gray-700 text-white p-2 rounded-lg mb-4"
        value={filterCriteria}
        onChange={(e) => setFilterCriteria(e.target.value as keyof Station)}
      >
        <option value="name">Name</option>
        <option value="country">Country</option>
        <option value="language">Language</option>
      </select>

       {/* Stations */}
      <div className="flex-grow flex flex-col space-y-3 overflow-y-auto">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Spinner size={32} className="animate-spin text-white" role="status" />
          </div>
        ) : (
          filteredStations.map((station) => (
            <div
              key={station.stationuuid}
              className="flex justify-between items-center bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition cursor-pointer"
              onClick={() => toggleFavorite(station)}
            >
              <span className="truncate w-4/5">{station.name}</span>
              {favorites.some(
                (fav) => fav.stationuuid === station.stationuuid
              ) ? (
                <CheckCircle
                  size={24}
                  className="text-blue-500 flex-shrink-0"
                />
              ) : (
                <Circle size={24} className="text-gray-400 flex-shrink-0" />
              )}
            </div>
          ))
        )}
      </div>

      {/* Pagination buttons */}
      <div className="mt-4 flex justify-between">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className={`flex items-center ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <ArrowLeft size={24} />
          <span className="ml-2">Previous</span>
        </button>

        <button
          onClick={handleNextPage}
          disabled={currentPage * itemsPerPage >= totalStations}
          className={`flex items-center ${
            currentPage * itemsPerPage >= totalStations
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <span className="mr-2">Next</span>
          <ArrowRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
