import { Component, ElementRef, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';
import type { QueryList } from '@angular/core';
import type { Animation } from '@ionic/angular';
import { AnimationController, IonCard } from '@ionic/angular';
import { LoadingController } from '@ionic/angular';
import { DbService } from '../services/db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements AfterViewInit {
  username: string | null = '';

  @ViewChild(IonCard, { read: ElementRef }) card: ElementRef<HTMLIonCardElement> | undefined;

  private animation: Animation | undefined;

  constructor(private animationCtrl: AnimationController,
    private loadingCtrl: LoadingController,
    private dbService: DbService) {
    this.username = this.dbService.getUsername(); // Recuperamos el nombre de usuario
  }

  ngAfterViewInit() {
    this.animation = this.animationCtrl
      .create()
      .addElement(this.card!.nativeElement)
      .duration(1500)
      .iterations(Infinity)
      .direction('alternate')
      .fromTo('background', 'blue', 'var(--background)');

    this.animation.play();
  }

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      duration: 500,
    });

    loading.present();
  }
}
