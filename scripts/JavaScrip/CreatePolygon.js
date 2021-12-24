class DrawPolygon {
	constructor(arg) {
		this.objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
		this.viewer = arg.viewer;
		this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		this._polygon = null;
		this._polyline = null;
		this._positions = [];
		this._point = null;
		this._polygon_height = null;
		this.objname=null;
	}

	get polygon() {
		return this._polygon;
	}
	get positions() {
		return this._positions;
	}
	startCreate() {
		var $this = this;
		this.handler.setInputAction(function (evt) { //单机开始绘制
			var cartesian = $this.getCatesian3FromPX(evt.position);
			if ($this._positions.length == 0) {
				//var name = document.getElementById("PlotName").value;
				$this.objname=getDynamicMarkedName(document.getElementById("PlotName").value);
				var name=$this.objname;
				$this._point = $this.viewer.entities.add({
				position: cartesian,
				label : {
					text : name,
					font : '18px sans-serif',
					fillColor : Cesium.Color.GOLD,
					style: Cesium.LabelStyle.FILL_AND_OUTLINE,
					outlineWidth : 2,
					verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
					pixelOffset : new Cesium.Cartesian2(20, -20)
					}
				});
				$this._positions.push(cartesian.clone());
			}
			$this._positions.push(cartesian);
		}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		this.handler.setInputAction(function (evt) { //移动时绘制面
			if ($this._positions.length < 1) return;
			var cartesian = $this.getCatesian3FromPX(evt.endPosition);
			if ($this._positions.length == 2) {
				if (!Cesium.defined($this._polyline)) {
					$this._polyline = $this.createPolyline();
				}
			}
			if ($this._positions.length == 3) {
				if ($this._polyline){
					$this.viewer.entities.remove($this._polyline);
					$this._polyline = null;
				}
				if (!Cesium.defined($this._polygon)) {
					$this._polygon = $this.createPolygon();
				}
			}
			$this._positions.pop();
			$this._positions.push(cartesian);
		}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
		this.handler.setInputAction(function (evt) {
			if (!$this._polygon) return;
			var cartesian = $this.getCatesian3FromPX(evt.position);
			$this.handler.destroy();
			$this._positions.pop();
			addDynamicMarked($this.objId,document.getElementById("PlotName").value);
			document.getElementById("PlotName").value=null;
			MenuShrinkageControl(4);
			document.getElementById('MenuControl').innerText="false";
			document.getElementById('MenuControl2').innerText="0";
			document.getElementById("drawGeometry2").classList.toggle("layui-btn-warm");
		}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	}
	createPolygon(obj) {
		var $this = this;
		return this.viewer.entities.add({
			id: $this.objId,
			name:$this.objname,
			polygon: {
				hierarchy: new Cesium.CallbackProperty(function () {
					return new Cesium.PolygonHierarchy($this._positions);
				}, false),
				// clampToGround: true,
				show: true,
				fill: true,
				height: $this._polygon_height,
				material: Cesium.Color.RED.withAlpha(0.5),				
			}
		});
	}
	createPolyline() {
		var $this = this;
		return this.viewer.entities.add({
			polyline: {
				positions: new Cesium.CallbackProperty(function () {
					return $this._positions
				}, false),
				// clampToGround: true,
				material: Cesium.Color.WHITE,
				width: 2
			}
		});
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
			this._polygon_height = height+0.05;
		}
		cartesian = Cesium.Cartesian3.fromDegrees(lon,lat,this._polygon_height);
		return cartesian;
	}
	
	destroy() {
		if (this.handler) {
			this.handler.destroy();
			this.handler = null;
		}
		if (this._polygon) {
			deleteDynamicMarked(this.objId);
			this.viewer.entities.remove(this._polygon);
			this._polygon = null;
		}
		if (this._polyline) {
			this.viewer.entities.remove(this._polyline);
			this._polyline = null;
		}
		if (this._point) {
			this.viewer.entities.remove(this._point);
			this._point = null;
		}
		this._positions = [];
	}
}