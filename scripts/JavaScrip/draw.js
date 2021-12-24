//管理点、线、面
class DrawPolt {
    constructor(arg) {
        this.viewer = arg.viewer
        this._pointArr = [];
        this._lineArr = [];
        this._gonArr = [];
		  
		  this._mlineArr = [];
		  this._mareaArr = [];
		  this._mheightArr = [];
		  this._mcircleArr = [];
		  this._mspacelineArr = [];
		  
        this.handler = null;
    }
    get pointArr() {
        return this._pointArr;
    }
    get polylineArr() {
        return this._lineArr;
    }
    get polygonArr() {
        return this._gonArr;
    }
	 
    create(type) {
        if (!type) {
            console.warn("请选择类型！");
        }
        if (type == 1) { //绘制点
		  document.getElementById("drawGeometry0").classList.toggle("layui-btn-warm");
            var point = new DrawPoint({
                viewer: this.viewer
            });
            point.startCreate();
            this._pointArr.push(point);

        } else if (type == 2) { //绘制线
		  document.getElementById("drawGeometry1").classList.toggle("layui-btn-warm");
            var line = new DrawPolyline({
                viewer: this.viewer
            });
            line.startCreate();
            this._lineArr.push(line);
        } else if(type==3){ //绘制面
		  document.getElementById("drawGeometry2").classList.toggle("layui-btn-warm");
            var gon = new DrawPolygon({
                viewer: this.viewer
            });
            gon.startCreate();
            this._gonArr.push(gon);
        }else if(type == 4){//水平距离
		   document.getElementById("drawGeometry3").classList.toggle("layui-btn-warm");
			 var mline = new measureLineSpace({
			     viewer: this.viewer
			 });
			 mline.startCreate();
			 this._mlineArr.push(mline); 
		  }else if(type == 5){//空间面积
		   document.getElementById("drawGeometry4").classList.toggle("layui-btn-warm");
			  var marea = new measureAreaSpace({
			      viewer: this.viewer
			  });
			  marea.startCreate();
			  this._mareaArr.push(marea);
		  }else if(type == 6){//圆面积
		   document.getElementById("drawGeometry5").classList.toggle("layui-btn-warm");
			  var mcircle = new measureCircle({
			  				  viewer: this.viewer
			  });
			  mcircle.startCreate();
			  this._mcircleArr.push(mcircle);
		  }else if(type == 7){//垂直距离
		   document.getElementById("drawGeometry6").classList.toggle("layui-btn-warm");
			  var mheight = new measureHeight({
			      viewer: this.viewer
			  });
			  mheight.startCreate();
			  this._mheightArr.push(mheight);
		  }else if(type == 8){
			  document.getElementById("drawGeometry9").classList.toggle("layui-btn-warm");
			    var mspaceline = new measureSpaceLine({
			        viewer: this.viewer
			    });
			    mspaceline.startCreate();
			    this._mspacelineArr.push(mspaceline);
		  }
    }
    clearAll() {
        for (var i = 0; i < this._lineArr.length; i++) {
            var line = this._lineArr[i];
            line.destroy();
        }
        this._lineArr = [];
        for (var j = 0; j < this._gonArr.length; j++) {
            var gon = this._gonArr[j];
            gon.destroy();
        }
        this._gonArr = [];
        for (var k = 0; k < this._pointArr.length; k++) {
            var point = this._pointArr[k];
            point.destroy();
        }
        this._pointArr = [];
		  
		  for (var x = 0; x < this._mlineArr.length; x++) {
		      var mline = this._mlineArr[x];
		      mline.destroy();
		  }
		  this._mlineArr = [];
		  
		  for (var y = 0; y < this._mareaArr.length; y++) {
		      var marea = this._mareaArr[y];
		      marea.destroy();
		  }
		  this._mareaArr = [];
		  
		  for (var z = 0; z < this._mheightArr.length; z++) {
		      var mheight = this._mheightArr[z];
		      mheight.destroy();
		  }
		  this._mheightArr = [];
		  
		  for (var p = 0; p < this._mcircleArr.length; p++) {
		      var mcircle = this._mcircleArr[p];
		      mcircle.destroy();
		  }
		  this._mcircleArr = [];
		  
		  for (var x = 0; x < this._mspacelineArr.length; x++) {
		      var msline = this._mspacelineArr[x];
		      msline.destroy();
		  }
		  this._mspacelineArr = [];
		  
    }
	 
