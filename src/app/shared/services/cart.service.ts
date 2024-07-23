import { Injectable } from '@angular/core';
import { CartItem, Fruit } from '../entities';



@Injectable({
  providedIn: 'root'
})
export class CartService {

  items:CartItem[] = [];

  totalNetPriceCart:number = 0;
  totalQty:number = 0;

  addToCart(product: Fruit) {

    let addedQty:number;
    if (product.quantite === 0) {
      addedQty = 1;
    } else {
      addedQty = product.quantite;
    }
    let cartItem:CartItem = {
      productId: product.id,
      name: product.nom,
      quantity: addedQty,
      unitPrice : product.prixHT,
      totalPrice: product.prixHT * addedQty
    };

    let itemExists = false;

    if (localStorage.getItem('cart_items') != null) {
      let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      for (let existingItem of existingItems) {
        if(existingItem.productId === cartItem.productId) {
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
    location.reload();
  }

  getItems() {
    return this.items;
  } 

  loadCart(): void {
    const cartItems = localStorage.getItem("cart_items");
    if(cartItems) {
      try {
        this.items = JSON.parse(cartItems);
      } catch (error) {
        console.log('Erreur dans le chargement du panier');
        this.items =  [];
      }
    } else {
      this.items =  [];
    }
  }

  saveCart(): void {
    localStorage.setItem('cart_items', JSON.stringify(this.items)); 
  }

  clearCart() {
    this.items = [];
    localStorage.removeItem("cart_items");
  }

  removeItem(cartItem:CartItem) {
    const index = this.items.findIndex(o => o.productId === cartItem.productId);
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

  totalItemPrice(cartItem:CartItem) {
    cartItem.totalPrice = cartItem.quantity * cartItem.unitPrice;
  }

  addQtyItem(cartItem:CartItem) {
    let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      for (let existingItem of existingItems) {
        if(existingItem.productId === cartItem.productId) {
          existingItem.quantity ++
          this.totalItemPrice(existingItem);
        } 
      }
    this.items = existingItems;
    this.saveCart();
    this.saveTotalNetPrice();
    this.saveTotalQty();
  }

  diminishQtyItem(cartItem:CartItem) {
    let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      for (let existingItem of existingItems) {
        if(existingItem.productId === cartItem.productId) {
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


  itemInCart(cartItem: CartItem): boolean {
    return this.items.findIndex(o => o.productId === cartItem.productId) > -1;
  }


  // Total Quantity

  findTotalQty() {
    let existingItems = [];
      existingItems = JSON.parse(localStorage.getItem('cart_items') || '');
      this.totalQty = 0;
      for (let existingItem of existingItems) {
        this.totalQty += existingItem.quantity;
      }
      console.log(this.totalQty);
  }

  saveTotalQty(): void {
    this.findTotalQty();
    localStorage.setItem('total_qty', JSON.stringify(this.totalQty)); 
  }

  clearTotalQty() {
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



