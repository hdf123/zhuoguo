$(function(){
	$(".logo").click(function(){
		$(".tab>li").eq(0).css("display","block").siblings().css("display","none");
	})
	var mySwiper1 = new Swiper('.swiper1', {
		autoplay:50000,
		speed:1000,
		loop : true,
		pagination : '.pagination',
		paginationAsRange : true
	})
	for(i in guochad){
		$(".FruitTea_tab").append("<li>"+guochad[i]+"</li>");
	}
	function funa(guocha){//果茶
		console.log(guocha);
		var tabs='';
		for(var j=0;j<8;j++){
			tabs+='<li>'
					+'<img src="https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=1999921673,816131569&fm=26&gp=0.jpg" alt="" />'
					+'<div>'
						+'<div>'+guocha[0].title+(j+1)+'</div>'
						+'<p>'+guocha[0].content+'</p>'
					+'</div>'
				+'</li>';
		}
		$(".FruitTea_tabs").html(tabs);
	}
	funa(guocha1);
	//常见问题
	for(i in problem){
		$(".list").append('<li>'
							+'<p>'+(Number(i)+1)+'、'+problem[i].title+'</p>'
							+'<span>答：'+problem[i].content+'</span>'
						+'</li>');
	}
//	首页
	var ims1="";
	$(".menus>img").mouseover(function(){
		ims=$(this).attr("src");
		$(this).attr("src","../img/a1.png");
    });
    $(".menus>img").mouseout(function(){
		$(this).attr("src",ims);
    });
    $(".menus>img").click(function(){
    	var ind=$(this).index();
    	console.log(ind);
    	if(ind==0){//企业文化
    		$(".tab>li").eq(2).css("display","block").siblings().css("display","none");
    	}else if(ind==1){//果茶
    		funa(guocha1);
    		$(".FruitTea_tab>li").eq(0).addClass("act").siblings().removeClass("act");
    		$(".tab>li").eq(3).css("display","block").siblings().css("display","none");
    	}else if(ind==2){//咖啡
    		funa(guocha3);
    		$(".FruitTea_tab>li").eq(3).addClass("act").siblings().removeClass("act");
    		$(".tab>li").eq(3).css("display","block").siblings().css("display","none");
    	}else if(ind==3){//加盟合作
    		$(".tab>li").eq(6).css("display","block").siblings().css("display","none");
    	}
    })
//  导航
    $(".nav>a").mouseover(function(){
    	$(this).children("p").css("opacity","0.5");
    	$(this).children("div").css("display","block");
    })
    $(".nav>a").mouseout(function(){
    	$(this).children("p").css("opacity","1");
    	$(this).children("div").css("display","none");
    });
    $(".nav li").mouseover(function(){
    	$(this).css("color","rgba(255,255,255,0.7)");
    })
    $(".nav li").mouseout(function(){
    	$(this).css("color","rgba(255,255,255,1)");
    })
    
    
    
//  菜单
    $(".navs li").click(function(){
    	var inds=$(this).attr("inds");
    	console.log(inds);
    	if(inds==4){
    		inds=3;
    		funa(guocha3);
    		$(".FruitTea_tab>li").eq(3).addClass("act").siblings().removeClass("act");
    	}else if(inds==3){
    		funa(guocha1);
    		$(".FruitTea_tab>li").eq(0).addClass("act").siblings().removeClass("act");
    	}
    	$(".tab>li").eq(inds).css("display","block").siblings().css("display","none");
    })
//  果茶菜单
    $(".FruitTea_tab>li").click(function(){
    	if($(this).index()==3){
    		funa(guocha3);
    	}else{
    		funa(guocha1);
    	}
    	$(this).addClass("act").siblings().removeClass("act");
    	
    })
    $(".contents .FruitTea_tabs>li").hide();
    $(".contents").on("mouseenter",".FruitTea_tabs>li",function(){
		$(this).children("div").fadeIn(300);
    	
    	
    })
    $(".contents").on("mouseleave",".FruitTea_tabs>li",function(){
		$(this).children("div").fadeOut(30);
    	
    })
//  加盟
	var p1=false,e1=false;
	$(".gender>label").click(function(){
		console.log($(this).index());
		if($(this).children("input").is(':checked')){
			console.log(2222);
			$(this).find(".actk").addClass("act");
			$(this).siblings("label").find(".actk").removeClass("act");
		}
	})
	$("[name=phone]").blur(function(){//电话验证
		var pho=$(this).val();
		var df=/^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/;//手机号正则
		if(df.test(pho)){
			p1=true;
			$(".phone>div:eq(1)").removeClass("xs");
		}else{
			$(".phone>div:eq(1)").addClass("xs");
			console.log("手机号输入错误");
		}
	})
	$("[name=email]").blur(function(){//邮箱验证
		var email=$(this).val();
		var reg = /^\w+((\.\w+){0,3})@\w+(\.\w{2,3}){1,3}$/;//邮箱正则
//		var reg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;//邮箱正则
		if(reg.test(email)){
			e1=true;
			$(".email>div:eq(1)").removeClass("xs");
		}else{
			$(".email>div:eq(1)").addClass("xs");
			console.log("邮箱格式错误");
		}
	})
    $(".btn1").click(function(){
    	var name=$("[name=name]").val();//名字
    	var phone=$("[name=phone]").val();//联系方式
    	var email=$("[name=email]").val();//邮箱
    	var address=$("[name=address]").val();//意向区域
    	var content=$("[name=content]").val();//内容
    	if(name==""||phone==""||email==""||address==""){
    		return alert("内容不可为空");
    	}else{
    		if(p1&&e1){
				var dats = {};
				var vals = $('form').serializeArray();
				$.each(vals, function (){
				    dats[this.name] = this.value;
				});
				console.log(dats);
    		}else{
    			console.log(222);
    		}
    	}
    })
    $(".btn2").click(function(){
    	$('form')[0].reset();
    	$(".gender>label:eq(0)").find(".actk").addClass("act");
    	$(".gender>label:eq(1)").find(".actk").removeClass("act");
    })
//  加入
   
})