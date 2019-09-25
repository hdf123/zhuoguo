/**
 * ajax封装调用
 */
var urs="";
function ajaxs(url,type,data,suFn,erFn,params){
// 	var token=JSON.parse($.cookie('tokens'));//获取token
	$.ajax(Object.assign({
		url:urs+url,
		headers:{"Authorization":token},
		type:type,
        dataType : "json",
        data:data,
		success: function(data){
			suFn(data);
		},error: function(error){
            erFn(error);
        }
	},params||{}));
}
/**
 * 地址栏传参
 */
//getRequest();//全部参数
function getRequest(){
	var url=window.location.search; //获取url中"?"符后的字串
	var theRequest = new Object();
	if (url.indexOf("?") != -1){
		var strs = url.substr(1).split("&");
		for(var i = 0; i < strs.length; i ++) {
  			theRequest[strs[i].split("=")[0]]=decodeURI(strs[i].split("=")[1]);
		}
	}
	return theRequest;
}

//loading
function loading(){
	return html = '<div id="loading" style="width:100%;height:100%;background:rgba(238,238,238,0.9);z-index:1;text-align:center;position:absolute;left:0px;top:0px;"><div style="width:32px;height:32px;position:fixed;top:45%;left:50%;margin-left:-16px;z-index:1000;"><img src="../../img/loadings.gif" /></div></div>';
}
/**
 * 图片加载失败（态添加也包含在内）
 */
function imgks(){
	document.addEventListener("error", function (e) {
	  var elem = e.target;
	  if (elem.tagName.toLowerCase() == 'img') {
	    elem.src ="";
	  }
	}, true);
}
/**
 * 实现将项目的图片转化成base64
 */
function convertImgToBase64(url, callback, outputFormat) {
	var canvas = document.createElement('CANVAS'),
	ctx = canvas.getContext('2d'),
	img = new Image;　　
	img.crossOrigin = 'Anonymous';　　
	img.onload = function() {
		canvas.height = img.height;　　
		canvas.width = img.width;　　
		ctx.drawImage(img, 0, 0);　　
		var dataURL = canvas.toDataURL(outputFormat || 'image/png');　　
		callback.call(this, dataURL);　　
		canvas = null;
	};　　
	img.src = url;
}
/**
 * 输入限制
 */
//limitImport('.texts',200);调用实例：类名或ID，限制的字数
function limitImport(str,num){
	$(document).on('input propertychange',str,function(){
 	var self = $(this);
 	var content = self.val();
 	if (content.length > num){
  		self.val(content.substring(0,num));
 	} 
 	$(".mun").text(self.val().length+'/'+num);
	});
}
/**
 * 上拉加载
 */
//_loadIndex 为请求的页数    _loadState为请求状态  0 可以请求  1 正在请求  2 请求结束
	var _loadIndex =1,
	    _loadState = 0;
	function loadmore(element,url,type,dataObj,successFn,errorFn) {
	    $(element).on("scroll",function(){
	        //当前可视容器高度
	        var _elementHeight = $(element).outerHeight(),
	            //当前滚动区域高度
	            _elementChildHeight = $(element).children().outerHeight(),
	            //滚动条高度
	            _elementScroll = $(element).scrollTop();
	        //滚动区域 - 滚动条高度 > 可视高度  就是还可以滚动  表示没有滚动到底部  否则就到了底部
	        if(_elementChildHeight - _elementScroll - 10 > _elementHeight){            
	            //console.log('没到底') 
	        }else {
	            //console.log('到底了')           
	            //当状态为0 的时候进行加载，防止重复加载
	            if(_loadState == 0){       
	                //状态更新为1
	                _loadState = 1;
	                //增加页数
	                _loadIndex += 1;
	                //添加正在加载loadding
	                $(element).append('<p class="nowLoad">正在加载...</p>');
	                //请求当前页数ajax
	                ajaxLoad(_loadIndex);
	            }
	        }
	    });    
	    //ajax请求
	    function ajaxLoad(page) {        
	        //更新发向服务器的数据，添加页数key值
	        dataObj.page = page;
	        $.ajax({
	            url:urs+url,
		 		xhrFields:{
		           withCredentials:true
		       	},
	            type:type,
	            dataType:'json',
	            data:dataObj,
	            success:function (data) {
	                //数据渲染  ajajx回调
	                successFn(data);
	               //当数据不为空的时候，更新状态
	                if(data.length > 0){
	                    //更新状态 为 0
	                    _loadState = 0;
	                    //删除正在加载loadding
	//                  $('.nowLoad').remove();
	                    function hg(){
	                    	$(".nowLoad").remove();
	                    }
	                    setTimeout(hg,1200);
	                }else {                    
	                    //当数据长度小于等于0的时候，代表没有数据了，更新状态为2
	                    _loadState = 2;                    
	                    //删除正在加载loadding
	                    $('.nowLoad').remove();                    
	                    //更换loadding为没有数据
	                    $(element).after('<p class="endLoad">没有数据了...</p>');
	                    function fg(){
	                    	$(".endLoad").remove();
	                    }
	                    setTimeout(fg,1200);
	                }                
	            },
	            error:function (err) {                
	                //请求失败loadding
	                errorFn(err);                
	            }
	        })
	    }
	};
