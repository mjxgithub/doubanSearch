var app = angular.module("myapp",["ngRoute"])
app.config(["$routeProvider",function($routeProvider){
	$routeProvider.when("/",{
		controller:"bookCtrl",
		templateUrl:"book.html"
	}).when("/detail/:id",{
		controller:"detailCtrl",
		templateUrl:"detail.html"
	})
	.when("/music",{
		controller:"musicCtrl",
		templateUrl:"music.html"
	}).when("/movie",{
		controller:"movieCtrl",
		templateUrl:"movie.html"
	}).otherwise({
		redirectTo:"/"
	})
}])
app.controller("bookCtrl",["$scope","$timeout",function($scope,$timeout){
	var myscroll = new IScroll(".content",{})
	if(localStorage.getItem("book") === null){
		localStorage.book = "c语言"
	}
	$scope.ddd = function(){
		alert(1)
	}
	$scope.searchData = ""
	$scope.searchIt = function(){
		localStorage.book=$scope.searchData
		loadNewData($scope.searchData)
	}
	loadNewData(localStorage.getItem("book"))
	function loadNewData(arg){
		$.ajax({
			type:"get",
			url:"https://api.douban.com/v2/book/search",
			dataType:"jsonp",
			data:{
				q:arg
			},
			success:function(data){
				$timeout(function(){
					$scope.arr = [];
					for( var i=0;i<data.books.length;i++ ){
						$scope.arr.push(data.books[i])
					}
					myscroll.refresh()
				},30)
				setTimeout(function(){
					myscroll.refresh()
				},1000)
			}
		});							
	}
}])
app.controller("musicCtrl",["$scope","$timeout",function($scope,$timeout){
	var myscroll = new IScroll(".content",{})
	if(localStorage.getItem("music") === null){
		localStorage.music = "爱"
	}
	$scope.searchData = ""
	$scope.searchIt = function(){
		localStorage.music = $scope.searchData
		loadNewData($scope.searchData)
	}
	loadNewData(localStorage.getItem("music"))
	function loadNewData(arg){
		$.ajax({
			type:"get",
			url:"https://api.douban.com/v2/music/search",
			dataType:"jsonp",
			data:{
				q:arg
			},
			success:function(data){
				$timeout(function(){
					$scope.arr = [];
					for( var i=0;i<data.musics.length;i++ ){
						$scope.arr.push(data.musics[i])
					}
					myscroll.refresh()
				},30)
				setTimeout(function(){
					myscroll.refresh()
				},1000)
			}
		});							
	}
}])
app.controller("movieCtrl",["$scope","$timeout",function($scope,$timeout){
	if(localStorage.getItem("movie") === null){
		localStorage.movie = "幸福"
	}
	var myscroll = new IScroll(".content",{})
	$scope.searchData = ""
	$scope.searchIt = function(){
		localStorage.movie = $scope.searchData
		loadNewData($scope.searchData)
	}
	loadNewData(localStorage.getItem("movie"))
	function loadNewData(arg){
		$.ajax({
			type:"get",
			url:"https://api.douban.com/v2/movie/search",
			dataType:"jsonp",
			data:{
				q:arg
			},
			success:function(data){
				$timeout(function(){
					$scope.arr = [];
					for( var i=0;i<data.subjects.length;i++ ){
						$scope.arr.push(data.subjects[i])
					}
					myscroll.refresh()
				},30)
				setTimeout(function(){
					myscroll.refresh()
				},1000)
			}
		});							
	}
}])
		app.controller("detailCtrl",["$scope","$timeout","$routeParams",function($scope,$timeout,$routeParams){
			console.log($routeParams)
			var myscroll = new IScroll(".content",{})
			$.ajax({
			type:"get",
			url:"https://api.douban.com/v2/book/"+$routeParams.id,	
			dataType:"jsonp",
			success:function(data){
			//	console.log(data)
				$timeout(function(){
					$scope.detailData = data
					myscroll.refresh()
				},30)
				setTimeout(function(){
					myscroll.refresh()
				},1000)
			}
		});		
		}])
