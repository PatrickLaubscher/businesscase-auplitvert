import { Injectable } from '@angular/core';
import { CartLineOrder, Category, PrestationWithAttribution, Product } from '../entities';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:CartLineOrder[] = [];

  totalNetPriceCart:number = 0;
  totalQty:number = 0;

  addToCart(prestation: PrestationWithAttribution, product: Product, category:Category, qty:number) {

    let cartItem:CartLineOrder = {
      product: product,
      category: category,
      prestation: prestation,
      quantity: qty,
      unitPrice : prestation.base_price * category.coef_price,
      totalPrice: prestation.base_price * category.coef_price * qty
    };

    let itemExists = false;

    if (localStorage.getItem('cart_items') != null) {
      let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      for (let existingItem of existingItems) {
        if(existingItem.product.id === cartItem.product.id && existingItem.prestation.id === cartItem.prestation.id) {
          itemExists = true;
          existingItem.quantity += cartItem.quantity;
          existingItem.totalPrice += cartItem.totalPrice;
        } 
      }
    this.items = existingItems;
    } 

    if(itemExists === false) {
      this.items.push(cartItem);
    }
    
    console.log(cartItem);
    console.log(this.items);

    this.saveCart();
    this.saveTotalNetPrice();
    this.saveTotalQty();
  }

  getItems() {
    return this.items;
  } 

  loadCart(): CartLineOrder[] {
    const cartItems = localStorage.getItem("cart_items");
    if(cartItems) {
      try {
        this.items = JSON.parse(cartItems);
      } catch (error) {
        console.log('Erreur dans le chargement du panier');
        this.items = [];
      }
    } else {
      this.items = [];
    }
    return this.items;
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items)); 
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem("cart_items");
    this.clearTotalQty();
    this.clearTotalNetPrice();
  }

  removeItem(cartItem:CartLineOrder) {
    const index = this.items.findIndex(o => o.product.id === cartItem.product.id);
    if (index > -1) {
      this.items.splice(index, 1);
      this.saveCart();
      this.saveTotalNetPrice();
      this.saveTotalQty();
      if(this.items.length === 0) {
        this.clearTotalNetPrice;
        this.clearTotalQty();
      } else {
        this.saveTotalNetPrice();
        this.saveTotalQty();
      }
    }
  }

  totalItemPrice(cartItem:CartLineOrder) {
    cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
  }

  addQtyItem(cartItem:CartLineOrder) {
    let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      for (let existingItem of existingItems) {
        if(existingItem.product.id === cartItem.product.id && existingItem.prestation.id === cartItem.prestation.id) {
          existingItem.quantity ++
          this.totalItemPrice(existingItem);
        } 
      }
    this.items = existingItems;
    this.saveCart();
    this.saveTotalNetPrice();
    this.saveTotalQty();
  }

  diminishQtyItem(cartItem:CartLineOrder) {
    let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      for (let existingItem of existingItems) {
        if(existingItem.product.id === cartItem.product.id && existingItem.prestation.id === cartItem.prestation.id) {
          if(existingItem.quantity <= 1) {
            existingItem.quantity = 1;
            existingItem.totalPrice = existingItem.unitPrice;
          } else {
            existingItem.quantity --
            this.totalItemPrice(existingItem);
          }
        } 
      }
    this.items = existingItems;
    this.saveCart();
    this.saveTotalNetPrice();
    this.saveTotalQty();
  }


  itemInCart(cartItem: CartLineOrder): boolean {
    return this.items.findIndex(o => o.product.id === cartItem.product.id) > -1;
  }


  // Total Quantity

  findTotalQty() {
    let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      this.totalQty = 0;
      for (let existingItem of existingItems) {
        this.totalQty += existingItem.quantity;
      }
  }

  saveTotalQty(): void {
    this.findTotalQty();
    localStorage.setItem('total_qty', JSON.stringify(this.totalQty)); 
  }

  clearTotalQty(): void {
    this.totalQty = 0;
    localStorage.removeItem('total_qty');
  }

  getTotalQty() {
    return this.totalQty;
  }
  
  loadTotalQty(): void {
    const totalQty = localStorage.getItem('total_qty');
    if(totalQty) {
      try {
        this.totalQty = JSON.parse(totalQty);
      } catch (error) {
        console.log('Erreur dans le chargement du panier');
        this.totalQty =  0;
      }
    } else {
      this.totalQty =  0;
    }
  }


  //Total net price functions

  totalNetPrice() {
      let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      this.totalNetPriceCart = 0;
      for (let existingItem of existingItems) {
        this.totalNetPriceCart += existingItem.totalPrice;
      }
  }

  loadTotalNetPrice(): void {
    const totalNetPrice = localStorage.getItem("cart_net_total");
    if(totalNetPrice) {
      try {
        this.totalNetPriceCart = JSON.parse(totalNetPrice);
      } catch (error) {
        console.log('Erreur dans le chargement du panier');
        this.totalNetPriceCart =  0;
      }
    } else {
      this.totalNetPriceCart =  0;
    }

  }

  saveTotalNetPrice(): void {
    this.totalNetPrice();
    localStorage.setItem('cart_net_total', JSON.stringify(this.totalNetPriceCart)); 
  }

  clearTotalNetPrice() {
    this.totalNetPriceCart = 0;
    localStorage.removeItem("cart_net_total");
  }

  getTotalNetPrice() {
    return this.totalNetPriceCart;
  } 


} 



