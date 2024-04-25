import { Component, OnInit, inject } from '@angular/core';
import { Firestore, collection, getDocs } from '@angular/fire/firestore';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title = 'angular-fire';
  firestore = inject(Firestore);
  ngOnInit() {
    getDocs(collection(this.firestore, 'testPath')).then((response) => {
      console.log(response.docs);
    });
  }
  constructor() {}
}
