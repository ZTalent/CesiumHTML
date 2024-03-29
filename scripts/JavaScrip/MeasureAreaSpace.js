class measureAreaSpace {
	constructor(arg) {
		//设置唯一id 备用
		this.objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
		this.viewer = arg.viewer;
		this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		this._polygon_height = null;
		this._areaArr = [];
	}



	//开始创建
	startCreate() {
		var $this = this;
		$this._areaArr = $this.calculateAreaSpace($this.viewer,$this.handler);
	}

	calculateAreaSpace(viewer, handler){  
	  // 取消双击事件-追踪该位置
	  viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);
	  // 鼠标事件
		 var positions = [];
		 var tempPoints = [];
		 var polygon = null;
		 var cartesian = null;
		 var floatingPoint;//浮动点
		 var areaArr = [];
		 var $this = this;
		 
		 handler.setInputAction(function(movement){
			// var ray = viewer.camera.getPickRay(movement.endPosition);
			// cartesian = viewer.scene.globe.pick(ray, viewer.scene);
			cartesian = $this.getCatesian3FromPX(movement.endPosition);
			  if(positions.length >= 2){
					if (!Cesium.defined(polygon)) {
						 polygon = new PolygonPrimitive(positions);
					}else{
						 positions.pop();
						 positions.push(cartesian);
					}
			  }
		 },Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		 
		 handler.setInputAction(function(movement){
			// var ray = viewer.camera.getPickRay(movement.position);
			// cartesian = viewer.scene.globe.pick(ray, viewer.scene);
			// cartesian = $this.getCatesian3FromPX(movement.endPosition);
			  if(positions.length == 0) {
					positions.push(cartesian.clone());
			  }
			  positions.push(cartesian);
			  //在三维场景中添加点
			  var cartographic = Cesium.Cartographic.fromCartesian(positions[positions.length - 1]);
			  var longitudeString = Cesium.Math.toDegrees(cartographic.longitude);
			  var latitudeString = Cesium.Math.toDegrees(cartographic.latitude);
			  var heightString = cartographic.height;
			  tempPoints.push({ lon: longitudeString, lat: latitudeString ,hei:heightString});
			  floatingPoint = viewer.entities.add({
					name : '多边形面积',
					position : positions[positions.length - 1],         
					point : {
						 pixelSize : 5,
						 color : Cesium.Color.RED,
						 outlineColor : Cesium.Color.WHITE,
						 outlineWidth : 2,
						 heightReference:Cesium.HeightReference.CLAMP_TO_GROUND,
						 disableDepthTestDistance:5000000
					}
			  }); 
			  areaArr.push(floatingPoint);
		 },Cesium.ScreenSpaceEventType.LEFT_CLICK);
		  
		 handler.setInputAction(function(movement){
			  handler.destroy();
			  positions.pop();
			  var textArea = getArea(tempPoints) + "平方米";
			  var tem = viewer.entities.add({
					name : '多边形面积',
					position : positions[positions.length - 1],
					point : {
					 pixelSize : 5,
					 color : Cesium.Color.RED,
					 outlineColor : Cesium.Color.WHITE,
					 outlineWidth : 2,
					 heightReference:Cesium.HeightReference.CLAMP_TO_GROUND 
					},
					label : {
						 text : textArea,
						 font : '18px sans-serif',
						 fillColor : Cesium.Color.GOLD,
						 style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						 outlineWidth : 2,
						 verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
			  pixelOffset : new Cesium.Cartesian2(20, -40),
			  heightReference:Cesium.HeightReference.CLAMP_TO_GROUND
					}
			  });
			  areaArr.push(tem);
			  document.getElementById('MenuControl').innerText="false";
			  document.getElementById('MenuControl2').innerText="0";
			  document.getElementById("drawGeometry4").classList.toggle("layui-btn-warm");
		 }, Cesium.ScreenSpaceEventType.RIGHT_CLICK );   
	 
		 var radiansPerDegree = Math.PI / 180.0;//角度转化为弧度(rad) 
		 var degreesPerRadian = 180.0 / Math.PI;//弧度转化为角度
		 
		 /*角度*/
		 function Angle(p1, p2, p3) {
			  var bearing21 = Bearing(p2, p1);
			  var bearing23 = Bearing(p2, p3);
			  var angle = bearing21 - bearing23;
			  if (angle < 0) {
					angle += 360;
			  }
			  return angle;
		 }
		 /*方向*/
		 function Bearing(from, to) {
			  var lat1 = from.lat * radiansPerDegree;
			  var lon1 = from.lon * radiansPerDegree;
			  var lat2 = to.lat * radiansPerDegree;
			  var lon2 = to.lon * radiansPerDegree;
			  var angle = -Math.atan2(Math.sin(lon1 - lon2) * Math.cos(lat2), Math.cos(lat1) * Math.sin(lat2) - Math.sin(lat1) * Math.cos(lat2) * Math.cos(lon1 - lon2));
			  if (angle < 0) {
					angle += Math.PI * 2.0;
			  }
			  angle = angle * degreesPerRadian;//角度
			  return angle;
		 }
		 /*距离*/
		 function distance(point1,point2){
			  var point1cartographic = Cesium.Cartographic.fromCartesian(point1);
			  var point2cartographic = Cesium.Cartographic.fromCartesian(point2);
			  /**根据经纬度计算出距离**/
			  var geodesic = new Cesium.EllipsoidGeodesic();
			  geodesic.setEndPoints(point1cartographic, point2cartographic);
			  var s = geodesic.surfaceDistance;
			  s = Math.sqrt(Math.pow(s, 2) + Math.pow(point2cartographic.height - point1cartographic.height, 2)); 
			  return s;
		 }
		 
		 
		 
		   function getArea(path) {
		     var radius = 6371009;
		     var len = path.length;
		     if (len < 3) return 0;
		     var total = 0;
		     var prev = path[len - 1];
		     var prevTanLat = Math.tan(((Math.PI / 2 - prev.lat / 180 * Math.PI) / 2));
		     var prevLng = (prev.lon) / 180 * Math.PI;
		     for (var i in path) {
		         var tanLat = Math.tan((Math.PI / 2 -
		             (path[i].lat) / 180 * Math.PI) / 2);
		         var lng = (path[i].lon) / 180 * Math.PI;
		         total += polarTriangleArea(tanLat, lng, prevTanLat, prevLng);
		         prevTanLat = tanLat;
		         prevLng = lng;
		     }
		     return Math.abs(total * (radius * radius)).toFixed(1);
		   }
		   
			function polarTriangleArea(tan1, lng1, tan2, lng2) {
		         var deltaLng = lng1 - lng2;
		         var t = tan1 * tan2;
		         return 2 * Math.atan2(t * Math.sin(deltaLng), 1 + t * Math.cos(deltaLng));
		   }
		 
		 
		 var PolygonPrimitive = (function(){
			  function _(positions){
					this.options = {
						 name:'多边形',
						 id: $this.objId,
						 polygon : {
							  hierarchy : [],
							  material : Cesium.Color.GREEN.withAlpha(0.5),
							  height: $this._polygon_height,
						 }
					};
					
					this.hierarchy = {positions};
					this._init();
			  }
		 
			  _.prototype._init = function(){
					var _self = this;
					var _update = function(){
						 return _self.hierarchy;
					};
					//实时更新polygon.hierarchy
					this.options.polygon.hierarchy = new Cesium.CallbackProperty(_update,false);
					areaArr.push(this.options);
					viewer.entities.add(this.options);
			  };
		 
			  return _;
		 })();
		 return areaArr;
	}
	
	getCatesian3FromPX(px) {
		var cartesian;
		var ray = this.viewer.camera.getPickRay(px);
		if (!ray) return null;
		cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
		var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
		var lon = curPosition.longitude * 180 / Math.PI;
		var lat = curPosition.latitude * 180 / Math.PI;
		if(!this._polygon_height)
		{
			var carto=new Cesium.Cartographic.fromDegrees(lon,lat);
			var height = this.viewer.scene.sampleHeight(carto);
			this._polygon_height = height + 0.05;
		}
		cartesian = Cesium.Cartesian3.fromDegrees(lon,lat,this._polygon_height);
		console.log(cartesian);
		return cartesian;
	}
	
	destroy(){
			if(this.handler){
				this.handler.destroy();
				this.handler = null;
			}
			if(this._areaArr)
			{
				for (var i = 0; i < this._areaArr.length; i++) {
			    var area = this._areaArr[i];
				 if(area)
				 {
					 this.viewer.entities.remove(area);
				 }
				}
			}
			this._areaArr = [];
		}
	
}