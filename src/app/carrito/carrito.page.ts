import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {
  cartItems: any[] = [];
  total: number = 0;

  constructor(private cartService: CartService) { }

  ngOnInit() {
    this.loadCart();
  }

  async loadCart() {
    try {
      // Obtener los productos del carrito
      this.cartItems = await this.cartService.getCartItems();
      // Obtener el total del carrito
      this.total = await this.cartService.getCartTotal();
    } catch (error) {
      console.error('Error al cargar el carrito', error);
    }
  }

  // Función para eliminar un producto del carrito
  async removeItem(productoId: number) {
    await this.cartService.removeFromCart(productoId);
    this.loadCart(); // Recargar el carrito después de eliminar un producto
  }

  // Función para vaciar todo el carrito
  async clearCart() {
    await this.cartService.clearCart();
    this.loadCart(); // Recargar el carrito después de vaciarlo
  }
}
