class DrawPoint {
	constructor(arg) {
		//设置唯一id 备用
		// this.objId = Number((new Date()).getTime() + "" + Number(Math.random() * 1000).toFixed(0));
		this.objId = Number(Number(Math.random() * 10000).toFixed(5));
		this.viewer = arg.viewer;
		this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
		this._position = null;
		this._point = null;
		this.objname=null;
	}

	//获取点
	get point(){
		return this._point;
	}
	//获取线的坐标数组
	get position(){
		return this._position;
	}
	//开始创建
	startCreate() {
			var $this = this;
			this.handler.setInputAction(function (evt) { //单机开始绘制
				var cartesian = $this.getCatesian3FromPX(evt.position);
				if (!cartesian) return;
				$this.objname=getDynamicMarkedName(document.getElementById("PlotName").value);
				if(!Cesium.defined($this._point)){
					$this._point = $this.createPoint(cartesian);
					$this.handler.destroy();
				}
				addDynamicMarked($this.objId,document.getElementById("PlotName").value);
				document.getElementById("PlotName").value=null;
				MenuShrinkageControl(4);
				document.getElementById('MenuControl').innerText="false";
				document.getElementById('MenuControl2').innerText="0";
				document.getElementById("drawGeometry0").classList.toggle("layui-btn-warm");
				
			}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
		}

	createPoint(cartesian) {
		//var point_name = document.getElementById("PlotName").value;
		var point_name=this.objname;
		var point = this.viewer.entities.add({
			name:point_name,
			id: this.objId,
			position: cartesian,
			point: {
				color: Cesium.Color.WHITE,
				pixelSize: 5,
				outlineColor:Cesium.Color.BLACK,
				outlineWidth:2,
				disableDepthTestDistance:5000000
			},
			label : {
				text : point_name,
				font : '18px sans-serif',
				fillColor : Cesium.Color.GOLD,
				style: Cesium.LabelStyle.FILL_AND_OUTLINE,
				outlineWidth : 2,
				verticalOrigin : Cesium.VerticalOrigin.BOTTOM,
				pixelOffset : new Cesium.Cartesian2(20, -20),
				disableDepthTestDistance:5000000
				}
		});
		return point;
	}
	
	destroy() {
		if (this.handler) {
			this.handler.destroy();
			this.handler = null;
		}
		if (this._point) {
			deleteDynamicMarked(this.objId);
			this.viewer.entities.remove(this._point);
			this._point = null;
		}
		this._point = null;
	}
	
	getCatesian3FromPX(px) {
		var cartesian;
		var ray = this.viewer.camera.getPickRay(px);
		if (!ray) return null;
		cartesian = this.viewer.scene.globe.pick(ray, this.viewer.scene);
		return cartesian;
	}
}