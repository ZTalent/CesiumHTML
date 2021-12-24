// Get your own Bing Maps API key at https://www.bingmapsportal.com, prior to publishing your Cesium application:
// Cesium.BingMapsApi.defaultKey = 'put your API key here';
// Construct the default list of terrain sources.
  
 Cesium.Ion.defaultAccessToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIxNzIyZDQ4MS0wMWFjLTQ0NmEtYjNjZC1mNjcwMjA5NzEzYmYiLCJpZCI6NDkyMTYsImlhdCI6MTYxNzM0NTEzNH0.RCV9Inpx2XCLua5qHHndZkGcn2RUrczpfZSaVjvOy8s';

/**************************************************服务器获取tex、dem**********************************************/
 var LYLdem = new Cesium.CesiumTerrainProvider({
 	// url:'http://123.57.131.64:8081/data/dem/LYL1_DEM',
	url:'http://162.105.86.217:8080/data/dem/LYL1_DEM',
	// url:'http://gis4g.pku.edu.cn/3d/data/dem/LYL1_DEM',
 });
  
 var LYLtex = new Cesium.UrlTemplateImageryProvider({
   // url: "http://123.57.131.64:8081/data/tex/LYL/{z}/{x}/{y}.png",
	url:"http://162.105.86.217:8080/data/tex/LYL/{z}/{x}/{y}.png"
	// url:'http://gis4g.pku.edu.cn/3d/data/tex/LYL/{z}/{x}/{y}.png',
 });
 
 var Rectangletex = new Cesium.UrlTemplateImageryProvider({
  // url: "http://123.57.131.64:8081/data/tex/LYL/{z}/{x}/{y}.png",
  url:"http://162.105.86.217:8080/data/tex/Rectangle/{z}/{x}/{y}.png"
   // url:'http://gis4g.pku.edu.cn/3d/data/tex/Rectangle/{z}/{x}/{y}.png'
 });
 
/**************************************************服务器获取tex、dem代码结束**********************************************/

/**************************************************Cesium基础窗口**********************************************/
var viewer = new Cesium.Viewer('cesiumContainer',{
	 
		animation:false,//是否显示动画控件
		homeButton:false,//是否显示Home按钮
		fullscreenButton:false,//是否显示全屏按钮
		baseLayerPicker:false,//是否显示图层选择控件
		geocoder: false, //是否显示地名查找控件
		timeline: false, //是否显示时间线控件
		vrButton:false,
		sceneModePicker: false, //是否显示投影方式控件
		navigationHelpButton: false, //是否显示帮助信息控件
		infoBox: true, //是否显示点击要素之后显示的信息
		requestRenderMode: true, //启用请求渲染模式
		contextOptions: {
		    webgl: {
		        alpha: false,
		        depth: true,
		        stencil: true,
		        antialias: true,
		        premultipliedAlpha: true,
		        preserveDrawingBuffer: true,
		        failIfMajorPerformanceCaveat: true
		    }
		}
});
viewer.terrainProvider = LYLdem;
viewer.imageryLayers.addImageryProvider(Rectangletex);
viewer.imageryLayers.addImageryProvider(LYLtex);
viewer.clock.shouldAnimate = true;
viewer._cesiumWidget._creditContainer.style.display = "none";

/**************************************************Cesium基础窗口代码结束**********************************************/

var handler = new Cesium.ScreenSpaceEventHandler(viewer.canvas);


// var directionlight = new Cesium.DirectionalLight({
// 	direction: new Cesium.Cartesian3(
// 	 50.12423,  
// 	 0.479131,
// 	 0.0
// 	),
// 	intensity: 0.7,
// });

// viewer.scene.light = directionlight;

// var ambientOcclusion = viewer.scene.postProcessStages.ambientOcclusion;
// ambientOcclusion.enabled = true;
// ambientOcclusion.uniforms.ambientOcclusionOnly = false;
// ambientOcclusion.uniforms.intensity = 1;
// ambientOcclusion.uniforms.bias = 0.1;
// ambientOcclusion.uniforms.lengthCap = 0.1;
// ambientOcclusion.uniforms.stepSize = 0.7;
// ambientOcclusion.uniforms.blurStepSize = 0.9;


// viewer.scene.skyBox.show = true;
// viewer.scene.globe.enableLighting = false;
// viewer.shadows = true;
// viewer.scene.shadowMap.softShadows = true; 

// if(Cesium.FeatureDetection.supportsImageRenderingPixelated()){//判断是否支持图像渲染像素化处理
//   viewer.resolutionScale = window.devicePixelRatio;
// }
// viewer.scene.fxaa = true;
// viewer.scene.postProcessStages.fxaa.enabled = true;

// viewer.scene.skyAtmosphere.show = true;
// viewer.scene.skyAtmosphere.hueShift = 0; //1
// viewer.scene.skyAtmosphere.saturationShift = 0;//1
// viewer.scene.skyAtmosphere.brightnessShift = 0; //1

/**********************************************功能控制面板主菜单*****************************************************/
function MainMenueControl(type){
	var mflag = document.getElementById('MenuControl').innerText;
	if(mflag=="false")
	{
		document.getElementById('MenuControl2').innerText="3";
		document.getElementById('MenuControl').innerText="true";
		switch (type){
			case 0://绘制点
				drawGeometry(0);
				break;
			case 1://绘制线
				drawGeometry(1);
				break;
			case 2://绘制面
				drawGeometry(2);
				break;
			case 3://水平距离
				drawGeometry(3);
				break;
			case 4://空间面积
				drawGeometry(4);
				break;
			case 5://圆面积
				drawGeometry(5);
				break;
			case 6://垂直距离
				drawGeometry(6);
				break;
			case 7://清楚单个
				drawGeometry(7);
				break;//
			case 8://清楚全部
				drawGeometry(8);
				break;
			case 9://
				MenuShrinkageControl(1);
				break;
			case 10://
			
				break;
			case 11://
				MenuShrinkageControl(0);
				break;
			case 12://第一人称视角漫游函数
				startTheFirstPerson();
				break;
			case 13://路径漫游函数
				roamPath();
				break;
			case 14://空间距离测量函数
				drawGeometry(9);
				break;
		}
	}
}


/**********************************************交互绘制点、线、面*****************************************************/
	var draw = new DrawPolt({
			viewer:viewer
		});
	
	function drawGeometry(type) {
	    switch (type) {
	        case 0:
			  MenuShrinkageControl(4);
				draw.create(1);
	         break;
	        case 1:
			  MenuShrinkageControl(4);
				draw.create(2);
	         break;
	        case 2:
			  MenuShrinkageControl(4);
			   draw.create(3);
	         break;
	        case 3:
	         draw.create(4);
	         break;
			  case 4:
				draw.create(5);
				break;
			  case 5:
				draw.create(6);
				break;
			  case 6:
				draw.create(7);
				break;
			  case 7:
			   document.getElementById("drawGeometry7").classList.toggle("layui-btn-warm");
				draw.clearOne();
				break;
			  case 8:
			   draw.clearAll();
				document.getElementById('MenuControl2').innerText="0";
			   document.getElementById('MenuControl').innerText="false";
				break;
			  case 9:
				draw.create(8);
	    }
	}
