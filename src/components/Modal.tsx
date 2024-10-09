import React, { useState, useEffect } from 'react';
import { Station } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  station: Station | null;
  onSave: (updatedStation: Station) => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, station, onSave }) => {
  const [editedStation, setEditedStation] = useState<Station | null>(station);

  useEffect(() => {
    if (station) {
      setEditedStation(station);
    }
  }, [station]);

  if (!isOpen || !editedStation) return null;

  const handleSave = () => {
    if (editedStation) {
      onSave(editedStation);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md">
        <h2 className="text-xl mb-4">Editar Informação da Rádio</h2>
        <input
          type="text"
          value={editedStation.name}
          onChange={(e) => setEditedStation({ ...editedStation, name: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          placeholder="Nome da Rádio"
        />
        <input
          type="text"
          value={editedStation.country}
          onChange={(e) => setEditedStation({ ...editedStation, country: e.target.value })}
          className="w-full p-2 border rounded mb-4"
          placeholder="País"
        />
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-2 rounded mr-2">
            Cancelar
          </button>
          <button onClick={handleSave} className="bg-blue-500 text-white px-4 py-2 rounded">
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