    clearOne() {
        if (!this.handler) {
            this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
        }
        var that = this;
        this.handler.setInputAction(function (evt) {
            var pick = that.viewer.scene.pick(evt.position);
            if (Cesium.defined(pick) && pick.id) {
					var flag = false;
					if(!flag)
					{
					   for (var i = 0; i < that._pointArr.length; i++) {
						  var poi = that._pointArr[i];
						  if(poi.objId == pick.id.id)
						  {
							  flag = true;
							  poi.destroy();
							  that.handler.destroy();
							  that.handler = null;
							  break;
						  }
						}
					 }      
					
					if(!flag)
					{
					 for (var i = 0; i < that._lineArr.length; i++) {
						  var line = that._lineArr[i];
						  if(line.objId == pick.id.id)
						  {
							  flag = true;
							  line.destroy();
							  that.handler.destroy();
							  that.handler = null;
							  break;
						  }
					  }
					 }
					 
					 if(!flag)
					 {
					 for (var i = 0; i < that._gonArr.length; i++) {
						var gon = that._gonArr[i];
					   if(gon.objId == pick.id.id)
					   {
						  flag = true;
						  gon.destroy();
						  that.handler.destroy();
						  that.handler = null;
						  break;
						 }
						}
					  }
					
					
					for (var i = 0; i < that._mlineArr.length; i++) {
					 var mline = that._mlineArr[i];
					 if(mline.objId==pick.id.id)
					 {
						  flag = true;
						  mline.destroy();
						  that.handler.destroy();
						  that.handler = null;
					 }
					}
						
					if(!flag)
					{
						for (var j = 0; j < that._mareaArr.length; j++) {
						 var marea = that._mareaArr[j];
						 if(marea.objId==pick.id.id)
						 {
							  flag = true;
							  marea.destroy();
							  that.handler.destroy();
							  that.handler = null;
						 }
						}
					}
										
					if(!flag)
					{
						for (var k = 0; k < that._mheightArr.length; k++) {
						 var mheight = that._mheightArr[k];
						 if(mheight.objId == pick.id.id)
						 {
							 flag = true;
							 mheight.destroy();
							 that.handler.destroy();
							 that.handler = null;
						 }
					 }
					 }
										 
					if(!flag)
					{
						for (var k = 0; k < that._mcircleArr.length; k++) {
							 var mcircle = that._mcircleArr[k];
							 if(mcircle.objId == pick.id.id)
							 {
								 flag = true;
								 mcircle.destroy();
								 that.handler.destroy();
								 that.handler = null;
							 }
						 }
					 }
					  
				  if(!flag)
				  {
					 for (var i = 0; i < that._mspacelineArr.length; i++) {
						var msline = that._mspacelineArr[i];
						if(msline.objId == pick.id.id)
						{
							flag = true;
						   msline.destroy();
						   that.handler.destroy();
						   that.handler = null;
						 }
					  }
					}
					
            }
				document.getElementById('MenuControl').innerText="false";
				document.getElementById('MenuControl2').innerText="0";
				document.getElementById("drawGeometry7").classList.toggle("layui-btn-warm");
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
	 
	 
	 fly2DynamicMarked(id)
	 {
		 var that = this;
		 var flag = false;

			for (var i = 0; i < that._pointArr.length; i++) {
			  var poi = that._pointArr[i];
			  if(poi.objId == id)
			  {
				  flag = true;
				  viewer.zoomTo(poi._point);
				  return ;
			  }
			}    
		 					

		 for (var i = 0; i < that._lineArr.length; i++) {
			  var line = that._lineArr[i];
			  if(line.objId == id)
			  {
				  flag = true;
				  viewer.zoomTo(line._first_point);
				  return ;
			  }
		  }
		 					 

		 for (var i = 0; i < that._gonArr.length; i++) {
			var gon = that._gonArr[i];
			if(gon.objId == id)
			{
			  flag = true;
			  viewer.zoomTo(gon._point);
			  return ;
			 }
			}
	 }
}