//上拉加载调用js
/*loadmore('#wrapper','/store/tradeapi','post',{},function (data) {
    $.each(data.data.list,function (key,val) {
        $('#wrapper ul').append();
    });
},function () {   
});*/

/**
 * 弹出选择框(贷款比例)
 */
function selectSwiper(obj) {
    var _self = this;
    _self.el = $(obj.el); // 根元素
    _self.selectSwiper = null; // swiper对象
    _self.swiperData = {}; // swiper数据对象
    _self.swiperData.mustSelect = obj.mustSelect || false; // 是否必选
    _self.swiperData.activeIndex = (typeof obj.activeIndex === 'number' && obj.activeIndex >= -1) ? obj.activeIndex : -1;// 激活索引
    _self.swiperData.oldIndex = _self.swiperData.activeIndex; // 旧索引，取消返回上一次索引
    _self.swiperData.data = obj.data || []; // swiper数据

    _self.swiperData.okFun = obj.okFun; // OK按钮执行函数
    _self.swiperData.okFunUndefind = obj.okFunUndefind || function () {
    };//选择说明项-'请选择'
    _self.swiperData.closeFun = obj.closeFun || function () {
    }; // 取消按钮执行函数
    _self.swiperData.init = obj.init; // 初始化
    var hgSelect ='<div class="select">'
        	+'<div>'
	            +'<span class="close">取消</span>'
	            +'<div class="tits">111</div>'
	            +'<span class="ok">确定</span>'
        	+'</div>'
           +'<div class="selectData">'
                +'<div class="swiper-container">'
                    +'<div class="cloth"></div>'
                   +'<div class="swiper-wrapper">'
                        +'<div class="swiper-slide">请选择</div>'
                    +'</div>'
                +'</div>'
            +'</div>'
        +'</div>';
        
        
//  var hgSelect = `
//      <div class="select">
//      	<div>
//	            <span class="close">取消</span>
//	            <div class="tits">111</div>
//	            <span class="ok">确定</span>
//      	</div>
//          <div class="selectData">
//              <div class="swiper-container">
//                  <div class="cloth"></div>
//                  <div class="swiper-wrapper">
//                      <div class="swiper-slide">请选择</div>
//                  </div>
//              </div>
//          </div>
//      </div>`;
    _self.init = function () { // 初始化
        _self.el.html(hgSelect);
        _self.el.addClass('click_no'); // 取消移动端点击阴影
        _self.selectSwiper = new Swiper(obj.el + ' .swiper-container', {
            direction: 'vertical',
            slidesPerView:5,//可视区域数目
            centeredSlides: true,//激活项居中
            slideToClickedSlide: true,//点击切换
            onInit: function (swiper) {
                swiper.removeSlide(0);
                var data = _self.swiperData.data;
                var s = [];
                s[0] = '<div class="swiper-slide">请选择</div>';
                for (i = 0; i < data.length; i++) {
                    s[i + 1] = '<div class="swiper-slide">' + data[i] + '</div>';
                }
                swiper.appendSlide(s);
                _self.swiperData.init(_self.swiperData.activeIndex);

            },
            onSlideChangeEnd: function (swiper) {
                _self.swiperData.activeIndex = swiper.activeIndex - 1;
            },
        });
        _self.el.find('.ok').on('click', _self.okSelectSwiper);
        _self.el.find('.close').on('click', function () {
            _self.swiperData.activeIndex = _self.swiperData.oldIndex;
            _self.swiperData.closeFun();
            _self.closeSelectSwiper();
        });
        _self.el.on('click', function () {
            _self.el.find('.close').trigger('click');
        });
        $('.select').on('click', function (e) {//阻止选择区域关闭select
            e.stopPropagation();
        });
    };
    _self.openSelectSwiper = function () {
        var _self = this;
        _self.el.addClass('yes');
        _self.selectSwiper.update();
        _self.selectSwiper.slideTo(_self.swiperData.activeIndex + 1, 0);
    };
    _self.okSelectSwiper = function () {
        if (_self.swiperData.mustSelect && _self.swiperData.activeIndex === -1) {
            _self.swiperData.okFunUndefind();
        } else {
            _self.swiperData.okFun(_self.swiperData.activeIndex);
            _self.swiperData.oldIndex = _self.swiperData.activeIndex;
            _self.closeSelectSwiper();
        }
    };
    _self.closeSelectSwiper = function () {
        _self.el.removeClass('yes');
    };
    _self.init();
}
/**
 * 省市联动
 */
