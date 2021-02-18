
const routes = [
	{
		path: '/',
		props:true,
		component: () => import('components/shop.vue')
	},{
		path: '/:shop_id',
		props:true,
		component: () => import('components/shop.vue')
	}
]

export default routes
