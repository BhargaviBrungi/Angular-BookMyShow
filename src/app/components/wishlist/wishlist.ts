import { Component, OnInit } from '@angular/core';
import { WishlistService } from '../../services/wishlist-service';

@Component({
  selector: 'app-wishlist',
  imports: [],
  templateUrl: './wishlist.html',
  styleUrl: './wishlist.css',
})
export class Wishlist implements OnInit {
   wishlist: any[] = [];

  constructor(private wishlistService: WishlistService) {}

  ngOnInit() {
    this.wishlistService.wishlist$.subscribe(items => {
        this.wishlist = items;
      });
}
  remove(id: number) {
    this.wishlistService.removeFromWishlist(id);
  }
}
