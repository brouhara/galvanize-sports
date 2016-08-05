var data = require("./objects");
var inventory = data.inventory;
var shoppingCart = data.shoppingCart;

function getCartItem(itemId) {
    for (var x = 0; x < data.shoppingCart.length; x++) {
        if (data.shoppingCart[x].itemId === itemId) {
            return data.shoppingCart[x];
        }
    }
}

function getInventoryItem(itemId) {
    for (var x = 0; x < data.inventory.length; x++) {
        if (data.inventory[x].id === itemId) {
            return data.inventory[x];
        }
    }
}

module.exports = {
    inventory: data.inventory,
    shoppingCart: data.shoppingCart,

    addItem: function (itemId, quantity) {
        // Your code here!

        var cartItem = getCartItem(itemId);
        var inventoryItem = getInventoryItem(itemId);
        var available = 0;

        console.log(cartItem);
        console.log(inventoryItem);

        if (inventoryItem.quantityAvailable < quantity) {
            available = inventoryItem.quantityAvailable;
            inventoryItem.quantityAvailable = 0;
            cartItem.quantity += available;
        } else {
            cartItem.quantity += quantity;
            inventoryItem.quantityAvailable -= quantity
        }

        console.log(data.shoppingCart);

    },

    removeItem: function (itemId, quantity) {
        // Your code here!

        var cartItem = getCartItem(itemId);
        var inventoryItem = getInventoryItem(itemId);
        var cartCount = cartItem.quantity;

        console.log(cartItem);
        if (cartItem.quantity < quantity) {
            inventoryItem.quantityAvailable += cartCount;

            cartItem.quantity -= cartCount;

        } else {
            cartItem.quantity -= quantity;
            inventoryItem.quantityAvailable += quantity;
        }

    },

    getCheckoutSubtotal: function () {
        var checkoutSubtotal = 0.00;
        // Your code here!
        for (var x = 0; x < data.shoppingCart.length; x++) {
            var item = data.shoppingCart[x];
            var inventoryItem = getInventoryItem(item.itemId);

            var total = item.quantity * inventoryItem.price;
            checkoutSubtotal += total;
        }

        return checkoutSubtotal;
    },

    getTax: function (subtotal, rate) {
        var tax = 0.00;

        // Your code here!
        tax = subtotal * rate;

        return tax;
    },

    getCheckoutTotal: function () {
        var TAX_RATE = 0.078;
        var checkoutTotal = 0.00;
        // Your code here!

        var subtotal = this.getCheckoutSubtotal();
        var tax = this.getTax(subtotal, TAX_RATE);
        
        checkoutTotal = subtotal + tax;
        checkoutTotal = checkoutTotal.toFixed(2);
        return checkoutTotal;
    }
}
