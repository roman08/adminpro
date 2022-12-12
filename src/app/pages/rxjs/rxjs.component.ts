import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, retry, interval, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [],
})
export class RxjsComponent implements OnInit, OnDestroy {

  public intervalSubs: Subscription | undefined;

  constructor() {
    // this.retornaObservable().pipe(
    //   retry()
    // ).
    // subscribe(
    //   valor => console.log(valor),
    //   error => console.log("Error: " + error),
    //   () => console.info('Obs terminado')

    // );
    console.log('holaa');
    

    this.intervalSubs = this.retornaIntervalo().subscribe(console.log);
  }
  ngOnDestroy(): void {
    this.intervalSubs?.unsubscribe();
  }

  ngOnInit(): void {}

  retornaIntervalo(): Observable<number> {
    return interval(500)
    .pipe(
      map(valor => valor + 1),
      filter( valor =>  ( valor % 2 === 0) ? true : false),
      // take(10),
    );

  }

  retornaObservable(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>((observer) => {
      const intevalo = setInterval(() => {
        i++;
        observer.next(i);

        if (i === 4) {
          clearInterval(intevalo);
          observer.complete();
        }

        if (i === 2) {
          observer.error('Error en el contador');
        }
      }, 1000);
    });

    return obs$;
  }
}