/**********************************************交互绘制点、线、面代码结束**********************************************/

/**********************************************地下模式设置**********************************************************/
var isunderground=false;
viewer.scene.globe.depthTestAgainstTerrain = true;
function changeMode(){
	if(!isunderground)
		{
			isunderground=true;
			viewer.scene.globe.translucency.enabled = true;
			viewer.scene.screenSpaceCameraController.enableCollisionDetection = false;
			changeAlpha();
		}else{
			isunderground=false;
			viewer.scene.globe.translucency.enabled = false;
			viewer.scene.screenSpaceCameraController.enableCollisionDetection = true;
		}
}

function changeAlpha(){
	if(isunderground)
	{
		viewer.scene.globe.translucency.enabled = true;
		var alpha=document.getElementById("myRange").value;
		viewer.scene.globe.translucency.frontFaceAlphaByDistance = new Cesium.NearFarScalar(1.5e2, alpha/100, 8.0e6, 1.0);
	}
}
/******************************************地下模式代码结束**********************************************************/
  viewer.camera.setView({
	   
      destination: new Cesium.Cartesian3.fromDegrees(116.12424, 38.479100, 100),
		// destination: new Cesium.Cartesian3.fromDegrees(115.94695, 38.234119, 100),
		// destination: new Cesium.Cartesian3.fromDegrees(116.05136, 38.39950, 100),
		// destination: new Cesium.Cartesian3.fromDegrees(115.96381, 38.2517, 100),
		// destination: new Cesium.Cartesian3.fromDegrees(115.80922377, 38.3027262, 100),
		// destination: new Cesium.Cartesian3.fromDegrees(116.088366, 38.490621, 100),
		// destination: new Cesium.Cartesian3.fromDegrees(115.8599139, 38.3398435, 100),
		 // destination: new Cesium.Cartesian3.fromDegrees(115.878366, 38.347718, 100),
    });
function addModel(model_url, model_position, model_name, model_description){
	var entity=viewer.entities.add({
			name:model_name,
			position:model_position,
			model: {
				// 引入模型
				uri: model_url,
				// 模型的近似最小像素大小，而不考虑缩放。这可以用来确保即使观看者缩小也可以看到模型。如果为0.0，则不强制使用最小大小
				minimumPixelSize: 0,
				// 模型的颜色（与模型的渲染颜色混合的属性）
				color: Cesium.Color.WHITE.withAlpha(1),
				// 模型的最大比例大小
				maximumScale: 1280,
				// 设置模型轮廓（边框）颜色
				silhouetteColor: Cesium.Color.BLACK,
				// 设置模型轮廓（边框）大小
				silhouetteSize: 0,
				// 是否执行模型动画
				runAnimations: true,
				// 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
				scale: 1.0,
				// 是否显示
				show: true,
				
				disableDepthTestDistance:500
			},
	});
	entity.description = model_description;
}

function addLayerModel(model_url, model_position, model_name, model_description){
	var entity=viewer.entities.add({
			name:model_name,
			position:model_position,
			model: {
				// 引入模型
				uri: model_url,
				// 模型的近似最小像素大小，而不考虑缩放。这可以用来确保即使观看者缩小也可以看到模型。如果为0.0，则不强制使用最小大小
				minimumPixelSize: 0,
				// 模型的颜色（与模型的渲染颜色混合的属性）
				color: Cesium.Color.WHITE.withAlpha(1),
				// 模型的最大比例大小
				maximumScale: 1280,
				// 设置模型轮廓（边框）颜色
				silhouetteColor: Cesium.Color.BLACK,
				// 设置模型轮廓（边框）大小
				silhouetteSize: 0,
				// 是否执行模型动画
				runAnimations: true,
				// 应用于图像的统一比例。比例大于会1.0放大标签，而比例小于会1.0缩小标签。
				scale: 1.0,
				// 是否显示
				show: true,
				
				// distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 500),
			},
	});
	entity.description = model_description;
	return entity;
}