function linkage(address){
	var newData = [];//新数据
	var citysArray = [];//城市
	var areaArray = [];//地区
	var chooseMenuStr = '请选择' //添加选择title
	function init(){
		//模拟ajax
		setTimeout(()=>{
			newData = [...shengshi];
			// 初始化省份
			var optionGroupOne = "";
			$.each(newData,function(index, el) {
				optionGroupOne += '<li class="option-list option-list-one">'
							+'<span>'+newData[index]["n"]+'</span>'
							+'<div class="checked">'
							+'</div>'
						+'</li>'
			});
//			$.each(newData,function(index, el) {
//				optionGroupOne += `<li class="option-list option-list-one">
//							<span>${newData[index]["n"]}</span>
//							<div class="checked">
//							</div>
//						</li>`
//			});
			
			$(".option-group-one").html(optionGroupOne)

		},100)
	}
	init();
	$("#mymodal").on("click",".option-menu",function(){ //菜单激活
		var i = $(this).index();
		$(this).addClass('active-option').siblings().removeClass('active-option');
		$(".option-group").eq(i).show().siblings().hide()
	})
	//1级 省份点击添加城市
	$("#mymodal").on("click",".option-list-one",function(){
		var parentIndex = $(this).parent().attr("data-index");
		var provinceName = $(this).text().trim();
		var provinceIndex = $(this).index();
		$(this).find('.checked').show();
		$(this).siblings().find('.checked').hide();
		// console.log(newData[provinceIndex])
		citysArray = newData[provinceIndex]["c"];
		$(".option-menu").eq(parentIndex).text(provinceName)
		var cityStr = "";
		// console.log(citysArray)
		$.each(citysArray,function(index, el) {
			cityStr += '<li class="option-list option-list-two">'
					+'<span>'+citysArray[index]["n"]+'</span>'
					+'<div class="checked">'
					+'</div>'
				+'</li>'
		});
//		$.each(citysArray,function(index, el) {
//			cityStr += `<li class="option-list option-list-two">
//					<span>${citysArray[index]["n"]}</span>
//					<div class="checked">
//					</div>
//				</li>`
//		});
		$(".option-group").hide();
		$(".optionwrapper").find(".option-menu").removeClass('active-option')
		$(".option-menu-two").html(chooseMenuStr).addClass('active-option')
		$(".option-group-two").html(cityStr).show();
		$(".option-group-three").html("");
		$(".option-menu-three").html("")
	})
	//2级 城市点击添加城镇
	$("#mymodal").on("click",".option-list-two",function(){
		var parentIndex = $(this).parent().attr("data-index");
		var cityName = $(this).text().trim();
		var cityIndex = $(this).index();
		$(this).find('.checked').show();
		$(this).siblings().find('.checked').hide();
		cityArray = citysArray[cityIndex]["a"];
		$(".option-menu").eq(parentIndex).text(cityName)
		var areaStr = "";
		$.each(cityArray,function(index, el) {
			areaStr += '<li class="option-list option-list-three">'
					+'<span>'+cityArray[index]+'</span>'
					+'<div class="checked">'
					+'</div>'
				+'</li>'
		});
//		$.each(cityArray,function(index, el) {
//			areaStr += `<li class="option-list option-list-three">
//					<span>${cityArray[index]}</span>
//					<div class="checked">
//					</div>
//				</li>`
//		});
		$(".option-group").hide();
		$(".optionwrapper").find(".option-menu").removeClass('active-option')
		$(".option-menu-three").html(chooseMenuStr).addClass('active-option')
		$(".option-group-three").html(areaStr).show();
	})
	//3级 选择城镇
	$("#mymodal").on("click",".option-list-three",function(){
		var areaName = $(this).text().trim();
		var parentIndex = $(this).parent().attr("data-index");
		var menuOne = $(".option-menu").eq(0).text();
		var menuTwo = $(".option-menu").eq(1).text();
		var addressVal = menuOne +" "+ menuTwo +" "+ areaName;
		$(this).find('.checked').show();
		$(this).siblings().find('.checked').hide();
		$(".option-menu").eq(parentIndex).text(areaName)
		$(".modal-main").animate({"bottom":"-900px"}, 400);
		setTimeout(()=>{
			$("#mymodal").fadeOut()
		},350)
		address.val(addressVal);
	})
	$(".right").on("click",function(){
		$("#mymodal").show();
		$(".modal-main").animate({"bottom":"0"}, 400)
	})
	$(".close").on("click",function(){
		$(".modal-main").animate({"bottom":"-900px"}, 400);
		setTimeout(()=>{
			$("#mymodal").fadeOut();
		},350)
	})
	$("#mymodal").on("click",function(event){
		var modalMain = $(".modal-main");
		if (!modalMain.is(event.target)&& modalMain.has(event.target).length === 0) {
			$(".modal-main").animate({"bottom":"-900px"}, 400);
			setTimeout(()=>{
				$("#mymodal").fadeOut();
			},350)
		}
	})
}
/**
 * 当前时间
 */
