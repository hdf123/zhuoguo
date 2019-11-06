$(function(){
	$(".logo").click(function(){
		$(".tab>li").eq(0).css("display","block").siblings().css("display","none");
	})
	var mySwiper1 = new Swiper('.swiper1', {
		autoplay: 1000,
		speed:1000,
		loop : true,
		pagination : '.swiper-pagination',
	})
	for(i in guochad){
		$(".FruitTea_tab").append("<li>"+guochad[i]+"</li>");
	}
	function funa(guocha){//果茶
		console.log(guocha);
		var tabs='';
		for(var j=0;j<8;j++){
			tabs+='<li>'
					+'<img src="" alt="" />'
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
	var ims="";
	$(".menus>img").mouseover(function(){
		
		console.log($(this).index());
		
		$(this).fadeOut(function(){
			ims=$(this).attr("src");
			$(this).attr("src","../img/a1.png");
			$(this).fadeIn(300);
		},0);
    });
    $(".menus>img").mouseout(function(){
    	$(this).fadeOut(function(){
    		$(this).attr("src",ims);
    		$(this).fadeIn(300);
    	},0);
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
//  	$(this).children("div").css("display","block");
    	
		$(this).children("div").fadeIn(30);
    	
    	
    })
    $(".contents").on("mouseleave",".FruitTea_tabs>li",function(){
//  	$(this).children("div").css("display","none");
    	
		$(this).children("div").fadeOut(300);
    	
    })
//  加盟
	$(".gender>label").click(function(){
		console.log($(this).index());
		if($(this).children("input").is(':checked')){
			console.log(2222);
			$(this).find(".actk").addClass("act");
			$(this).siblings("label").find(".actk").removeClass("act");
		}
	})
    $(".btn1").click(function(){
		var dats = {};
		var vals = $('form').serializeArray();
		$.each(vals, function (){
		    dats[this.name] = this.value;
		});
		console.log(dats);
    })
    $(".btn2").click(function(){
    	$('form')[0].reset();
    	$(".gender>label:eq(0)").find(".actk").addClass("act");
    	$(".gender>label:eq(1)").find(".actk").removeClass("act");
    })
//  加入
   
})