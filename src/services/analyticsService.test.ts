import { getAnalytics } from './analyticsService';
import { analyticsData } from '@/mocks/mockAnalytics';

describe('Analytics Service', () => {
  test('getAnalytics debe devolver los datos correctos del dashboard', () => {
    const result = getAnalytics();

    // Verificamos que los datos coincidan con nuestro mock de datos
    expect(result).toEqual(analyticsData);
    expect(result).toHaveProperty('totalRevenue'); // Ejemplo de propiedad que debería tener
  });
});
