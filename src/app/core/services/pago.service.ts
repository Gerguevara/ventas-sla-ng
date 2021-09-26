import { PreflightService } from '@tool-services/preflight-service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '@environments/environment';
import { CarritoService } from './carrito.service';

@Injectable({
  providedIn: 'root'
})
export class PagoService extends PreflightService {

  public municipios = [
    {
      departamento: 'Ahuachapán',
      municipio: 'Ahuachapán'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Apaneca'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Atiquizaya'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Concepción de Ataco'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'El Refugio'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Guaymango'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Jujutla'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'San Francisco Menéndez'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'San Lorenzo'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'San Pedro Puxtla'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Tacuba'
    },
    {
      departamento: 'Ahuachapán',
      municipio: 'Turín'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Candelaria de la Frontera'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Chalchuapa'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Coatepeque'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'El Congo'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'El Porvenir'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Masahuat'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Metapán'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'San Antonio Pajonal'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'San Sebastián Salitrillo'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Santa Ana'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Santa Rosa Guachipilín'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Santiago de la Frontera'
    },
    {
      departamento: 'Santa Ana',
      municipio: 'Texistepeque'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Acajutla'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Armenia'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Caluco'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Cuisnahuat'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Izalco'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Juayúa'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Nahuizalco'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Nahulingo'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Salcoatitán'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'San Antonio del Monte'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'San Julián'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Santa Catarina Masahuat'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Santa Isabel Ishuatán'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Santo Domingo Guzmán'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Sonsonate'
    },
    {
      departamento: 'Sonsonate',
      municipio: 'Sonzacate'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Agua Caliente'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Arcatao'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Azacualpa'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Chalatenango'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Comalapa'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Citalá'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Concepción Quezaltepeque'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Dulce Nombre de María'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'El Carrizal'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'El Paraíso'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'La Laguna'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'La Palma'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'La Reina'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Las Vueltas'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Nueva Concepción'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Nueva Trinidad'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Nombre de Jesús'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Ojos de Agua'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Potonico'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Antonio de la Cruz'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Antonio Los Ranchos'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Fernando'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Francisco Lempa'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Francisco Morazán'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Ignacio'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Isidro Labrador'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San José Cancasque'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San José Las Flores'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Luis del Carmen'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Miguel de Mercedes'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'San Rafael'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Santa Rita'
    },
    {
      departamento: 'Chalatenango',
      municipio: 'Tejutla'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Candelaria'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Cojutepeque'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'El Carmen'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'El Rosario'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Monte San Juan'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Oratorio de Concepción'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'San Bartolomé Perulapía'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'San Cristóbal'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'San José Guayabal'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'San Pedro Perulapán'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'San Rafael Cedros'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'San Ramón'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Santa Cruz Analquito'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Santa Cruz Michapa'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Suchitoto'
    },
    {
      departamento: 'Cuscatlán',
      municipio: 'Tenancingo'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Aguilares'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Apopa'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Ayutuxtepeque'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Cuscatancingo'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Ciudad Delgado'
    },
    {
      departamento: 'San Salvador',
      municipio: 'El Paisnal'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Guazapa'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Ilopango'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Mejicanos'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Nejapa'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Panchimalco'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Rosario de Mora'
    },
    {
      departamento: 'San Salvador',
      municipio: 'San Marcos'
    },
    {
      departamento: 'San Salvador',
      municipio: 'San Martín'
    },
    {
      departamento: 'San Salvador',
      municipio: 'San Salvador'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Santiago Texacuangos'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Santo Tomás'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Soyapango'
    },
    {
      departamento: 'San Salvador',
      municipio: 'Tonacatepeque'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Antiguo Cuscatlán'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Chiltiupán'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Ciudad Arce'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Colón'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Comasagua'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Huizúcar'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Jayaque'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Jicalapa'
    },
    {
      departamento: 'La Libertad',
      municipio: 'La Libertad'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Santa Tecla'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Nuevo Cuscatlán'
    },
    {
      departamento: 'La Libertad',
      municipio: 'San Juan Opico'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Quezaltepeque'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Sacacoyo'
    },
    {
      departamento: 'La Libertad',
      municipio: 'San José Villanueva'
    },
    {
      departamento: 'La Libertad',
      municipio: 'San Matías'
    },
    {
      departamento: 'La Libertad',
      municipio: 'San Pablo Tacachico'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Talnique'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Tamanique'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Teotepeque'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Tepecoyo'
    },
    {
      departamento: 'La Libertad',
      municipio: 'Zaragoza'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Apastepeque'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Guadalupe'
    },
    {
      departamento: 'San Vicente',
      municipio: 'San Cayetano Istepeque'
    },
    {
      departamento: 'San Vicente',
      municipio: 'San Esteban Catarina'
    },
    {
      departamento: 'San Vicente',
      municipio: 'San Ildefonso'
    },
    {
      departamento: 'San Vicente',
      municipio: 'San Lorenzo'
    },
    {
      departamento: 'San Vicente',
      municipio: 'San Sebastián'
    },
    {
      departamento: 'San Vicente',
      municipio: 'San Vicente'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Santa Clara'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Santo Domingo'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Tecoluca'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Tepetitán'
    },
    {
      departamento: 'San Vicente',
      municipio: 'Verapaz'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Cinquera'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Dolores'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Guacotecti'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Ilobasco'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Jutiapa'
    },
    {
      departamento: 'Cabañas',
      municipio: 'San Isidro'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Sensuntepeque'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Tejutepeque'
    },
    {
      departamento: 'Cabañas',
      municipio: 'Victoria'
    },
    {
      departamento: 'La Paz',
      municipio: 'Cuyultitán'
    },
    {
      departamento: 'La Paz',
      municipio: 'El Rosario'
    },
    {
      departamento: 'La Paz',
      municipio: 'Jerusalén'
    },
    {
      departamento: 'La Paz',
      municipio: 'Mercedes La Ceiba'
    },
    {
      departamento: 'La Paz',
      municipio: 'Olocuilta'
    },
    {
      departamento: 'La Paz',
      municipio: 'Paraíso de Osorio'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Antonio Masahuat'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Emigdio'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Francisco Chinameca'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Juan Nonualco'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Juan Talpa'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Juan Tepezontes'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Luis Talpa'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Luis La Herradura'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Miguel Tepezontes'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Pedro Masahuat'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Pedro Nonualco'
    },
    {
      departamento: 'La Paz',
      municipio: 'San Rafael Obrajuelo'
    },
    {
      departamento: 'La Paz',
      municipio: 'Santa María Ostuma'
    },
    {
      departamento: 'La Paz',
      municipio: 'Santiago Nonualco'
    },
    {
      departamento: 'La Paz',
      municipio: 'Tapalhuaca'
    },
    {
      departamento: 'La Paz',
      municipio: 'Zacatecoluca'
    },
    {
      departamento: 'Usulután',
      municipio: 'Alegría'
    },
    {
      departamento: 'Usulután',
      municipio: 'Berlín'
    },
    {
      departamento: 'Usulután',
      municipio: 'California'
    },
    {
      departamento: 'Usulután',
      municipio: 'Concepción Batres'
    },
    {
      departamento: 'Usulután',
      municipio: 'El Triunfo'
    },
    {
      departamento: 'Usulután',
      municipio: 'Ereguayquín'
    },
    {
      departamento: 'Usulután',
      municipio: 'Estanzuelas'
    },
    {
      departamento: 'Usulután',
      municipio: 'Jiquilisco'
    },
    {
      departamento: 'Usulután',
      municipio: 'Jucuapa'
    },
    {
      departamento: 'Usulután',
      municipio: 'Jucuarán'
    },
    {
      departamento: 'Usulután',
      municipio: 'Mercedes Umaña'
    },
    {
      departamento: 'Usulután',
      municipio: 'Nueva Granada'
    },
    {
      departamento: 'Usulután',
      municipio: 'Ozatlán'
    },
    {
      departamento: 'Usulután',
      municipio: 'Puerto El Triunfo'
    },
    {
      departamento: 'Usulután',
      municipio: 'San Agustín'
    },
    {
      departamento: 'Usulután',
      municipio: 'San Buenaventura'
    },
    {
      departamento: 'Usulután',
      municipio: 'San Dionisio'
    },
    {
      departamento: 'Usulután',
      municipio: 'San Francisco Javier'
    },
    {
      departamento: 'Usulután',
      municipio: 'Santa Elena'
    },
    {
      departamento: 'Usulután',
      municipio: 'Santa María'
    },
    {
      departamento: 'Usulután',
      municipio: 'Santiago de María'
    },
    {
      departamento: 'Usulután',
      municipio: 'Tecapán'
    },
    {
      departamento: 'Usulután',
      municipio: 'Usulután'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Carolina'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Chapeltique'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Chinameca'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Chirilagua'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Ciudad Barrios'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Comacarán'
    },
    {
      departamento: 'San Miguel',
      municipio: 'El Tránsito'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Lolotique'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Moncagua'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Nueva Guadalupe'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Nuevo Edén de San Juan'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Quelepa'
    },
    {
      departamento: 'San Miguel',
      municipio: 'San Antonio del Mosco'
    },
    {
      departamento: 'San Miguel',
      municipio: 'San Gerardo'
    },
    {
      departamento: 'San Miguel',
      municipio: 'San Jorge'
    },
    {
      departamento: 'San Miguel',
      municipio: 'San Luis de la Reina'
    },
    {
      departamento: 'San Miguel',
      municipio: 'San Miguel'
    },
    {
      departamento: 'San Miguel',
      municipio: 'San Rafael Oriente'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Sesori'
    },
    {
      departamento: 'San Miguel',
      municipio: 'Uluazapa'
    },
    {
      departamento: 'Morazán',
      municipio: 'Arambala'
    },
    {
      departamento: 'Morazán',
      municipio: 'Cacaopera'
    },
    {
      departamento: 'Morazán',
      municipio: 'Chilanga'
    },
    {
      departamento: 'Morazán',
      municipio: 'Corinto'
    },
    {
      departamento: 'Morazán',
      municipio: 'Delicias de Concepción'
    },
    {
      departamento: 'Morazán',
      municipio: 'El Divisadero'
    },
    {
      departamento: 'Morazán',
      municipio: 'El Rosario'
    },
    {
      departamento: 'Morazán',
      municipio: 'Gualococti'
    },
    {
      departamento: 'Morazán',
      municipio: 'Guatajiagua'
    },
    {
      departamento: 'Morazán',
      municipio: 'Joateca'
    },
    {
      departamento: 'Morazán',
      municipio: 'Jocoaitique'
    },
    {
      departamento: 'Morazán',
      municipio: 'Jocoro'
    },
    {
      departamento: 'Morazán',
      municipio: 'Lolotiquillo'
    },
    {
      departamento: 'Morazán',
      municipio: 'Meanguera'
    },
    {
      departamento: 'Morazán',
      municipio: 'Osicala'
    },
    {
      departamento: 'Morazán',
      municipio: 'Perquín'
    },
    {
      departamento: 'Morazán',
      municipio: 'San Carlos'
    },
    {
      departamento: 'Morazán',
      municipio: 'San Fernando'
    },
    {
      departamento: 'Morazán',
      municipio: 'San Francisco Gotera'
    },
    {
      departamento: 'Morazán',
      municipio: 'San Isidro'
    },
    {
      departamento: 'Morazán',
      municipio: 'San Simón'
    },
    {
      departamento: 'Morazán',
      municipio: 'Sensembra'
    },
    {
      departamento: 'Morazán',
      municipio: 'Sociedad'
    },
    {
      departamento: 'Morazán',
      municipio: 'Torola'
    },
    {
      departamento: 'Morazán',
      municipio: 'Yamabal'
    },
    {
      departamento: 'Morazán',
      municipio: 'Yoloaiquín'
    },
    {
      departamento: 'La Unión',
      municipio: 'Anamorós'
    },
    {
      departamento: 'La Unión',
      municipio: 'Bolívar'
    },
    {
      departamento: 'La Unión',
      municipio: 'Concepción de Oriente'
    },
    {
      departamento: 'La Unión',
      municipio: 'Conchagua'
    },
    {
      departamento: 'La Unión',
      municipio: 'El Carmen'
    },
    {
      departamento: 'La Unión',
      municipio: 'El Sauce'
    },
    {
      departamento: 'La Unión',
      municipio: 'Intipucá'
    },
    {
      departamento: 'La Unión',
      municipio: 'La Unión'
    },
    {
      departamento: 'La Unión',
      municipio: 'Lislique'
    },
    {
      departamento: 'La Unión',
      municipio: 'Meanguera del Golfo'
    },
    {
      departamento: 'La Unión',
      municipio: 'Nueva Esparta'
    },
    {
      departamento: 'La Unión',
      municipio: 'Pasaquina'
    },
    {
      departamento: 'La Unión',
      municipio: 'Polorós'
    },
    {
      departamento: 'La Unión',
      municipio: 'San Alejo'
    },
    {
      departamento: 'La Unión',
      municipio: 'San José'
    },
    {
      departamento: 'La Unión',
      municipio: 'Santa Rosa de Lima'
    },
    {
      departamento: 'La Unión',
      municipio: 'Yayantique'
    },
    {
      departamento: 'La Unión',
      municipio: 'Yucuaiquín'
    },
  ];