function getMyDate(str,state){
    var oDate = new Date(str),
        oYear = oDate.getFullYear(),//年
        oMonth = oDate.getMonth()+1,//月
        oDay = oDate.getDate(),//日
        oHour = oDate.getHours(),//时
        oMin = oDate.getMinutes(),//分
        oSen = oDate.getSeconds(),//秒
        oFf=oDate.getMilliseconds()//毫秒
        if(state==1){
        	oTime = oYear +'.'+ getzf(oMonth) +'.'+ getzf(oDay);//最后拼接时间，年月日
        }else{
        	oTime = oYear +'-'+ getzf(oMonth) +'-'+ getzf(oDay) +' '+ getzf(oHour) +':'+ getzf(oMin) +':'+getzf(oSen);//最后拼接时间
        }
    return oTime;
};
//补0操作
function getzf(num){
	return num< 10 ? '0' + num:num;
}
/**
 * 去重
 */
function heavy(heavy){
	return Array.from(new Set(heavy));
}
/**
 * 系统状态栏颜色
 */
//function plusReady() {
//	var type = plus.os.name;
//	if(type == "iOS") {
//		plus.navigator.setStatusBarBackground("red");
//	} else {
//		plus.navigator.setStatusBarBackground("#666666");
//	}
//}
//if(window.plus) {
//	plusReady();
//} else {
//	document.addEventListener("plusready", plusReady, false);
//} 




















