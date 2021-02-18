<template>
	<q-layout view="hHh lpR fFf">
		<q-header elevated class="bg-primary text-white" height-hint="98">
			<q-toolbar>
				<q-toolbar-title class="row">
					<q-input v-model="newShopName" label="Name of New Shop" @keydown.enter.prevent="addNewShop" standout="text-white bg-primary" label-color="white">
						<template #before>
							<q-avatar square>
								<img src="../assets/icon_cas.svg" />
							</q-avatar>
						</template>
						<template #after>
							<q-btn no-caps color="primary" @click="addNewShop">Add New Shop</q-btn no-caps>
						</template>
					</q-input>
				</q-toolbar-title>
			</q-toolbar>
			<q-tabs align="left">
				<q-route-tab no-caps v-for="(shop,index) in shops" :to="'/'+index" :label="index"/>
			</q-tabs>
		</q-header>
    	<q-page-container>
			<q-page>
				<q-list v-if="shop_id&&shops[shop_id]">
					<q-item>
						<q-input v-model="shopName" label="Shop Name" ref="shopName"/>
					</q-item>
					<q-item v-for="(product,index) in shops[shop_id]">
						<q-input v-model="shops[shop_id][index]">
							<template #after>
								<q-btn no-caps color="primary" @click="deleteProduct(index)">Delete Product</q-btn no-caps>
							</template>
						</q-input>
					</q-item>
					<q-item>
						<q-input v-model="newProductName" label="New Product Name" @keydown.enter.prevent="addNewProduct">
							<template #after>
								<q-btn no-caps color="primary" @click="addNewProduct">Add New Product</q-btn no-caps>
							</template>
						</q-input>
					</q-item>
				</q-list>
				<p v-else-if="!shop_id||shop_id.trim()===''">No shop selected</p>
				<p v-else>Invalid shop</p>
			</q-page>
		</q-page-container>
	</q-layout>
</template>

<script>
	export default{
		props:['shop_id'],
		computed:{
			shopName:{
				get(){
					return this.shop_id;
				},
				set(shop_id){
					if(this.shops[shop_id]){
						let selectionStart=this.$refs.shopName.$el.control.selectionStart,selectionEnd=this.$refs.shopName.$el.control.selectionEnd;
						this.$refs.shopName.$el.control.value=this.shop_id;
						this.$refs.shopName.$el.control.selectionStart=selectionStart-shop_id.length+this.shop_id.length;
						this.$refs.shopName.$el.control.selectionEnd=selectionEnd-shop_id.length+this.shop_id.length;
						return;
					}
					this.$set(this.shops,shop_id,this.shops[this.shop_id]);
					delete this.shops[this.shop_id];
					this.$router.push('/'+shop_id);
				}
			}
		},
		data(){
			return{
				shops:{},
				newShopName:'',
				newProductName:''
			};
		},
		methods:{
			addNewShop(){
				if(this.newShopName.trim()===''){
					this.newShopName='';
					return;
				}
				if(this.shops[this.newShopName]){
					this.$q.dialog({message:'A shop with that name already exists. To rename the shop, please select the shop and edit the Shop Name field.'});
					return;
				}
				this.$set(this.shops,this.newShopName,[]);
				this.$router.push(this.newShopName);
				this.newShopName='';
			},
			deleteProduct(index){
				this.shops[this.shop_id].splice(index,1);
			},
			addNewProduct(){
				this.shops[this.shop_id].push(this.newProductName);
				this.newProductName='';
			}
		}
	};
</script>
