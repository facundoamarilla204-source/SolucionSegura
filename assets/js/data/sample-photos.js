/**
 * SoluciónSegura — Fotografías Registradas por Categoría
 * Rutas a las imágenes fotográficas adjuntadas para el reporte urbano
 */

export const SAMPLE_PHOTOS = {
  pavimento: [
    {
      url: 'assets/img/reclamos/calles/calle-1.jpg',
      titulo: 'Vista general del bache en la calzada',
      alt: 'Fotografía del estado del asfalto y bache en la calzada de La Matanza'
    },
    {
      url: 'assets/img/reclamos/calles/calle-2.jpg',
      titulo: 'Detalle de profundidad y rotura',
      alt: 'Fotografía en primer plano de la profundidad del pozo y desprendimiento'
    },
    {
      url: 'assets/img/reclamos/calles/calle-3.jpg',
      titulo: 'Afectación del carril vehicular',
      alt: 'Fotografía de la calzada mostrando la circulación vehicular afectada'
    }
  ],
  residuos: [
    {
      url: 'assets/img/reclamos/residuos/basura-1.png',
      titulo: 'Acumulación de residuos en la vía pública',
      alt: 'Fotografía de acumulación de residuos y bolsas sobre la vía pública'
    }
  ],
  alumbrado: [
    {
      url: 'assets/img/reclamos/alumbrado/alumbrado-1.png',
      titulo: 'Luminaria apagada en columna de alumbrado',
      alt: 'Fotografía de la columna de alumbrado público con foco fuera de servicio'
    }
  ]
};

/**
 * Devuelve las fotografías correspondientes a la categoría
 */
export function getSamplePhotosForCategory(categoria) {
  const cat = (categoria || 'pavimento').toLowerCase();
  return SAMPLE_PHOTOS[cat] || SAMPLE_PHOTOS.pavimento;
}

/**
 * Resuelve la ruta relativa adecuada según el basePath de la página
 */
export function resolvePhotoPath(relPath, basePath = '../') {
  if (!relPath) return '';
  if (relPath.startsWith('http') || relPath.startsWith('data:')) return relPath;
  if (relPath.startsWith('../') || relPath.startsWith('./')) return relPath;
  return `${basePath}${relPath}`;
}
