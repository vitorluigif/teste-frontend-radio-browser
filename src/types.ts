export interface Station {
  stationuuid: string;     // ID único da estação
  name: string;            // Nome da estação
  country: string;         // País da estação
  favicon: string;         // URL do ícone da estação
  url: string;             // URL original da estação
  url_resolved: string;    // URL resolvida para tocar o stream
  tags?: string[];         // Tags ou categorias da estação (opcional)
  bitrate?: number;        // Taxa de bits do stream (opcional)
  codec?: string;          // Codec usado pela estação (opcional)
  language?: string;       // Idioma da estação (opcional)
  votes?: number;          // Votos da estação (opcional)
  isPlaying?: boolean;     // Indica se está tocando (opcional)
}