  constructor(
    private http: HttpClient,
    private carritoService: CarritoService
  ) {
    super();
    console.log(JSON.stringify(this.carritoService.obtenerCarrito()));
  }

  enviarDatosPago(infoEnvio: any, infoPago: any): Observable<any> {
    const carritoJson = this.carritoService.obtenerCarrito();
    return this.http.post<any>(`${environment.apiUrl}${environment.endpoints.completarCompra}`, {
      nombres: infoEnvio.nombres,
      apellidos: infoEnvio.apellidos,
      email: infoEnvio.email,
      telefono: infoEnvio.telefono.toString(),
      departamento: infoEnvio.departamento,
      municipio: infoEnvio.municipio,
      infoAdicionalDireccion: infoEnvio.direccion,
      metodoDePago: 1,
      nombresSegunTarjeta: infoPago.nombres,
      apellidosSegunTarjeta: infoPago.apellidos,
      numTarjeta: infoPago.tarjeta.toString(),
      mes: infoPago.mes.toString(),
      anio: infoPago.anio.toString(),
      cvv: infoPago.cvv.toString(),
      dui: infoPago.dui.toString().split('-').join(''),
      nit: infoPago.nit.toString().split('-').join(''),
      carrito: carritoJson,
    }, this.setOptions());
  }
}
