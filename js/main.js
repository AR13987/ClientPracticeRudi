Vue.component('socks-detail', {
    props: {
        details: {
            type: Array,
            required: true
        }
    },

    template: `
    <div class="socks-detail">
        <ul>
            <li v-for="detail in details">{{detail}}</li>
        </ul>
    </div>`
})


Vue.component('socks', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },

    template: `
    <div class="socks">
        <div class="socks-image">
            <!-- : или v-bind-->
            <img :alt=altText :src=image>
        </div>

        <div class="socks-info">
            <h1>{{title}}</h1>
            <a :href=link>{{linkText}}</a>

            <!--         <p v-if="inventory > 10">In Stock</p>-->
            <!--         <p v-else-if="inventory <=10 && inventory > 0">Almost sold out!</p>-->
            <!--         <p v-else>Out of Stock</p>-->
            <p :class="{OutOfStock: !inStock}" v-show=!inStock>Out of Stock</p>
            <p v-show=inStock>In Stock</p>
            <p>Shipping: {{shipping}}</p>
            <span v-show=sale>On Sale</span>
            
            <socks-detail :details="details"></socks-detail>
            
            <div class="socks-detail">
                <div class="color-box" v-for="(variant, index) in variants" :key=variant.variantId
                     :style="{backgroundColor: variant.variantColor}"
                     @mouseover=updateSocks(index)>
                </div>
                <ul>
                    <li v-for="size in sizes">{{size}}</li>
                </ul>
                <button v-on:click=addToCart :disabled=!inStock
                        :class="{disabledButton: !inStock}">Add to cart
                </button>
                <button v-on:click=reduceToCart :disabled=!inStock 
                :class="{disabledButton: !inStock}">Reduce to cart</button>
            </div>
        </div>
    </div>`,

    data() {
        return {
            product: "Socks",
            // image: "./assets/vmSocks-blue-onWhite.jpg",
            altText: "A pair of warm, fuzzy socks",
            link: "https://www.amazon.com/s/ref=nb_sb_noss?url=search-alias%3Daps&field-keywords=socks",
            linkText: "More products like this",
            // inventory: 10,
            brand: "Vue Mastery",
            // inStock: true,
            details: ['80 cotton', '20% polyester', 'Gender-neutral'],
            variants: [{
                variantId: 1,
                variantColor: "green",
                variantImage: "./assets/vmSocks-green-onWhite.jpg",
                variantQuantity: 10,
                onSale: 1
            },
                {
                    variantId: 2,
                    variantColor: "blue",
                    variantImage: "./assets/vmSocks-blue-onWhite.jpg",
                    variantQuantity: 0,
                    onSale: 0
                }],
            sizes: ['S', 'M', 'L', 'XL', 'XXL', 'XXXL'],
            selectedVariant: 0
        }
    },

    methods: {
        addToCart() {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
        },

        reduceToCart() {
            this.$emit('reduce-to-cart', this.variants[this.selectedVariant].variantId);
        },
        updateSocks(index) {
            this.selectedVariant = index
            console.log(index)
        }
    },

    computed: {
        title() {
            return this.brand + ' ' + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock() {
            return this.variants[this.selectedVariant].variantQuantity
        },
        sale() {
            return this.variants[this.selectedVariant].onSale
        },
        shipping() {
            if (this.premium) {
                return "Free";
            } else {
                return 2.99
            }
        },

    }

})

let app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateAddCart(id) {
            this.cart.push(id)
        },
        updateReduceCart(id) {
            this.cart.splice(id, 1)
            }
        }
})