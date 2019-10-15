window.onload = function(){
	/*1.顶部搜索*/
    search()

	/**/
	banner()

	downTime()
}

/*这样建立了一个独立的功能作用域*/
var search = function(){
	var searchBox = document.querySelector('.jd_search_box')
	var banner = document.querySelector('.jd_banner')
	var height = banner.offsetHeight;
	window.onscroll = function(){
	/*	console.log(document.body.scrollTop)
		console.log(document.documentElement.scrollTop)
		console.log(window.pageYoffset)*/

		console.log(document.body.scrollTop)
		var scrollTop = document.documentElement.scrollTop
	//	console.log(scrollTop)
		var opacity = 0;
		if(scrollTop < height){
			opacity = scrollTop/height * 0.85

		}else{
			opacity = 0.85
		}
		searchBox.style.background = 'rgba(201, 21, 35,'+opacity+')'

	}
    
}


var banner = function(){
	/*1.自动滚动且无缝，定时器*/
	/*2.点需要随着轮播改变  根据索引切换*/
	/*3.滑动时 利用touch事件完成*/
	/*4.滑动结束后 如果滑动的距离不超过屏幕1/3  吸附回去*/
	/*5.滑动的距离超过1/3的切换到上一张或者下一张*/

	var banner = document.querySelector('.jd_banner')
	var width = banner.offsetWidth
	var imageBox = banner.querySelector('ul:first-child')
	var pointBox = banner.querySelector('ul:last-child')
	var points = pointBox.querySelectorAll('li')
	var addTransition = function(){
		imageBox.style.transition = 'all 0.2s'

	}


	var index = 1;
	var timer = setInterval(function(){
        /*加过渡*/
        index++
		imageBox.style.transition = "all 0.2s"
		imageBox.style.webkitTransition = "all 0.2s"


		/*移动*/
		imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
        imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';
	    /*现在是可以滚动了，但是没有加无缝效果*/

	},2000)
	/*需要等最后一张动画结束去判断是否瞬间定位到第一张*/
	/*当index=9的时候，然后瞬间将当前的索引变为1*/
	imageBox.addEventListener('transitionend',function(){
		if(index >=9 ){
			index=1  ;
			/*清除过渡*/
			imageBox.style.transition='none'
			imageBox.style.webkitTransition='none'
			/*做位移*/
			/*移动：只能在自动滚动的时候无缝滚动，但是当用户开始滑动的时候*/
		    imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
            imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';
		}else if(index <=0 ){/*用户向左边，index小于等于0*/
			index=8;
			/*清除过渡*/
			imageBox.style.transition='none'
			imageBox.style.webkitTransition='none'
			/*做位移*/
			/*移动：只能在自动滚动的时候无缝滚动，但是当用户开始滑动的时候*/
		    imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
            imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';
		}

		/**/
		/*此时此刻index的取值范围只能是1-8了*/
		/*点的取值范围是0-7*/
		console.log(index)
		setPoint()

	})

	/*设置点的方法*/
	var setPoint = function(){
		for(var i=0; i<points.length; i++){
			var obj = points[i]

			/*清除样式*/
			obj.classList.remove('now')

		}
		points[index - 1].classList.add('now');
	}


	/*绑定滑动事件*/
	    var startX = 0;
	    var distanceX = 0;
	    var isMove = false
	imageBox.addEventListener('touchstart',function(e){

		/*在鼠标一开始的时候就清除定时器*/
		clearInterval(timer)
		/*记录起始位置的x坐标*/
		startX = e.touches[0].clientX;


	})

	imageBox.addEventListener('touchmove',function(e){
		isMove = true
		/*记录滑动过程中的x坐标*/
		var moveX = e.touches[0].clientX;
		/*在滑动过程中作对比*/
		/*计算位移  有正负方向*/
		 distanceX = moveX - startX
		/*这个用来计算目标元素的位移*/
		/*元素的定位等于当前定位*/
		/*目标定位 = 当前定位 + 手指移动的定位*/
		var translateX = -index * width + distanceX
		console.log(translateX)
		  /*如果元素有过渡。肯能会有迟钝的效果，所以在之前需要清除过渡*/
            imageBox.style.transition='none'
			imageBox.style.webkitTransition='none'
        /*移动：只能在自动滚动的时候无缝滚动，但是当用户开始滑动的时候*/
		    imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
            imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';
          


	})

	imageBox.addEventListener('touchend',function(){
		if(Math.abs(distanceX)<width/3 &&  isMove){
			//吸附回去
			/*清除过渡*/
			imageBox.style.transition='none'
			imageBox.style.webkitTransition='none'
			/*做位移*/
			/*移动：只能在自动滚动的时候无缝滚动，但是当用户开始滑动的时候*/
		    imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
            imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';


		}else{
			//切换
			//上一张
			//下一张
			//往左滑动是下一张，往右滑动是上一张
			//可以根据distance的正负方向来判断滑动的方向
			if(distanceX>0){
				index--
				console.log('右')
			}else{
				index++
				console.log('左')
			}
			//根据index动画的移动
			/*清除过渡*/
			imageBox.style.transition='none'
			imageBox.style.webkitTransition='none'
			/*做位移*/
			/*移动：只能在自动滚动的时候无缝滚动，但是当用户开始滑动的时候*/
		    imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
            imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';

		}

		//最后做一次参数重置
		startX=0;
		distanceX=0;
		isMove = true;
		clearInterval(timer)
		timer = setInterval(function(){
        /*加过渡*/
        index++
		imageBox.style.transition = "all 0.2s"
		imageBox.style.webkitTransition = "all 0.2s"


		/*移动*/
		imageBox.style.transform = 'translateX(' + (-index*width)+ 'px)';
        imageBox.style.webkitTransform = 'translateX(' + (-index*width) + 'px)';
	    /*现在是可以滚动了，但是没有加无缝效果*/

	},2000)

		
	})
}

var downTime = function(){
	var time = 2*60*60
	/*每一秒去更新显示的时间*/
	var spans = document.querySelectorAll('.time span');
	var timer = setInterval(function(){
		time--
		var h = Math.floor(time/3600)
		var m = Math.floor(time%3600/60)
		var s = time%60

		spans[0].innerHTML = Math.floor(h/10)
		spans[1].innerHTML = h%10

		spans[3].innerHTML = Math.floor(m/10)
		spans[4].innerHTML = m%10

		spans[6].innerHTML = Math.floor(s/10)
		spans[7].innerHTML = s%10


	},1000)

}