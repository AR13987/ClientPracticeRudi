let app = new Vue({
    el: '#app',
    data: {
        product: "Socks",
        image: "./assets/vmSocks-blue-onWhite.jpg",
        altText: "A pair of warm, fuzzy socks",
        link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
        linkText: "More products like this",
        // inventory: 10,
        inStock: false,
        onSale: true,
        details: ['80 cotton', '20% polyester', 'Gender-neutral'],
        variants: [{
            variantId: 1,
            variantColor: "green",
            variantImage: "./assets/vmSocks-green-onWhite.jpg",
        },
        {
            variantId: 2,
            variantColor: "blue",
            variantImage: "./assets/vmSocks-blue-onWhite.jpg",
        }],
        sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
        cart: 0,
    },
    methods: {
        addToCart() {
            this.cart += 1
        },
        reduceToCart() {
            this.cart -= 1
            if (this.cart < 0) {
                this.cart = 0
            }
        },
        updateSocks(variantImage) {
            this.image = variantImage
        }
    }
})