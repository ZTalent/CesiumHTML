define(["./when-54c2dc71","./PrimitivePipeline-0dac3d46","./createTaskProcessorWorker","./Transforms-e9dbfb40","./Cartesian2-49b1de22","./Check-6c0211bc","./Math-44e92d6b","./RuntimeError-2109023a","./ComponentDatatype-6d99a1ee","./WebGLConstants-76bb35d1","./GeometryAttribute-669569db","./GeometryAttributes-4fcfcf40","./GeometryPipeline-39e647e8","./AttributeCompression-8ecc041c","./EncodedCartesian3-7ff81df8","./IndexDatatype-46306178","./IntersectionTests-6ead8677","./Plane-8f7e53d1","./WebMercatorProjection-8d5f5f84"],function(f,d,e,r,t,n,o,i,a,s,c,u,b,m,p,l,y,P,k){"use strict";var C={};return e(function(e,r){for(var t=e.subTasks,n=t.length,o=new Array(n),i=0;i<n;i++){var a=t[i],s=a.geometry,c=a.moduleName;f.defined(c)?(c=function(e){var r=C[e];return f.defined(r)||("object"==typeof exports?C[r]=r=require("Workers/"+e):require(["Workers/"+e],function(e){C[r=e]=e})),r}(c),o[i]=c(s,a.offset)):o[i]=s}return f.when.all(o,function(e){return d.PrimitivePipeline.packCreateGeometryResults(e,r)})})});