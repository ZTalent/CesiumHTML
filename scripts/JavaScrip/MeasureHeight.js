class measureHeight {
	constructor(arg) {
		//设置唯一id 备用
		this.objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
		this.viewer = arg.viewer;
		this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		this._line_height = null;
		this._heightArr = [];
	}

	//开始创建
	startCreate() {
			var $this = this;
			$this._heightArr = $this.calculateHeight($this.viewer,$this.handler);
   }

	
		calculateHeight(viewer,handler){
		handler = new Cesium.ScreenSpaceEventHandler(viewer.scene._imageryLayerCollection);
		var positions = [];
		var poly = null;
		var cartesian = null;
		var floatingPoint;
		
		var woc=-1;
		var www=0;
		var arr = [0,0];
		var loc=0;
		var dem_height = 0;
		var height = 0;
		var radius = 0;
		var heightArr = [];
		var $this = this;

		handler.setInputAction(function (movement) {
				 cartesian = $this.getCatesian3FromPX(movement.endPosition);
			 if (positions.length >= 2) {
				  if (!Cesium.defined(poly)) {
					  poly = new HeightLinePrimitive(positions);
				  } else {
						positions.pop();
						positions.push(cartesian);
				  }
				  getHeight();
				  radius = arr[0];
				  height = arr[1];
			 }
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);

		handler.setInputAction(function(movement){
				if(positions.length == 0) {
					positions.push(cartesian.clone());
					positions.push(cartesian);
					dem_height = $this._line_height;
					floatingPoint = viewer.entities.add({
					name : '起始点',
					position : positions[0],				
					point : {
						pixelSize : 5,
						color : Cesium.Color.RED,
						outlineColor : Cesium.Color.WHITE,
						outlineWidth : 2,
						disableDepthTestDistance:5000000
						},
					label : {
						text : "0米",
						font : '18px sans-serif',
						fillColor : Cesium.Color.GOLD,
						style: Cesium.LabelStyle.FILL_AND_OUTLINE,
						outlineWidth : 2,
						verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
						pixelOffset : new Cesium.Cartesian2(20, -20)
						}
					});
					heightArr.push(floatingPoint);
				}
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

		handler.setInputAction(function(movement){
			handler.destroy();
			var textDisance=(height - dem_height).toFixed(1) +"米";
			var cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
			var lon = Cesium.Math.toDegrees(cartographic.longitude);
			var lat = Cesium.Math.toDegrees(cartographic.latitude);
			var tem = viewer.entities.add({
				name : '直线距离',
				position :Cesium.Cartesian3.fromDegrees(lon, lat, height),
				point : {
					pixelSize : 5,
					color : Cesium.Color.RED,
					outlineColor : Cesium.Color.WHITE,
					outlineWidth : 2,
					},
				label : {
					text : textDisance,
					font : '18px sans-serif',
					fillColor : Cesium.Color.GOLD,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(20, -20)
					}
			});
			heightArr.push(tem);
			document.getElementById('MenuControl').innerText="false";
			document.getElementById('MenuControl2').innerText="0";
			document.getElementById("drawGeometry6").classList.toggle("layui-btn-warm");
		 },Cesium.ScreenSpaceEventType.RIGHT_CLICK);
		 
		 function getHeight(){
			 var h = window.innerHeight;
			 var $this = this;
			 document.onmousemove = function(e){
				 if(woc==-1)
				 {
					 woc = e.pageX;
				 }
					www = e.pageX;
					loc = e.pageY;
			 }
			 arr[0] = Math.abs(woc - www)/3;
			 arr[1] = ((h-loc)/20).toFixed(4);
			 return arr;
		 }
		 
		var HeightLinePrimitive = (function () {
			 function _(positions) {
				 var cartographic = Cesium.Cartographic.fromCartesian(positions[0]);
				 var lon = Cesium.Math.toDegrees(cartographic.longitude);
				 var lat = Cesium.Math.toDegrees(cartographic.latitude);
				 this.options = {
						name:'高度',
						id: $this.objId,
						polyline : {					
							show : true,
							positions : [],
							material : new Cesium.PolylineOutlineMaterialProperty({
												 color : new Cesium.Color(0.9333333,0.6784313,0.13333333,0.8),
												 outlineWidth : 1,
												 outlineColor : Cesium.Color.WHITE
											}),
							width : 8						
							},
						ellipse:{
							show : true,
							material : Cesium.Color.GREEN.withAlpha(0.5),
							outline : true 
						}
					};
				  
				 this.positions = positions;
				 this._init();
			 }
			 _.prototype._init = function () {
				var _self = this;
				var _update = function () {
					var temp_position =[];
					temp_position.push( _self.positions[0]);
					var point1cartographic = Cesium.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Cesium.Cartographic.fromCartesian(_self.positions[1]);					
					var point_temp = Cesium.Cartesian3.fromDegrees(Cesium.Math.toDegrees(point1cartographic.longitude), Cesium.Math.toDegrees(point1cartographic.latitude),height);
					temp_position.push(point_temp);
					return temp_position;
				};
				
				var _update_ellipse=function(){
					return _self.positions[0];
				}
				
				var _semiMinorAxis = function(){
					var point1cartographic = Cesium.Cartographic.fromCartesian(_self.positions[0]);
					var point2cartographic = Cesium.Cartographic.fromCartesian(_self.positions[1]);
					/**根据经纬度计算出距离**/
					var geodesic = new Cesium.EllipsoidGeodesic();
					geodesic.setEndPoints(point1cartographic, point2cartographic);
					var radius_temp = radius;
					return radius_temp/2;
				};
				
				var _height = function(){
					var height_temp = height;
					return height_temp;
				}

			  this.options.polyline.positions = new Cesium.CallbackProperty(_update,false);
			  this.options.position = new Cesium.CallbackProperty(_update_ellipse,false);
			  this.options.ellipse.semiMinorAxis =new Cesium.CallbackProperty(_semiMinorAxis,false);
			  this.options.ellipse.semiMajorAxis = new Cesium.CallbackProperty(_semiMinorAxis,false);
			  this.options.ellipse.height =  new Cesium.CallbackProperty(_height,false);
			  heightArr.push(this.options);
			  viewer.entities.add(this.options);
			 };
			 return _;
		})();
		return heightArr;
	}
	
	getCatesian3FromPX(px) {
		var cartesian;
		var ray = this.viewer.camera.getPickRay(px);
		if (!ray) return null;
		cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
		var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(cartesian);
		var lon = curPosition.longitude * 180 / Math.PI;
		var lat = curPosition.latitude * 180 / Math.PI;
		
		if(!this._line_height)
		{
			var carto=new Cesium.Cartographic.fromDegrees(lon,lat);
			var height_ = this.viewer.scene.sampleHeight(carto);
			this._line_height = height_;
			dem_height = height_;
		}
		cartesian = Cesium.Cartesian3.fromDegrees(lon,lat,this._line_height);
		return cartesian;
	}
	
	destroy(){
			if(this.handler){
				this.handler.destroy();
				this.handler = null;
			}
			if(this._heightArr)
			{
				for (var i = 0; i < this._heightArr.length; i++) {
			    var height = this._heightArr[i];
				 if(height)
				 {
					 this.viewer.entities.remove(height);
				 }
				}
			}
			this._heightArr = [];
		}
	
}