/*********************************************模型编辑************************************************/
var count =0;
 function editModel(type) {
	var model_handler = null;
	var m_model= null;
	
	if (!model_handler) {
		model_handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
	}  
	model_handler.setInputAction(function (evt) {
	  var modelEditBar = document.getElementById("ModelEditBar");
	  var pick;
	  var model_id;
		pick = viewer.scene.pick(evt.position);
		if (Cesium.defined(pick) && pick.id) {
			 m_model = viewer.entities.getById(pick.id.id);
			 
			 var silhouetteSizeNum= 3.0;
			 if(count%2==0)
			 {
			 	silhouetteSizeNum=0.0;
			 } 
			 
			 m_model.model.silhouetteColor = Cesium.Color.RED; //选中模型后高亮
			 //m_model.model.silhouetteSize = 3.0;
			 m_model.model.silhouetteSize = silhouetteSizeNum;
			 //1.创建viewModel对象
			 var editModel = {
				scale: 1.0,
				heading:   0.0,
				pitch:  0.0,
				roll: 0.0,
				alpha: 1.0,
				tranX: 0.0,
				tranY: 0.0,
				tranZ: 0.0
			 };	
			 //2.监测viewModel中的属性
			 Cesium.knockout.track(editModel); 
			 //3.激活属性,将viewModel对象与html控件绑定
			 
			 Cesium.knockout.applyBindings(editModel, modelEditBar);
			 
			 changeModel("scale");
			 changeModel("heading");
			 changeModel("pitch");
			 changeModel("roll");
			 changeModel("alpha");
			 changeModel("tranX");
			 changeModel("tranY");
			 changeModel("tranZ");
			 
			 var heading = 0;
			 var pitch = 0;
			 var roll =0;
			 
			 var offsetx = 0;
			 var offsety = 0;
			 var offsetz = 0;
			 
			 var cartographic = Cesium.Cartographic.fromCartesian(m_model.position._value);
			 var lon = Cesium.Math.toDegrees(cartographic.longitude);
			 var lat = Cesium.Math.toDegrees(cartographic.latitude);
			 var height = cartographic.height;
				 
			 function changeModel(name){
				Cesium.knockout.getObservable(editModel, name).subscribe(function(value) {
					//value值改变后会赋值给imagelayer的相应属性
					var origin = m_model.position._value;
					
					if(name=="scale")
					{
						m_model.model.scale=value;
					}
					if(name=="heading")
					{
						heading = Cesium.Math.toRadians(value);
					}
					if(name=="pitch")
					{
						pitch = Cesium.Math.toRadians(value);
					}
					
					if(name=="roll")
					{
						roll = Cesium.Math.toRadians(value);
					}
					if(name=="alpha")
					{
						m_model.model.color = Cesium.Color.WHITE.withAlpha(value);
					}
					if(name=="tranX")
					{
						offsetx = Number(value)/100;
					}
					if(name=="tranY")
					{
						offsety = Number(value)/100;
					}
					if(name=="tranZ")
					{
						offsetz = Number(value);
					}
					var hpr = new Cesium.HeadingPitchRoll(heading,pitch,roll);
					var orientation = Cesium.Transforms.headingPitchRollQuaternion(origin,hpr);
					m_model.orientation = orientation;
					m_model.position = new Cesium.Cartesian3.fromDegrees(lon + offsetx, lat + offsety, height + offsetz);
				});
			 }
		}
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
  
  model_handler.setInputAction(function (evt) {
	  if(m_model)
	  {
		  m_model.model.silhouetteColor = Cesium.Color.RED; //选中模型后高亮
		  m_model.model.silhouetteSize = 0.0;
		  var bindID = document.getElementById("ModelEditBar");
		  Cesium.knockout.cleanNode(bindID);
	  }
	},Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	count++;
}
/*********************************************模型编辑结束************************************************/




/*********************************************场景截图代码************************************************/
function saveToFile() {
  let canvas = viewer.scene.canvas;
  let image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");

  let link = document.createElement("a");
  let blob = dataURLtoBlob(image);
  let objurl = URL.createObjectURL(blob);
  link.download = "scene.png";
  link.href = objurl;
  link.click();
}

function dataURLtoBlob(dataurl) {
  let arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
  while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}
/*********************************************场景截图代码结束************************************************/



/*********************************************模型添加函数****************************************************/


function getCenterPosition() {
      var result = viewer.camera.pickEllipsoid(new Cesium.Cartesian2(viewer.canvas.clientWidth / 2, viewer.canvas
        .clientHeight / 2));
      var curPosition = Cesium.Ellipsoid.WGS84.cartesianToCartographic(result);
      var lon = curPosition.longitude * 180 / Math.PI;
      var lat = curPosition.latitude * 180 / Math.PI;
      var height = getHeight();
      return {
        lon: lon,
        lat: lat,
        height: height
      };
    }
  /* 获取camera高度  */
function getHeight() {
      if (viewer) {
        var scene = viewer.scene;
        var ellipsoid = scene.globe.ellipsoid;
        var height = ellipsoid.cartesianToCartographic(viewer.camera.position).height;
        return height;
      }
}

function addExistingModel(type) {
			var m_position = getCenterPosition();
			switch(type) {
				case(0):
					addModel('./model/testmodel/gladiador/scene.gltf',Cesium.Cartesian3.fromDegrees(m_position.lon, m_position.lat, 0),'model1','\
					<p>\ 添加测试模型1</p>');
					break;
				case(1):
					addModel('./model/testmodel/dinosaur_fbx/scene.gltf',Cesium.Cartesian3.fromDegrees(m_position.lon, m_position.lat, 0),'model2','\
					<p>\ 添加测试模型2</p>');
					break;
				case(2):
					addModel('./model/source/building3/building3.gltf',Cesium.Cartesian3.fromDegrees(m_position.lon, m_position.lat, 0),'model3','\
					<p>\ 添加测试模型3</p>');
					break;
			}
	}

function clearOneModel()
{
	if (!this.handler) {
	    this.handler = new Cesium.ScreenSpaceEventHandler(this.viewer.scene.canvas);
	}
	var that = this;
	this.handler.setInputAction(function (evt) {
	    var pick = that.viewer.scene.pick(evt.position);
	    if (Cesium.defined(pick) && pick.id) {
	        that.viewer.entities.remove(pick.id);
	        that.handler.destroy();
	        that.handler = null;
	    }
	}, Cesium.ScreenSpaceEventType.LEFT_CLICK);
}
	
/*********************************************模型添加函数结束************************************************/

/*********************************************经纬度定位*****************************************************/
function fly2Mylonlat()
{
	var m_lon = document.getElementById("myLon").value;
	var m_lat = document.getElementById("myLat").value;
	MenuShrinkageControl(1);
	viewer.camera.flyTo({
	    destination : Cesium.Cartesian3.fromDegrees(m_lon, m_lat, 200.0)
	});
}
/*********************************************经纬度定位结束*************************************************/



/*********************************************第一人称视角操作*********************************************/
function getModelHeight(lon,lat)
{
	var carto=new Cesium.Cartographic.fromDegrees(lon,lat);
	var model_height = viewer.scene.sampleHeight(carto);
	if(!model_height)
	{
	  model_height=this.viewer.scene.globe.getHeight(carto);
	}
	return model_height + 3.0;
}

var person_height = 10;
var count_firstPerson = 0;
function FirstPerson(){
	if(count_firstPerson==0)
	{
		startTheFirstPerson();
		count_firstPerson = 1;
	}else
	{
		viewer.camera.flyTo({
				 destination : Cesium.Cartesian3.fromRadians(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, 250),
				 orientation: {
									heading: viewer.scene.camera.heading,
									pitch: Cesium.Math.toRadians(-90.0),
									roll: Cesium.Math.toRadians(0.0),
							  }
				 });
		scene.screenSpaceCameraController.enableRotate = true;
		scene.screenSpaceCameraController.enableTranslate = true;
		scene.screenSpaceCameraController.enableZoom = true;
		scene.screenSpaceCameraController.enableTilt = true;
		scene.screenSpaceCameraController.enableLook = true;
		first_handler.destroy();
		viewer.clock.onTick.removeEventListener(firstPersonMove);
		count_firstPerson = 0;
	}
}


function startTheFirstPerson(){
	// document.getElementById("myFirstPerson").classList.toggle("swich-on");
	
	document.getElementById("startTheFirstPerson").classList.toggle("layui-btn-warm");
	var m_position = getCenterPosition();
	person_height = getModelHeight(m_position.lon, m_position.lat);
	viewer.camera.flyTo({
	    destination : Cesium.Cartesian3.fromDegrees(m_position.lon, m_position.lat,person_height),
		 orientation: {
							heading: viewer.scene.camera.heading,
							pitch: Cesium.Math.toRadians(0.0),
							roll: Cesium.Math.toRadians(0.0),
					  },
	});
	var scene = viewer.scene;
	var canvas = viewer.canvas;
	canvas.onclick = function () {
	canvas.focus();
	};
	
	scene.screenSpaceCameraController.enableRotate = false;
	scene.screenSpaceCameraController.enableTranslate = false;
	scene.screenSpaceCameraController.enableZoom = false;
	scene.screenSpaceCameraController.enableTilt = false;
	scene.screenSpaceCameraController.enableLook = false;
	
	var flags = {
		  looking: false,
		  moveForward: false,
		  moveBackward: false,
		  moveUp: false,
		  moveDown: false,
		  moveLeft: false,
		  moveRight: false,
	};
	
	var startMousePosition;
	var mousePosition;
	var first_handler = new Cesium.ScreenSpaceEventHandler(canvas);
	
	first_handler.setInputAction(function (movement) {
	  flags.looking = true;
	  mousePosition = startMousePosition = Cesium.Cartesian3.clone(
	    movement.position
	  );
	}, Cesium.ScreenSpaceEventType.LEFT_DOWN);
	
	first_handler.setInputAction(function (movement) {
	  mousePosition = movement.endPosition;
	}, Cesium.ScreenSpaceEventType.MOUSE_MOVE);
	
	first_handler.setInputAction(function (position) {
	  flags.looking = false;
	}, Cesium.ScreenSpaceEventType.LEFT_UP);
	
	first_handler.setInputAction(function (position) {
		viewer.camera.flyTo({
				 destination : Cesium.Cartesian3.fromRadians(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, 100),
				 orientation: {
									heading: viewer.scene.camera.heading,
									pitch: Cesium.Math.toRadians(-90.0),
									roll: Cesium.Math.toRadians(0.0),
							  }
				 });
		scene.screenSpaceCameraController.enableRotate = true;
		scene.screenSpaceCameraController.enableTranslate = true;
		scene.screenSpaceCameraController.enableZoom = true;
		scene.screenSpaceCameraController.enableTilt = true;
		scene.screenSpaceCameraController.enableLook = true;
		first_handler.destroy();
		viewer.clock.onTick.removeEventListener(firstPersonMove);
		// document.getElementById("myFirstPerson").classList.toggle("swich-on");
		document.getElementById('MenuControl').innerText="false";
		document.getElementById('MenuControl2').innerText="0";
		document.getElementById("startTheFirstPerson").classList.toggle("layui-btn-warm");
	}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
	
	function getFlagForKeyCode(keyCode) {
	  switch (keyCode) {
	    case "W".charCodeAt(0):
	      return "moveForward";
	    case "S".charCodeAt(0):
	      return "moveBackward";
	    case "Q".charCodeAt(0):
	      return "moveUp";
	    case "E".charCodeAt(0):
	      return "moveDown";
	    case "D".charCodeAt(0):
	      return "moveRight";
	    case "A".charCodeAt(0):
	      return "moveLeft";
	    default:
	      return undefined;
	  }
	}
	
	document.addEventListener(
	  "keydown",
	  function (e) {
	    var flagName = getFlagForKeyCode(e.keyCode);
	    if (typeof flagName !== "undefined") {
	      flags[flagName] = true;
	    }
	  },
	  false
	);
	
	document.addEventListener(
	  "keyup",
	  function (e) {
	    var flagName = getFlagForKeyCode(e.keyCode);
	    if (typeof flagName !== "undefined") {
	      flags[flagName] = false;
	    }
	  },
	  false
	);
	var firstPersonMove = function(clock) {
	  var camera = viewer.camera;
	
	  if (flags.looking) {
	    var width = canvas.clientWidth;
	    var height = canvas.clientHeight;
	    var x = (mousePosition.x - startMousePosition.x) / width;
	    var y = -(mousePosition.y - startMousePosition.y) / height;
	    var lookFactor = 0.03;
	    camera.lookRight(x * lookFactor);
	    camera.lookUp(y * lookFactor);
	  }
	
	  var moveRate = 0.1;
	  var rotationRate = viewer.camera.heading;
	  if (flags.moveForward) {
	    camera.moveForward(moveRate);
	  }
	  if (flags.moveBackward) {
	    camera.moveBackward(moveRate);
	  }
	  if (flags.moveUp) {
		   camera.moveUp(moveRate);
	  }
	  if (flags.moveDown) {
	    camera.moveDown(moveRate);
	  }
	  if (flags.moveLeft) {
	    camera.moveLeft(moveRate);
	  }
	  if (flags.moveRight) {
	    camera.moveRight(moveRate);
	  }
	  // if(viewer.camera.positionCartographic.height!=person_height&&(flags.moveForward||flags.moveBackward||flags.moveUp||flags.moveDown||flags.moveLeft||flags.moveRight)||flags.looking)
	  if((flags.moveForward||flags.moveBackward||flags.moveUp||flags.moveDown||flags.moveLeft||flags.moveRight)||flags.looking)
	  {
	  		  viewer.camera.setView({
	  		     // destination: Cesium.Cartesian3.fromRadians(viewer.camera.positionCartographic.longitude, viewer.camera.positionCartographic.latitude, person_height),
	  			  orientation: {
					heading: viewer.camera.heading ,
					pitch: viewer.camera.pitch,
					roll: Cesium.Math.toRadians(0.0)
	  				}
	  			});
	  }
	};
	viewer.clock.onTick.addEventListener(firstPersonMove);
}
/*********************************************第一人称视角操作代码结束******************************************/



/*********************************************设置路径漫游功能代码*********************************************/
function getPointLonLat(m_position)
{
	var cartographic = Cesium.Cartographic.fromCartesian(m_position);
	var m_lon = Cesium.Math.toDegrees(cartographic.longitude);
	var m_lat = Cesium.Math.toDegrees(cartographic.latitude);
	var m_pos = [m_lon,m_lat];
	return m_pos;
}

function roamPath()
{
	document.getElementById("roamPath").classList.toggle("layui-btn-warm");
	var canvas = viewer.canvas;
	var roamHandler = new Cesium.ScreenSpaceEventHandler(canvas);
	var rline = new DrawPolyline({
                viewer: this.viewer
            });
	rline.startCreate();	
	roamHandler.setInputAction(function (position) {
		document.getElementById('MenuControl').innerText="false";
		document.getElementById('MenuControl2').innerText="0";
		document.getElementById("roamPath").classList.toggle("layui-btn-warm");
		var flytime = 2.0;
		var marks = rline.getPositions();
		if(marks.length ==0)
		{
			return ;
		}
		var f_heading = viewer.scene.camera.heading;
		if(marks.length>1)
		{
			 f_heading = bearing(getPointLonLat(marks[0])[0], getPointLonLat(marks[0])[1], getPointLonLat(marks[1])[0], getPointLonLat(marks[1])[1]);
			 f_heading = Cesium.Math.toRadians(f_heading)
		}
		person_height = getModelHeight(getPointLonLat(marks[0])[0],getPointLonLat(marks[0])[1]);
		viewer.scene.camera.flyTo({
			destination: Cesium.Cartesian3.fromDegrees(getPointLonLat(marks[0])[0],getPointLonLat(marks[0])[1], person_height),
			orientation: {
							heading: f_heading,
							pitch: Cesium.Math.toRadians(0.0),
							roll: Cesium.Math.toRadians(0.0),
					},
			duration:3   //定位的时间间隔
		});
		var marksIndex = 1;
		if(marks.length!=1)
		{
			setTimeout(function(){
			 		 flyExtent();
				},3000);
		}
		function flyExtent(){
			setExtentTime(flytime);
			var Exection = function TimeExecution() {
			var preIndex = marksIndex - 1;
				
			if(marksIndex == 0){
				preIndex = marks.length -1;
			}
				
			var heading = bearing(getPointLonLat(marks[preIndex])[0], getPointLonLat(marks[preIndex])[1], getPointLonLat(marks[marksIndex])[0], getPointLonLat(marks[marksIndex])[1]);
			heading = Cesium.Math.toRadians(heading);

			var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
			var originLat = marksIndex == 0 ? getPointLonLat(marks[marks.length - 1])[1] : getPointLonLat(marks[marksIndex-1])[1];
			var originLng = marksIndex == 0 ? getPointLonLat(marks[marks.length - 1])[0] : getPointLonLat(marks[marksIndex-1])[0];
			var endPosition = Cesium.Cartesian3.fromDegrees(
				(originLng+(getPointLonLat(marks[marksIndex])[0]-originLng)/flytime*delTime), 
				(originLat+(getPointLonLat(marks[marksIndex])[1]-originLat)/flytime*delTime), 
				person_height
			);
			viewer.scene.camera.setView({
				destination: endPosition,
				orientation: {
					heading: heading,
					pitch : viewer.scene.camera.pitch,
					roll: viewer.scene.camera.roll,
				}
			});
			if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
				viewer.clock.onTick.removeEventListener(Exection);
				changeCameraHeading();
			}
		};
		viewer.clock.onTick.addEventListener(Exection);
	}

		function  changeCameraHeading(){
			var nextIndex = marksIndex + 1;
			if(marksIndex == marks.length - 1){
				//nextIndex = 0;
				return ;
			}

			var heading = bearing(getPointLonLat(marks[marksIndex])[0], getPointLonLat(marks[marksIndex])[1], getPointLonLat(marks[nextIndex])[0], getPointLonLat(marks[nextIndex])[1]);

			
			var angle = (heading - Cesium.Math.toDegrees(viewer.camera.heading)) / 2;

			setExtentTime(2.0);

			var initialHeading = viewer.camera.heading;
			var Exection = function TimeExecution() {

			var delTime = Cesium.JulianDate.secondsDifference(viewer.clock.currentTime, viewer.clock.startTime);
			
			var heading = Cesium.Math.toRadians(delTime * angle) + initialHeading;
			viewer.scene.camera.setView({
				orientation: {
					heading : heading,
					pitch : viewer.scene.camera.pitch,
					roll: viewer.scene.camera.roll,
				}
			});
			if (Cesium.JulianDate.compare(viewer.clock.currentTime, viewer.clock.stopTime) >= 0) {
				viewer.clock.onTick.removeEventListener(Exection);
				marksIndex = ++marksIndex >= marks.length ? 0 : marksIndex;
				flyExtent();
			}
			};
			viewer.clock.onTick.addEventListener(Exection);
		}		
		rline.destroy();
		roamHandler.destroy();
	}, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
}

function setExtentTime(time){
	var startTime = Cesium.JulianDate.fromDate(new Date());
	var stopTime = Cesium.JulianDate.addSeconds(startTime, time, new Cesium.JulianDate());
	viewer.clock.startTime = startTime.clone();
	viewer.clock.stopTime = stopTime.clone();
	viewer.clock.currentTime = startTime.clone();
	viewer.clock.clockRange = Cesium.ClockRange.CLAMPED;
	viewer.clock.clockStep = Cesium.ClockStep.SYSTEM_CLOCK;
}

function toRadians(degrees) {
	return degrees * Math.PI / 180;
}

function toDegrees(radians) {
	return radians * 180 / Math.PI;
}

function bearing(startLng, startLat, destLng, destLat){
	startLat = this.toRadians(startLat);
	startLng = this.toRadians(startLng);
	destLat = this.toRadians(destLat);
	destLng = this.toRadians(destLng);
					 
	let y = Math.sin(destLng - startLng) * Math.cos(destLat);
	let x = Math.cos(startLat) * Math.sin(destLat) - Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
	let brng = Math.atan2(y, x);
	let brngDgr = this.toDegrees(brng);
	return (brngDgr + 360) % 360;
}

/*********************************************设置路径漫游功能代码结束*********************************************/



/*********************************************俯视、仰视、平视视角设置*********************************************/
function OverLook()
{
	viewer.scene.camera.setView({
		orientation: {
			heading : viewer.scene.camera.heading,
			pitch : Cesium.Math.toRadians(-45.0),
			roll: viewer.scene.camera.roll,
		}
	});
}

function LookUp(){
	viewer.scene.camera.setView({
		orientation: {
			heading : viewer.scene.camera.heading,
			pitch : Cesium.Math.toRadians(45.0),
			roll: viewer.scene.camera.roll,
		}
	});
}

function SmoothInspect()
{
	viewer.scene.camera.setView({
		orientation: {
			heading : viewer.scene.camera.heading,
			pitch : Cesium.Math.toRadians(0.0),
			roll: viewer.scene.camera.roll,
		}
	});
}

/*********************************************俯视、仰视、平视视角设置结束*****************************************/

/*********************************************将相机经纬度存储到剪贴板*********************************/
function getLonLat2Copy()
{
	var m_position = getCenterPosition();
	var test = "lon:"+m_position.lon+" lat:"+m_position.lat;
	copyToClipboard(test);
}

function copyToClipboard(text) {
	 var save = function (e) {
		  e.clipboardData.setData('text/plain', text); // 剪贴板内容设置
		  e.preventDefault();
	 }
	 document.addEventListener('copy', save); // 监听浏览器copy事件
	 document.execCommand('copy'); // 执行copy事件，这时监听函数会执行save函数。
	 document.removeEventListener('copy', save); // 移除copy事件
}					
/*******************************************将相机经纬度存储到剪贴板代码结束*****************************/



         // System.setProperty("hudson.model.DirectoryBrowserSupport.CSP", "sandbox; default-src 'self'; img-src '*'; style-src '*' 'unsafe-inline';")
			// var iframe = document.getElementsByClassName('cesium-infoBox-iframe')[0];
			// iframe.setAttribute('sandbox', 'allow-same-origin allow-scripts allow-popups allow-forms allow-modals');
			// iframe.setAttribute("src", "");
			
    //       var model_entity = addLayerModel('./model/testmodel/model/1.glb',Cesium.Cartesian3.fromDegrees(116.124, 38.49, 0),'all_model','<iframe\
			 // sandbox="allow-same-origin allow-scripts allow-popups allow-forms"\
			 // width = 405 height=240 style = "margin-left:25px;" id = "LiveShow"\
			 // src="./scripts/LiveShow/liveshow1.html"></iframe>\
				// 		<p>\
				// 			这里可以用来展示直播视频信号 \
				// 		</p>\
				// 		<p>\
				// 			数据源: \
				// 		<a style="color: WHITE"\
				// 			target="_blank"\
				// 			href="./scripts/LiveShow/liveshow1.html">直播数据源</a>\
				// 		</p>');
			
			

			
			// var model_entity = addLayerModel('./model/testmodel/model/1.glb',Cesium.Cartesian3.fromDegrees(116.124, 38.49, 0),'all_model','<!DOCTYPE html\
			// ><html lang="en">\
			// <head>\
			//     <meta charset="UTF-8">\
			//     <meta http-equiv="X-UA-Compatible" content="IE=edge">\
			//     <meta name="viewport" content="width=device-width, initial-scale=1">\
			// 	 <script src="../JavaScrip/hls.js"></script>\
			// </head>\
			// <body>\
			// <div>\
			// 		<div id = "LiveURL" hidden>http://cctvalih5ca.v.myalicdn.com/live/cctv1_2/index.m3u8</div>\
			//       <video id="video" controls loop="false" height="100%" width="100%"></video>\
			// </div>\
			// <script>\
			//    var video = document.getElementById('video');\
			//    var url = document.getElementById('LiveURL').innerText;\
			//   if(Hls.isSupported()) {\
			// 	  console.log(url);\
			//     var hls = new Hls();\
			//     hls.loadSource(url);\
			//     hls.attachMedia(video);\
			//     hls.on(Hls.Events.MANIFEST_PARSED,function() {\
			//       video.play();\
			//   });\
			//  } else if (video.canPlayType("application/vnd.apple.mpegurl")) {\
			//     video.src = url;\
			//     video.addEventListener("loadedmetadata",function() {\
			//       video.play();\
			//     });\
			//   }\
			// </script>\
			// </body>\
			// </html>');
			// changeAnegle(model_entity);
			
			

						function changeAnegle(model)
						{
							if(model)
							{
								var origin = model.position._value;
								var h=Cesium.Math.toRadians(90);
								var p=Cesium.Math.toRadians(90);
								var r=Cesium.Math.toRadians(0);
								var hpr = new Cesium.HeadingPitchRoll(h,p,r);
								var orientation = Cesium.Transforms.headingPitchRollQuaternion(origin,hpr);
								model.orientation = orientation;
							}
						}
						

						function removeModel1(model_arr)
						{
							for(var i=0;i<model_arr.length;i++)
							{
								var model = model_arr[i];
								if(model)
								{
									viewer.scene.primitives.remove(model);
									// viewer.entities.remove(model);
								}
							}
						}
						
						function removeModel2(model_arr)
						{
							for(var i=0;i<model_arr.length;i++)
							{
								var model = model_arr[i];
								if(model)
								{
									// viewer.scene.primitives.remove(model);
									viewer.entities.remove(model);
								}
							}
						}
						
						function rotateAllModel(model_arr)
						{
							for(var i=0;i<model_arr.length;i++)
							{
								var model = model_arr[i];
								this.changeAnegle(model);
							}
						}
						
						var LYL_lon = 116.12423;
						var LYL_lat = 38.479131;
						var LYL_height = 11.8;
						
						var LEL_lon = 115.94695;
						var LEL_lat = 38.234119;
						var LEL_height = 25.443;
							
						var HYL_lon = 116.05119;
						var HYL_lat =  38.39963;
						var HYL_height = 12.3278;
						
						var L17_lon = 115.9638;
						var L17_lat =  38.2517;
						var L17_height = 13.0;
						
						var L69_lon = 115.80921;
						var L69_lat = 38.302738;
						var L69_height = 15;
						
						var WDZ_lon =  116.08834;
						var WDZ_lat =   38.49066;
						var WDZ_height = 11.5;
						
						var WSL_lon =  115.7355;
						var WSL_lat =   38.3303;
						var WSL_height = 8135.5;
						
						var WYL_lon =  115.8787;
						var WYL_lat =   38.3469;
						var WYL_height = 30.6;
						
						var model_load = new LoadModel({
								viewer:viewer
		            });
						model_load.addLYLModel(LYL_lon,LYL_lat,LYL_height);
						
						// model_load.add44Model(LEL_lon,LEL_lat,LEL_height);
						// model_load.addHYLModel(HYL_lon,HYL_lat,HYL_height);
						// model_load.addL17Model(L17_lon,L17_lat,L17_height);
						// model_load.add69Model(L69_lon,L69_lat,L69_height);
						// model_load.addWDZModel(WDZ_lon,WDZ_lat,WDZ_height);
						// model_load.addWSLModel(WSL_lon,WSL_lat,WSL_height);
						// model_load.addWYLModel(WYL_lon,WYL_lat,WYL_height);
/**********************************************************外部模型显示、隐藏相关代码*********************************************/
function controlBuildingShow(type)
{
	switch(type)
	{
		case (0):
		 setBuildingShow(model_load.LYL_OUT_Arr,"Building1");
		 break;
		case (1):
		 setBuildingShow(model_load.LEL_OUT_Arr,"Building2");
		 break;
		case (2):
		 setBuildingShow(model_load.HYL_OUT_Arr,"Building3");
		 break;
		case (3):
		 setBuildingShow(model_load.L17_OUT_Arr,"Building4");
		 break;
		case (4):
		 setBuildingShow(model_load.L69_OUT_Arr,"Building5");
		 break;
		case (5):
		 setBuildingShow(model_load.WDZ_OUT_Arr,"Building6");
		 break;
		case (6):
		 setBuildingShow(model_load.WSL_OUT_Arr,"Building7");
		 break;
		case (7):
		 setBuildingShow(model_load.WYL_OUT_Arr,"Building8");
		 break;
	}
}

var load_model_flag = 0;
function removeAreaModel(type)
{
	switch(type)
	{
		case(0):
			setTimeout(function(){
			removeModel1(model_load.LYL_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.LYL_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.LYL_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.LYL_entity);
			},1000);
			break;
		case(1):
			setTimeout(function(){
			removeModel1(model_load.LEL_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.LEL_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.LEL_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.LEL_entity);
			},1000);
			break;
		case(2):
			setTimeout(function(){
			removeModel1(model_load.HYL_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.HYL_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.HYL_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.HYL_entity);
			},1000);
			break;
		case(3):
			setTimeout(function(){
			removeModel1(model_load.L17_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.L17_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.L17_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.L17_entity);
			},1000);
			break;
		case(4):
			setTimeout(function(){
			removeModel1(model_load.L69_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.L69_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.L69_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.L69_entity);
			},1000);
			break;
		case(5):
			setTimeout(function(){
			removeModel1(model_load.WDZ_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WDZ_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WDZ_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WDZ_entity);
			},1000);
			break;
		case(6):
			setTimeout(function(){
			removeModel1(model_load.WSL_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WSL_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WSL_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WSL_entity);
			},1000);
			break;
		case(7):
			setTimeout(function(){
			removeModel1(model_load.WYL_modelArr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WYL_OUT_Arr);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WYL_pipeline);
			},1000);
			setTimeout(function(){
			removeModel2(model_load.WYL_entity);
			},1000);
			break;
	}
}

function fly2Building(type)
{
	switch(type)
	{
		case (0):
		if(load_model_flag!=0)
		{
			removeAreaModel(load_model_flag);
			model_load.addLYLModel(LYL_lon,LYL_lat,LYL_height);
		}
		load_model_flag = 0;
		 viewer.camera.flyTo({
		 		 destination :Cesium.Cartesian3.fromDegrees(LYL_lon, LYL_lat, LYL_height + 80),
		 		 });
		 break;
		case (1):
		if(load_model_flag!=1)
		{
			removeAreaModel(load_model_flag);
			model_load.add44Model(LEL_lon,LEL_lat,LEL_height);
		}
		load_model_flag = 1;
		viewer.camera.flyTo({
				 destination :Cesium.Cartesian3.fromDegrees(LEL_lon, LEL_lat, LEL_height + 80),
				 });
		 break;
		 case (2):
		 if(load_model_flag!=2)
		 {
			removeAreaModel(load_model_flag)
		 	model_load.addHYLModel(HYL_lon,HYL_lat,HYL_height);
		 }
		 load_model_flag = 2;
		 viewer.camera.flyTo({
		 		 destination :Cesium.Cartesian3.fromDegrees(HYL_lon, HYL_lat, HYL_height + 80),
		 		 });
		  break;
		case (3):
		if(load_model_flag!=3)
		{
			removeAreaModel(load_model_flag)
			model_load.addL17Model(L17_lon,L17_lat,L17_height);
		}
		load_model_flag = 3;
		viewer.camera.flyTo({
		 		 destination :Cesium.Cartesian3.fromDegrees(L17_lon, L17_lat, L17_height + 80),
		 		 });
		  break;
	   case (4):
	   if(load_model_flag!=4)
	   {
	 	 removeAreaModel(load_model_flag)
		 model_load.add69Model(L69_lon,L69_lat,L69_height);;
	   }
	   load_model_flag = 4;
	   viewer.camera.flyTo({
				  destination :Cesium.Cartesian3.fromDegrees(L69_lon, L69_lat, L69_height + 80),
				 });
		 break;
		case (5):
		if(load_model_flag!=5)
		{
		 removeAreaModel(load_model_flag)
		 model_load.addWDZModel(WDZ_lon,WDZ_lat,WDZ_height);
		}
		load_model_flag = 5;
		viewer.camera.flyTo({
				  destination :Cesium.Cartesian3.fromDegrees(WDZ_lon, WDZ_lat, WDZ_height + 80),
				 });
		 break; 
		 case (6):
		 if(load_model_flag!=6)
		 {
		  removeAreaModel(load_model_flag)
		  model_load.addWSLModel(WSL_lon,WSL_lat,WSL_height);;
		 }
		 load_model_flag = 6;
		 viewer.camera.flyTo({
		 		  destination :Cesium.Cartesian3.fromDegrees(115.8599, 38.3398, 100),
		 		 });
		  break;
		  case (7):
		  if(load_model_flag!=7)
		  {
		   removeAreaModel(load_model_flag)
		   model_load.addWYLModel(WYL_lon,WYL_lat,WYL_height);;
		  }
		  load_model_flag = 7;
		  viewer.camera.flyTo({
		  		  destination :Cesium.Cartesian3.fromDegrees(WYL_lon, WYL_lat, WYL_height + 80),
		  		 });
		   break; 
	}
}

function setBuildingShow(arr,building_ID)
{
	var flag = document.getElementById(building_ID);
	if(flag.checked)
	{
		for(var i=0;i<arr.length;i++)
		{
			var m_model = arr[i];
			m_model.model.show=true;
		}
		
	}else
	{
		for(var i=0;i<arr.length;i++)
		{
			var m_model = arr[i];
			m_model.model.show=false;
		}
	}
	
}

/**********************************************************外部模型显示、隐藏相关代码结束****************************************/

/**********************************************************流向展示相关代码****************************************************/						

					  var isAdd = false;
					  function setFlow(){
						  document.getElementById("setFlow").classList.toggle("layui-btn-warm");
						  if(!isAdd)
						  {
							  setvisible('add');
							  document.getElementById('MenuControl').innerText="true";
						  }else
						  {
							  setvisible('del');
							  document.getElementById('MenuControl').innerText="false";
						  }
					  }
					  /*
					    流动纹理线
					     color 颜色
					     duration 持续时间 毫秒
					  */
						function PolylineTrailLinkMaterialProperty(color, duration) {
						    this._definitionChanged = new Cesium.Event();
						    this._color = undefined;
						    this._colorSubscription = undefined;
						    this.color = color;
						    this.duration = duration;
						    this._time = (new Date()).getTime();
						}
						Object.defineProperties(PolylineTrailLinkMaterialProperty.prototype, {
						    isConstant: {
						        get: function () {
						            return false;
						        }
						    },
						    definitionChanged: {
						        get: function () {
						            return this._definitionChanged;
						        }
						    },
						    color: Cesium.createPropertyDescriptor('color')
						});
						
						PolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
						    return 'PolylineTrailLink';
						}
						
						PolylineTrailLinkMaterialProperty.prototype.getValue = function (time, result) {
						    if (!Cesium.defined(result)) {
						        result = {};
						    }
						    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color);
						    result.image = Cesium.Material.PolylineTrailLinkImage;
						    result.time = (((new Date()).getTime() - this._time) % this.duration) / this.duration;
						    return result;
						}
						
						PolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
						    return this === other ||
						        (other instanceof PolylineTrailLinkMaterialProperty &&
						          Property.equals(this._color, other._color))
						}
						
						Cesium.PolylineTrailLinkMaterialProperty = PolylineTrailLinkMaterialProperty;
						Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink';
						Cesium.Material.PolylineTrailLinkImage = "./layui/images/colors.png";//colors  
						Cesium.Material.PolylineTrailLinkSource = "czm_material czm_getMaterial(czm_materialInput materialInput)\n\
						                                              {\n\
						                                                   czm_material material = czm_getDefaultMaterial(materialInput);\n\
						                                                   vec2 st = materialInput.st;\n\
						                                                   vec4 colorImage = texture2D(image, vec2(fract(st.s - time), st.t));\n\
						                                                   material.alpha = colorImage.a * color.a;\n\
						                                                   material.diffuse = (colorImage.rgb+color.rgb)/2.0;\n\
						                                                   return material;\n\
						                                               }";
																					  
						Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailLinkType, {
						    fabric: {
						        type: Cesium.Material.PolylineTrailLinkType,
						        uniforms: {
						            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
						            image: Cesium.Material.PolylineTrailLinkImage,
						            time: 0
						        },
						        source: Cesium.Material.PolylineTrailLinkSource
						    },
						    translucent: function (material) {
						        return true;
						    }
						});
						
						var test_lon = LEL_lon - 0.0004046;
						var test_lat = LEL_lat + 0.00015;
						var test_height = 16.3;
						var flowArr = [];
						var flow_position=[115.94654674775558, 38.23426925892857, 16.3504,
						                   115.94655028286236, 38.23406296339286, 16.2956,
												 115.94655028286236, 38.23406296339286, 20.3205,
												 115.94655586401164, 38.233902625, 20.3205,
												 115.94655586401164, 38.233902625, 16.3782,
												 115.94655656875962, 38.233832705357145, 16.3171];
						function setvisible(value) {
						    switch (value) {
						        case 'add':
								  piplelineAlphaChangeMenu(load_model_flag,true);
						            if (!isAdd) {
											FlowModelAdd(flow_position);
						                isAdd = true;
						            }
						            break;
							  case 'del':
								piplelineAlphaChangeMenu(load_model_flag,false);
									if (isAdd) {
										for(var i= 0;i < flowArr.length; i++)
										{
											viewer.entities.remove(flowArr[i]);
										}
										 flowArr = [];
										 isAdd = false;
									}
									break;
						    }
						}
						
						var flow_material = new Cesium.PolylineTrailLinkMaterialProperty(Cesium.Color.RED, 3000);
						function FlowModelAdd(position){
							var entity = viewer.entities.add({
								  name: '管道流向',
								  polyline: {
										positions: Cesium.Cartesian3.fromDegreesArrayHeights(position),
										width: 5,
										material:  flow_material,
								  }
						    });
							 flowArr.push(entity);
						}
						
						function changePiplelineAlpha(model_arr,value)
						{
							for(var i=0;i<model_arr.length;i++)
							{
								var model = model_arr[i];
								model.model.color = Cesium.Color.WHITE.withAlpha(value);
							}
						}
						
						function piplelineAlphaChangeMenu(type,flag)
						{
							var value = 1.0;
							if(flag)
							{
								value = 0.5;
							}
							switch(type)
							{
								case 0:
									changePiplelineAlpha(model_load.LYL_pipeline,value);
									break;
								case 1:
									changePiplelineAlpha(model_load.LEL_pipeline,value);
									break;
								case 2:
									changePiplelineAlpha(model_load.HYL_pipeline,value);
									break;
								case 3:
									changePiplelineAlpha(model_load.L17_pipeline,value);
									break;
								case 4:
									changePiplelineAlpha(model_load.L69_pipeline,value);
									break;
								case 5:
									changePiplelineAlpha(model_load.WDZ_pipeline,value);
									break;
								case 6:
									changePiplelineAlpha(model_load.WSL_pipeline,value);
									break;
								case 7:
									changePiplelineAlpha(model_load.WYL_pipeline,value);
									break;
							}
						}
						
