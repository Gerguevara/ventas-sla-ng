// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appTitle: "SLA S.A. de C.V.",
  //con / final
  apiUrl: "http://localhost:8000/api/",
  allowedOrigin:"http://localhost:4200",
  uploadUrl: "https://prueba-pp15001.000webhostapp.com/upload.php",
  uploadDir: "https://prueba-pp15001.000webhostapp.com/uploads/",
  appFonts: [
    "Merriweather Sans",
    "Oswald"
  ]
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
