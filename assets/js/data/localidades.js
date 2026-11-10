/**
 * SoluciónSegura — Localidades del Partido de La Matanza
 * Coordenadas aproximadas y centros para mapa
 */

export const LOCALIDADES_LA_MATANZA = [
  { id: 'san-justo', nombre: 'San Justo', lat: -34.6791, lng: -58.5574, esCabecera: true },
  { id: 'ramos-mejia', nombre: 'Ramos Mejía', lat: -34.6494, lng: -58.5638 },
  { id: 'lomas-del-mirador', nombre: 'Lomas del Mirador', lat: -34.6642, lng: -58.5369 },
  { id: 'villa-luzuriaga', nombre: 'Villa Luzuriaga', lat: -34.6798, lng: -58.5956 },
  { id: 'isidro-casanova', nombre: 'Isidro Casanova', lat: -34.7082, lng: -58.5802 },
  { id: 'laferrere', nombre: 'Gregorio de Laferrere', lat: -34.7501, lng: -58.5861 },
  { id: 'gonzalez-catan', nombre: 'González Catán', lat: -34.7708, lng: -58.6256 },
  { id: 'virrey-del-pino', nombre: 'Virrey del Pino', lat: -34.8252, lng: -58.6534 },
  { id: 'ciudad-evita', nombre: 'Ciudad Evita', lat: -34.7176, lng: -58.5289 },
  { id: 'tapiales', nombre: 'Tapiales', lat: -34.7042, lng: -58.5082 },
  { id: 'aldo-bonzi', nombre: 'Aldo Bonzi', lat: -34.7183, lng: -58.5133 },
  { id: 'villa-madero', nombre: 'Villa Madero', lat: -34.6942, lng: -58.4958 },
  { id: 'villa-celina', nombre: 'Villa Celina', lat: -34.7011, lng: -58.4772 },
  { id: 'la-tablada', nombre: 'La Tablada', lat: -34.6853, lng: -58.5258 },
  { id: 'rafael-castillo', nombre: 'Rafael Castillo', lat: -34.7186, lng: -58.6186 },
  { id: 'veinte-de-junio', nombre: '20 de Junio', lat: -34.8014, lng: -58.7056 }
];

export const MAPA_CONFIG = {
  centroDefault: [-34.7000, -58.5800], // Centro geográfico aproximado del partido
  zoomDefault: 12,
  zoomLocalidad: 14,
  bounds: [
    [-34.8800, -58.7800], // Sudoeste
    [-34.6200, -58.4400]  // Noreste
  ]
};