/**********************************************************流向展示相关代码结束****************************************************/
// function test(){
// 	console.log(getCenterPosition());
// }
// setInterval(test,100);
/***********************************************************动态标绘添加、删除相关代码*******************************************/
var addDynamicMarkedArr = [];
var dynamicMarkedCount = 1;
function addDynamicMarked(m_dynamic_marked_id,m_dynamic_marked_count)
{
	if(m_dynamic_marked_count=="")
	{
		m_dynamic_marked_count = "动态标绘"+ dynamicMarkedCount;
		dynamicMarkedCount = dynamicMarkedCount + 1;
	}
	var add_html = "<a class = 'DynamicMarkedStyle' style='margin-left: 8px;'>"+m_dynamic_marked_count + "</a>";
	add_html = $(add_html).attr("id",m_dynamic_marked_id);
	add_html = $(add_html).attr("markedname",m_dynamic_marked_count);
	add_html = $(add_html).on("click",function(){draw.fly2DynamicMarked(m_dynamic_marked_id)});
	addDynamicMarkedArr.push(add_html);
	$("#DynamicMarkedName").append(add_html);
}

function deleteDynamicMarked(id)
{
	var delid="#" + id;
	var elements=$("#DynamicMarkedName");
	var test_ele=$(delid);
	$(delid).remove();
	for(var i=0;i<addDynamicMarkedArr.length;i++)
	{
		var tem_html = addDynamicMarkedArr[i];
		var tem_id = tem_html.attr('id');
		if(id==tem_id)
		{
			tem_html.remove();
		}
	}
}

