
function Swipers() {
    // 导航 never
    var mySwiper = new Swiper('#topNav', {
        freeMode: true,
        freeModeMomentumRatio: 0.5,
        slidesPerView: 5,
        spaceBetween: 10,

    });

    swiperWidth = mySwiper.container[0].clientWidth
    maxTranslate = mySwiper.maxTranslate();
    maxWidth = -maxTranslate + swiperWidth / 2
    mySwiper.on('tap', function(swiper, e) {
//	e.preventDefault()
        slide = swiper.slides[swiper.clickedIndex]
        slideLeft = slide.offsetLeft
        slideWidth = slide.clientWidth
        slideCenter = slideLeft + slideWidth / 2
        // 被点击slide的中心点
        mySwiper.setWrapperTransition(300)
        if (slideCenter < swiperWidth / 2) {
            mySwiper.setWrapperTranslate(0)
        } else if (slideCenter > maxWidth) {
            mySwiper.setWrapperTranslate(maxTranslate)
        } else {
            nowTlanslate = slideCenter - swiperWidth / 2
            mySwiper.setWrapperTranslate(-nowTlanslate)
        }
        $("#topNav  .active").removeClass('active')
        $("#topNav .swiper-slide").eq(swiper.clickedIndex).addClass('active')

        $.ajax({
            url: '/index/mine/getorder',
            data: {'state':swiper.clickedIndex,'page':1},
            type: 'POST',
            dataType: 'json',
            success: function(result) {
                // console.log(result)
                var obj = eval(result);
                if(obj.code == 100000) {
                    page = 2;//页数
                    var orderpage = '';
                    //删除商品信息
                    var products=document.getElementById("app_center");
                    products.parentNode.removeChild(products);//删除整个div标签
                    var tag = "<div class='app_center bought_all' id=\"app_center\">";
                    if(obj.data.order.length<1){
                         tag += "<div class=\"zwdd\"><img src=\"/webs/images/zwdd.png\"><p>暂时还没有订单~</p></div>";
                    }
                    for(var i =0;i<obj.data.order.length;i++){
                        if(obj.data.order[i]['State'] == 1){
                            orderpage = 'cartqr'
                        }else{
                            orderpage = 'orderdetail'
                        }
                        // console.log(obj.data[i]);
                        tag += "<div class='list_product_item background_white' id=\"orderid"+
                            obj.data.order[i]['Putid']+"\"><div class='product_header display_flex'><div class='left_all display_flex'><img class='sp_img' src='"+obj.data.order[i]['shop']['Dianpic']+"' alt=''><p class='display_flex'><span onclick="+'"javascript:location.href='+"'/index/shop.html?shopid="+obj.data.order[i]['dianid']+"';"+'"'+">"+
                            obj.data.order[i]['shop']['Dianmc']+"</span><img class='jiantou' src='/webs/images/sjjt@3x.png'></p></div>"+
                            "<b class=\"color_zhuti\">"+obj.data.order[i]['orderstate']+"</b>" +
                            "                </div>"+
                            "<div class='jiesao_img display_flex' onclick="+'"javascript:location.href='+"'/index/product/"+orderpage+".html?orderid="+obj.data.order[i]['Putid']+"';"+'"'+"><img src='"+obj.data.order[i]['picurl']+"'><div class='miaoshu_shopping'>"+
                            "<p>"+obj.data.order[i]['title']+"</p><div class='biaojia'>" +
                            "<s class='color_zhuti'>¥</s><em class='color_zhuti'>"+obj.data.order[i]['jiage']+"</em>"+
                            "<span class='color_zhuti'>爆款</span><a>"+obj.data.order[i]['product']['Chengse']+"</a></div></div></div>"+
                            "<div class=\"lianxita display_flex\">" +
                            "                    <p class=\"display_flex\">" +
                            "                        <img src=\"/webs/images/xxicon@3x.png\" alt=\"\">" +
                            "                        <span>联系他</span>" +
                            "                    </p>";
                        switch(obj.data.order[i]['State']) {
                            case 1:
                                tag += "                    <p><a href='/index/product/cartqr.html?orderid="+obj.data.order[i]['Putid']+"'>去付款</a></p>";
                                break;
                            case 2:
                                tag += " ";
                                break;
                            case 3:
                                tag += "                     <p><a>确认收货</a></p>";
                                break;
                            case 4:
                                tag += "                    <p><a>评价</a></p> ";
                                break;
                            case 8:
                                tag += "     ";
                                break;
                            default:
                                tag += "                    <p onclick=\"delorder("+obj.data.order[i]['Putid']+")\"><a>删除订单</a></p>";
                        }
                          tag +=  "                </div></div>";
                    }
                    if(obj.data.order.length>=obj.data.pagecount){
                        tag += '<div style="height: 50px;line-height: 50px;text-align: center;font-size: 10px" onclick="load_more('+swiper.clickedIndex+')" id="load_more">加载更多</div>';
                    }else{
                        if(page != 1 || obj.data.order.length>=1) {
                            tag += '<div style="height: 50px;line-height: 50px;text-align: center;font-size: 10px">已到最后</div>';
                        }
                    }
                    tag += "<div id=\"center1\"></div></div>";
                    document.getElementById('center').insertAdjacentHTML("afterend", tag);
                }
                if(obj.code == 100015){
                    //跳转到登录页面
                    window.location.href="/loginreg.html";
                }
            },
            error: function(err) {
                layer.open({
                    content: '网络错误'
                    ,skin: 'msg'
                    ,time: 2 //2秒后自动关闭
                    ,style:'bottom:5rem'
                });
            }
        })
    })
};
Swipers()