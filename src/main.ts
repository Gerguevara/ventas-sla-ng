import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

for(let i = 0; i < environment.appFonts.length; i++){
  if(!document.getElementById(`fontLink${i}`)) {
    let appFontArray = environment.appFonts[i].split(' ');
    let appFontOutput = '';
    if(appFontArray.length > 1){
      appFontArray.forEach((word,index)=>{
        appFontArray[index] = word.trim();
        appFontOutput = appFontOutput.concat(appFontArray[index]);
        if(appFontArray[index+1]){
          appFontOutput = appFontOutput.concat('+');
        }
      })
    } else {
      appFontOutput = appFontArray[0].trim();
    }
    console.log(appFontOutput);
    var link = document.createElement('link');
    link.id = 'fontLink';
    link.rel = 'stylesheet';
    link.href = `https://fonts.googleapis.com/css2?family=${appFontOutput}:wght@300;400;500&display=swap`;
    document.head.appendChild(link);
  }
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
