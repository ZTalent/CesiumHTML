class LoadModel {
	constructor(arg) {
		this.viewer = arg.viewer;
		
		this.all_pipelineArr = [];
		
		this.LYL_modelArr = [];
		this.LYL_OUT_Arr = [];
		this.LYL_pipeline = [];
		this.LYL_entity = [];
		
		this.LEL_modelArr = [];
		this.LEL_pipeline = [];
		this.LEL_OUT_Arr = [];
		this.LEL_entity = [];
		
		this.HYL_modelArr = [];
		this.HYL_pipeline = [];
		this.HYL_OUT_Arr = [];
		this.HYL_entity = [];
		
		this.L17_modelArr = [];
		this.L17_pipeline = [];
		this.L17_OUT_Arr = [];
		this.L17_entity = [];
		
		this.L69_modelArr = [];
		this.L69_pipeline = [];
		this.L69_OUT_Arr = [];
		this.L69_entity = [];
		
		this.WDZ_modelArr = [];
		this.WDZ_pipeline = [];
		this.WDZ_OUT_Arr = [];
		this.WDZ_entity = [];
		
		this.WSL_modelArr = [];
		this.WSL_pipeline = [];
		this.WSL_OUT_Arr = [];
		this.WSL_entity = [];
		
		this.WYL_modelArr = [];
		this.WYL_pipeline = [];
		this.WYL_OUT_Arr = [];
		this.WYL_entity = [];
	}

	changeAnegle(model,heading,pitch,roll)
	{
		if(model)
		{
			var origin = model.position._value;
			var h=Cesium.Math.toRadians(heading);
			var p=Cesium.Math.toRadians(pitch);
			var r=Cesium.Math.toRadians(roll);
			var hpr = new Cesium.HeadingPitchRoll(h,p,r);
			var orientation = Cesium.Transforms.headingPitchRollQuaternion(origin,hpr);
			model.orientation = orientation;
		}
	}
	
	rotateAllModel(model_arr,heading,pitch,roll)
	{
		for(var i=0;i<model_arr.length;i++)
		{
			var model = model_arr[i];
			this.changeAnegle(model,heading,pitch,roll);
		}
	}
	
	addwithouttexModel(model_url, model_position, model_name, model_description){
		var entity=viewer.entities.add({
				name:model_name,
				position:model_position,
				model: {
					// 引入模型
					uri: model_url,
					// 模型的近似最小像素大小，而不考虑缩放。这可以用来确保即使观看者缩小也可以看到模型。如果为0.0，则不强制使用最小大小
					minimumPixelSize: 0,
					// 模型的颜色（与模型的渲染颜色混合的属性）
					color: Cesium.Color.WHITE.withAlpha(0.01),
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
				},
		});
		entity.description = model_description;
		return entity;
	}
	
	addModelDescription(callback,description_url,model_url,model_position,model_name,heading,pitch,roll,model_arr)
	{
		var m_description=[];
		var $this = this;
		
		$(function(){
			$.ajax({
				url:description_url,
				method:'GET',
				dataType: 'json',
				success: function(result){
					m_description.push(result.id);
					m_description.push(result.name);
					m_description.push(result.zkmc);
					m_description.push(result.gn);
					m_description.push(result.ggxh);
					m_description.push(result.dw);
					m_description.push(result.sl);
					m_description.push(result.sjcs);
					m_description.push(result.yxcs);
					m_description.push(result.cz);
					m_description.push(result.sccj);
					m_description.push(result.syqk);
					m_description.push(result.whjxqk);
					m_description.push(result.pydjxh);
					m_description.push(result.zzcj);
					m_description.push(result.djgl);
					m_description.push(result.ccrq);
					m_description.push(result.tcrq);
					m_description.push(result.bpazsj);
					m_description.push(result.yxpl);
					m_description.push(result.czwt);
					var entity=callback(model_url,model_name,model_position,m_description,description_url);
					$this.changeAnegle(entity,heading,pitch,roll);
					model_arr.push(entity);
				}
			})
		})
	}
	
	addModelAndDescription(model_url,model_name,model_position,model_description,description_url)
	{
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
			},
		});
		
		var e_description='<table border="1" style = "width:450px"><tr><th>属性名</th><th>属性值</th>\
		</tr><tr><td>设备ID</td><td>'
		+model_description[0]+
		'</tr><tr><td>设备名称</td><td>'
		+model_description[1]+
		'</td></tr><tr><td>站库名称</td><td>'
		+model_description[2]+
		'</td></tr><tr><td>设备功能</td><td>'
		+model_description[3]+
		'</td></tr><tr><td>设备规格型号</td><td>'
		+model_description[4]+
		'</td></tr><tr><td>单位</td><td>'
		+model_description[5]+
		'</td></tr><tr><td>数量</td><td>'
		+model_description[6]+
		'</td></tr><tr><td>设备设计参数</td><td>'
		+model_description[7]+
		'</td></tr><tr><td>设备运行参数</td><td>'
		+model_description[8]+
		'</td></tr><tr><td>材质</td><td>'
		+model_description[9]+
		'</td></tr><tr><td>设备生产厂家</td><td>'
		+model_description[10]+
		'</td></tr><tr><td>设备使用情况</td><td>'
		+model_description[11]+
		'</td></tr><tr><td>设备维护检修情况</td><td>'
		+model_description[12]+
		'</td></tr><tr><td>设备配用电机型号</td><td>'
		+model_description[13]+
		'</td></tr><tr><td>设备制造厂家</td><td>'
		+model_description[14]+
		'</td></tr><tr><td>设备电机功率(Kw)</td><td>'
		+model_description[15]+
		'</td></tr><tr><td>设备出厂日期</td><td>'
		+model_description[16]+
		'</td></tr><tr><td>设备投产日期</td><td>'
		+model_description[17]+
		'</td></tr><tr><td>设备变频器安装时间</td><td>'
		+model_description[18]+
		'</td></tr><tr><td>设备运行频率</td><td>'
		+model_description[19]+
		'</td></tr><tr><td>设备存在问题</td><td>'
		+model_description[20]+
		'</td></tr><tr></table>\
		<p>\
		  数据来源: \
		  <a style="color: WHITE"\
		    target="_blank"\
		    href="'+
			 description_url+
			 '">'+
			 description_url+
			 '</a>\
		</p>';
		console.log(e_description);
		entity.description = e_description;
		return entity;
	}
	
	 addGasStationModel(model_url, model_position, model_name, model_description){
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
				},
		});
		entity.description = model_description;
		return entity;
	}
	
	addStatic_Model(model_url, model_position){
		var entity=viewer.entities.add({
				name:"",
				position:model_position,
				model: {
					// 引入模型
					uri: model_url,
					// 模型的近似最小像素大小，而不考虑缩放。这可以用来确保即使观看者缩小也可以看到模型。如果为0.0，则不强制使用最小大小
					minimumPixelSize: 0,
					// 模型的颜色（与模型的渲染颜色混合的属性）
					color: Cesium.Color.WHITE.withAlpha(1.0),
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
				},
		});
		return entity;
	}
	
	addStaticModel(model_url, lon, lat, height,heading,pitch,roll){
		var height = Cesium.defaultValue(height, 0.0);
		var h=Cesium.Math.toRadians(heading);
		var p=Cesium.Math.toRadians(pitch);
		var r=Cesium.Math.toRadians(roll);
		var hpr = new Cesium.HeadingPitchRoll(h,p,r);
							
		var origin = Cesium.Cartesian3.fromDegrees(lon, lat, height);
		var modelMatrix = Cesium.Transforms.headingPitchRollToFixedFrame(origin, hpr);
							
							  
		var model = viewer.scene.primitives.add(Cesium.Model.fromGltf({
		    url :model_url,
		    modelMatrix : modelMatrix,
		    minimumPixelSize : 1,
		}));
		return model;
	}
	//里一联油站模型添加
	addLYLModel(lon,lat,height)
	{
		var LYL_lon = lon;
		var LYL_lat = lat;
		var LYL_height = height;
		var $this = this;
		
		var LYL_heading = 90.0;
		var LYL_pitch = 90.0;
		var LYL_roll = 0.0;
		
		for(var i=0;i<LYLModelPath.length;i++)
		{
			var path = LYLModelPath[i].path;
			var flag = LYLModelPath[i].pipeline;
			
			
			/*与数据库连接时候使用
			if(flag)
			{
				$this.addModelDescription($this.addModelAndDescription,'http://127.0.0.1:8000/testyouku/',path,Cesium.Cartesian3.fromDegrees(LYL_lon, LYL_lat, LYL_height),"里一联",LYL_heading,LYL_pitch,LYL_roll,$this.LYL_pipeline);
			}else
			{
				$this.addModelDescription($this.addModelAndDescription,'http://127.0.0.1:8000/testyouku/',path,Cesium.Cartesian3.fromDegrees(LYL_lon, LYL_lat, LYL_height),"里一联",LYL_heading,LYL_pitch,LYL_roll,$this.LYL_entity);
			}
			*/
		  
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(LYL_lon, LYL_lat, LYL_height),"里一联油库","aaaaaaaaaaaaaa");
			$this.changeAnegle(entity,LYL_heading,LYL_pitch,LYL_roll);
			if(flag)
			{
				$this.LYL_pipeline.push(entity);
			}else
			{
				$this.LYL_entity.push(entity);
			}
			
		}
		var entity_ding = addLayerModel('./model/LYLModel/ding.gltf',Cesium.Cartesian3.fromDegrees(LYL_lon, LYL_lat, LYL_height),'','');
		$this.LYL_entity.push(entity_ding);
		$this.LYL_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,LYL_heading,LYL_pitch,LYL_roll);
		var entity_di = $this.addStaticModel('./model/LYLModel/di.gltf',LYL_lon,LYL_lat,LYL_height,LYL_heading,LYL_pitch,LYL_roll);
		$this.LYL_modelArr.push(entity_di);
	}
	//44油站加载模型添加
	add44Model(lon,lat,height)
	{
		var LEL_lon = lon;
		var LEL_lat = lat;
		var LEL_height = height;
		var $this = this;
		
		var LEL_heading = 90.0;
		var LEL_pitch = 90.0;
		var LEL_roll = 0.0;
		
		for(var i=0;i<LELModelPath.length;i++)
		{
			var path = LELModelPath[i].path;
			var flag = LELModelPath[i].pipeline;
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(LEL_lon, LEL_lat, LEL_height),"四十四号油站","bbbbbbbb");
			$this.changeAnegle(entity,LEL_heading,LEL_pitch,LEL_roll);
			if(flag)
			{
				$this.LEL_pipeline.push(entity);
			}else
			{
				$this.LEL_entity.push(entity);
			}
		}
		var entity_ding=$this.addStatic_Model('./model/44Model/ding.gltf',Cesium.Cartesian3.fromDegrees(LEL_lon, LEL_lat, LEL_height));
		$this.LEL_entity.push(entity_ding);
		$this.LEL_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,LEL_heading,LEL_pitch,LEL_roll);
		var entity_di = $this.addStaticModel('./model/44Model/wai.gltf',LEL_lon,LEL_lat,LEL_height+0.15,LEL_heading,LEL_pitch,LEL_roll);
		$this.LEL_modelArr.push(entity_di);
	}
	
	addHYLModel(lon,lat,height)
	{
		var HYL_lon = lon;
		var HYL_lat = lat;
		var HYL_height = height;
		var $this = this;
		
		var HYL_heading =85.0;
		var HYL_pitch = 90.0;
		var HYL_roll = 0.0;
		
		for(var i=0;i<HYLModelPath.length;i++)
		{
			var path = HYLModelPath[i].path;
			var flag = HYLModelPath[i].pipeline;
			
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(HYL_lon, HYL_lat, HYL_height),"河一联","cccccccc");
			$this.changeAnegle(entity,HYL_heading,HYL_pitch,HYL_roll);
			if(flag)
			{
				$this.HYL_pipeline.push(entity);
			}else
			{
				$this.HYL_entity.push(entity);
			}
		}
		var entity_ding = $this.addStatic_Model('./model/HYLModel/ding.gltf',Cesium.Cartesian3.fromDegrees(HYL_lon, HYL_lat, HYL_height),'model36','\
		<p>\ 添加测试模型36</p>');
		$this.HYL_entity.push(entity_ding);
		$this.HYL_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,HYL_heading,HYL_pitch,HYL_roll);
		
		var entity_di = $this.addStaticModel('./model/HYLModel/shiwai-di.gltf',HYL_lon, HYL_lat, HYL_height,HYL_heading,HYL_pitch,HYL_roll);
		$this.HYL_modelArr.push(entity_di);
	}
	
	addL17Model(lon,lat,height)
	{
		var L17_lon = lon;
		var L17_lat = lat;
		var L17_height = height;
		var $this = this;
		
		var L17_heading = 88.3;
		var L17_pitch = 90.0;
		var L17_roll = 0.0;
		
		for(var i=0;i<L17ModelPath.length;i++)
		{
			var path = L17ModelPath[i].path;
			var flag = L17ModelPath[i].pipeline;
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(L17_lon, L17_lat, L17_height),"留十七油站","ddddddd");
			$this.changeAnegle(entity,L17_heading,L17_pitch,L17_roll);
			if(flag)
			{
				$this.L17_pipeline.push(entity);
			}else
			{
				$this.L17_entity.push(entity);
			}
		}
		var entity_ding = addLayerModel('./model/17Model/ding.gltf',Cesium.Cartesian3.fromDegrees(L17_lon, L17_lat, L17_height),'ding','\
		<p>\ 添加测试模型</p>');
		$this.L17_entity.push(entity_ding);
		$this.L17_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,L17_heading,L17_pitch,L17_roll);
		
		
		var entity_di = $this.addStaticModel('./model/17Model/di.gltf',L17_lon, L17_lat, L17_height,L17_heading,L17_pitch,L17_roll);
		$this.L17_modelArr.push(entity_di);
	}
	
	add69Model(lon,lat,height)
	{
		var L69_lon = lon;
		var L69_lat = lat;
		var L69_height = height;
		var $this = this;
		
		var L69_heading = 87.5;
		var L69_pitch = 90.0;
		var L69_roll = 0.0;
		
		for(var i=0;i<L69ModelPath.length;i++)
		{
			var path = L69ModelPath[i].path;
			var flag = L69ModelPath[i].pipeline;
			
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(L69_lon, L69_lat, L69_height),"六十九号油站","eeeeeeeee");
			$this.changeAnegle(entity,L69_heading,L69_pitch,L69_roll);
			if(flag)
			{
				$this.L69_pipeline.push(entity);
			}else
			{
				$this.L69_entity.push(entity);
			}
		}
		var entity_ding = addLayerModel('./model/69Model/fd.gltf',Cesium.Cartesian3.fromDegrees(L69_lon, L69_lat, L69_height),'屋顶','\
		<p>\ 添加测试模型</p>');
		$this.L69_modelArr.push(entity_ding);
		$this.L69_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,L69_heading,L69_pitch,L69_roll);
		
		var entity_di = $this.addStaticModel('./model/69Model/di.gltf',L69_lon, L69_lat, L69_height,L69_heading,L69_pitch,L69_roll);
		$this.L69_modelArr.push(entity_di);
	}
	
	addWDZModel(lon,lat,height)
	{
		var WDZ_lon = lon;
		var WDZ_lat = lat;
		var WDZ_height = height;
		var $this = this;
		
		var WDZ_heading = 90.0;
		var WDZ_pitch = 90.0;
		var WDZ_roll = 0.0;
		
		for(var i=0;i<WDZModelPath.length;i++)
		{
			var path = WDZModelPath[i].path;
			var flag = WDZModelPath[i].pipeline;
			
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(WDZ_lon, WDZ_lat, WDZ_height),"稳定站","fffffffff");
			$this.changeAnegle(entity,WDZ_heading,WDZ_pitch,WDZ_roll);
			if(flag)
			{
				$this.WDZ_pipeline.push(entity);
			}else
			{
				$this.WDZ_entity.push(entity);
			}
		}
		var entity_ding = addLayerModel('./model/WDZModel/fd.gltf',Cesium.Cartesian3.fromDegrees(WDZ_lon, WDZ_lat, WDZ_height),'房顶','');
		$this.WDZ_entity.push(entity_ding);
		$this.WDZ_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,WDZ_heading,WDZ_pitch,WDZ_roll);
		
		var entity_di = $this.addStaticModel('./model/WDZModel/di.gltf',WDZ_lon, WDZ_lat, WDZ_height,WDZ_heading,WDZ_pitch,WDZ_roll);
		$this.WDZ_modelArr.push(entity_di);
	}
	
	addWSLModel(lon,lat,height)
	{
		var WSL_lon = lon;
		var WSL_lat = lat;
		var WSL_height = height;
		var $this = this;
		
		var WSL_heading = 90.0;
		var WSL_pitch = 90.0;
		var WSL_roll = 0.0;
		for(var i=0;i<WSLModelPath.length;i++)
		{
			var path = WSLModelPath[i].path;
			var flag = WSLModelPath[i].pipeline;
			
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(WSL_lon, WSL_lat, WSL_height),"王四联","gggggggggggggg");
			$this.changeAnegle(entity,WSL_heading,WSL_pitch,WSL_roll);
			if(flag)
			{
				$this.WSL_pipeline.push(entity);
			}else
			{
				$this.WSL_entity.push(entity);
			}
		}
		var entity_ding = addLayerModel('./model/WSLModel/ding.gltf',Cesium.Cartesian3.fromDegrees(WSL_lon, WSL_lat, WSL_height),'房顶','');
		$this.WSL_entity.push(entity_ding);
		$this.WSL_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,WSL_heading,WSL_pitch,WSL_roll);
		
		var entity_di = $this.addStaticModel('./model/WSLModel/di.gltf',WSL_lon, WSL_lat, WSL_height,WSL_heading,WSL_pitch,WSL_roll);
		$this.WSL_modelArr.push(entity_di);
	}
	
	addWYLModel(lon,lat,height)
	{
		var WYL_lon = lon;
		var WYL_lat = lat;
		var WYL_height = height;
		var $this = this;
		
		var WYL_heading = 90.0;
		var WYL_pitch = 90.0;
		var WYL_roll = 0.0;
		for(var i=0;i<WYLModelPath.length;i++)
		{
			var path = WYLModelPath[i].path;
			var flag = WYLModelPath[i].pipeline;
			
			var entity = $this.addGasStationModel(path,Cesium.Cartesian3.fromDegrees(WYL_lon, WYL_lat, WYL_height+0.01),"王一联","hhhhhhhhhhhh");
			$this.changeAnegle(entity,WYL_heading,WYL_pitch,WYL_roll);
			if(flag)
			{
				$this.WYL_pipeline.push(entity);
			}else
			{
				$this.WYL_entity.push(entity);
			}
		}
		var entity_ding = addLayerModel('./model/WYLModel/ding.gltf',Cesium.Cartesian3.fromDegrees(WYL_lon, WYL_lat, WYL_height+0.01),'房顶','');
		$this.WYL_entity.push(entity_ding);
		$this.WYL_OUT_Arr.push(entity_ding);
		$this.changeAnegle(entity_ding,WYL_heading,WYL_pitch,WYL_roll);
		var entity_di = $this.addStaticModel('./model/WYLModel/di.gltf',WYL_lon, WYL_lat, WYL_height,WYL_heading,WYL_pitch,WYL_roll);
		$this.WYL_modelArr.push(entity_di);
	}
}