function getDynamicMarkedName(m_dynamic_marked_count)
{
	if(m_dynamic_marked_count=="")
	{
		m_dynamic_marked_count = "动态标绘"+ dynamicMarkedCount;
		//dynamicMarkedCount = dynamicMarkedCount + 1;
	}
	return m_dynamic_marked_count;
}
/***************************************************动态标绘添加、删除相关代码结束**************************************/

/***************************************************图层查找相关代码**************************************************/
function searchLayer()
{
	var l_name = document.getElementById("LayerSearchID").value;
	var l_name_id = null;
	var layer_name_id = [];
	var flag =false;
	for(var i=0;i<draw._pointArr.length;i++)
	{
		if(l_name==draw._pointArr[i].objname)
		{
			draw.fly2DynamicMarked(draw._pointArr[i].objId);
			flag=true;
		}
	}
	
	if(!flag)
	{
		for(var i=0;i<draw._lineArr.length;i++)
		{
			if(l_name==draw._lineArr[i].objname)
			{
				draw.fly2DynamicMarked(draw._lineArr[i].objId);
				flag=true;
			}
		}
	}
	
	if(!flag)
	{
		for(var i=0;i<draw._gonArr.length;i++)
		{
			if(l_name==draw._gonArr[i].objname)
			{
				draw.fly2DynamicMarked(draw._gonArr[i].objId);
				flag=true;
			}
		}
	}
	
	if(!flag)
	{
		alert("无匹配项");
	}
	$('#LayerSearchID').val("");
	searchDynamicMarked();
}

function searchDynamicMarked(){
	var dynamicMarkedName=$("#LayerSearchID").val();
	console.log(dynamicMarkedName);
	if(dynamicMarkedName==""){
		$("#DynamicMarkedName").children("a").show();
	}else
	{
		$("#DynamicMarkedName").children("a").each(function(){
			var MarkedName=$(this).attr("markedname");
			if(MarkedName.indexOf(dynamicMarkedName)!=-1)
			{
				$(this).show();
			}else
			{
				$(this).hide();
			}
		})
	}
}
$('#LayerSearchID').bind('input propertychange',function(){
	searchDynamicMarked();
});
/***************************************************图层查找相关代码结束***********************************************/