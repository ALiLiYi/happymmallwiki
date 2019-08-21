import MUtil from 'util/mm.jsx';

const _mm = new MUtil();

class Product{
	getProductList(listParam){
		let url 		= '',
			data 		= {},
			listType 	= listParam.listType;
		if(listType == 'list'){
			url 			= '/manage/product/list.do';
			data.pageNum 	= listParam.pageNum;
		}else if(listType == 'search'){
			url 			= '/manage/product/search.do';
			data.pageNum 	= listParam.pageNum;
			data[listParam.searchType] = listParam.keyword
		}

		return _mm.request({
			type : 'post',
			url  : url,
			data : data
		})
	}
	// 获取商品详情
	getProduct(productId){
		return _mm.request({
			type : 'post',
			url  : '/manage/product/detail.do',
			data : {
				productId : productId || 0
			}
		})
	}
	setProductStatus(data){
		return _mm.request({
			type : 'post',
			url  : '/manage/product/set_sale_status.do',
			data : data
		})
	}

	// 表单验证
	CheckProduct(product){
		let Result = {
			status  : 1,
			msg 	: '商品保存成功!'
		};
		// 判断商品名称是否为空
		if(typeof product.name !== 'string' || product.name.length === 0){
			return {
				status: false,
				msg: '商品名称不能为空!'
			}
		}
		// 判断商品描述是否为空
		if(typeof product.subtitle !== 'string' || product.subtitle.length === 0){
			return {
				status: false,
				msg: '商品描述不能为空!'
			}
		}
		// 所属分类是否为空
		if(typeof product.categoryId !== 'number' || !(product.categoryId > 0)){
			return {
				status: false,
				msg: '请选择品类!'
			}
		}
		// 判断商品价格是否正确
		if(typeof product.price !== 'number' || !(product.price >= 0)){
			return {
				status: false,
				msg: '请填写正确的商品价格!'
			}
		}
		// 判断商品库存是否正确
		if(typeof product.stock !== 'number' || !(product.stock >= 0)){
			return {
				status: false,
				msg: '请填写正确的商品库存!'
			}
		}
		return Result;
	}

	// 提交商品信息
	SaveProduct(product){
		return _mm.request({
			type : 'post',
			url  : '/manage/product/save.do',
			data : product
		})
	}

	/*
	* 品类相关
	*/
	getCategoryList(parentCategoryId){
		return _mm.request({
			type : 'post',
			url  : '/manage/category/get_category.do',
			data : {
				categoryId: parentCategoryId || 0
			}
		})
	}	

}

export default Product;