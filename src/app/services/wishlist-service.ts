import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private wishlistItems: any[] = [];

  private wishlistSubject = new BehaviorSubject<any[]>([]);
  wishlist$ = this.wishlistSubject.asObservable();

  constructor() {
    const data = localStorage.getItem('wishlist');
    if (data) {
      this.wishlistItems = JSON.parse(data);
      this.wishlistSubject.next(this.wishlistItems);
    }
  }

  addToWishlist(movie: any) {
    const exists = this.wishlistItems.find(
      item => item.id === movie.id
    );

    if (!exists) {
      this.wishlistItems.push(movie);
      this.updateStorage();
    }
  }

  removeFromWishlist(id: number) {
    this.wishlistItems = this.wishlistItems.filter(
      item => item.id !== id
    );
    this.updateStorage();
  }

  getWishlist() {
    return this.wishlistItems;
  }

  private updateStorage() {
    localStorage.setItem(
      'wishlist',
      JSON.stringify(this.wishlistItems)
    );
    this.wishlistSubject.next(this.wishlistItems);
  }
}
