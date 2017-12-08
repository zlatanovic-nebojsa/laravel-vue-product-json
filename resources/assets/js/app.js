
/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

let moment = require('moment');

/**
 * Next, we will create a fresh Vue application instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

let Product = {
	props: ['product'],
	template: `
		<div class="product">
			<p>Name: <input v-model="product.name" name="name"/></p>

			<p>Quantity: <input v-model="product.quantity" name="quantity"/></p>

			<p>Price: <input v-model="product.price" name="price"/></p>

			<p>Date submited: {{ product.date }}</p>
			<p>Total value: $ {{ product.quantity * product.price }}</p>
			<br>
		</div>
	`
}

let ProductForm = {
	data() {
		return {
			name: null,
			quantity: null,
			price: null,
			date: null
		}
	},
	template: `
	<div>
		<br />
		<br />
		<form action="#" @submit.prevent="addProduct" method="POST">
			<p><label for="name">Product Name</label>
			<input type="text" v-model.trim="name" name="name"/></p>

			<p><label for="quantity">Product Quantity</label>
			<input type="number" v-model.trim="quantity" name="quantity"/></p>

			<p><label for="price">Product Price</label>
			<input type="number" v-model.trim="price" name="price"/></p>

			<button>Submit</button>
		</form>

		<br />
		<br />
	</div>

	`,
	methods: {
		addProduct () {
			if (!this.name || !this.quantity || !this.price) {
				return
			}

			this.$emit('product-added', {
				id: Date.now(),
				name: this.name,
				quantity: this.quantity,
				price: this.price,
				date: moment().format("HH:mm | Do MMM YYYY")
			})

			this.name = null
			this.quantity = null
			this.price = null
		}
	}
}

let Products = {
	components: {
		'product': Product,
		'product-form': ProductForm
	},
	data () {
		return {
			products: [],
			total: 0
		}
	},
	template: `
		<div>
			<product-form @product-added="submitProduct"></product-form>
			<div class="products">
				<template v-if="products.length">
					<product v-for="product in products" :product="product" :key="product.id"></product>
					<p><strong>Total: $ {{ total }}</strong></p>
				</template>
			</div>
		</div>
	`,
	methods: {
		addProduct (product) {
			this.total = 0
			this.products.unshift(product)
			this.calculateTotal(product)
		},
		submitProduct (product) {
			axios.post('/', {
				id: product.id,
				name: product.name,
				quantity: product.quantity,
				price: product.price,
				date: product.date
			}).then((res) => {
				this.addProduct(res.data)
			})
			.catch(e => console.log(e))
		},
		calculateTotal (product) {
			this.products.forEach((product) => {
				return this.total += product.price * product.quantity
			})
		}
	}

}

const app = new Vue({
    el: '#app',
    components: {
    	'products': Products
    }
});