SYSLIB.settings.set("release",true);
SYSLIB.settings.set("loglevel",1);
__Sound.add('a',"media/a.ogg");
__Sound.add('b',"media/b.ogg");
__Sound.add('c',"media/c.ogg");
__Sound.add('d',"media/d.ogg");
__Sound.add('e',"media/e.ogg");
__Sound.add('f',"media/f.ogg");
__Sound.add('g',"media/g.ogg");
__Sound.add('h',"media/h.ogg");
__Sound.add('i',"media/i.ogg");
__Sound.add('j',"media/j.ogg");
function reload(){
	setTimeout(function(){
		_f("#main").style.opacity=0;
	},300);
	setTimeout(function(){
		window.parent.doreload();
		setTimeout(function(){
			window.location.reload();
		},300);
	},600);
}
window.onload=function(){
	try{
	_f("#main").addListener('click',function(){
		if(_f("#box_alert").has('on')){
			_f("#box_alert").remove("on");
			reload();
		}
	})
	_f("#box_ver").addListener('click',function(){
		openrepo();
	})
	_f("#main_close").addListener('mouseover',function(){
		this.src="img/exit_off.png";
		__Sound.play('a');
	})
	_f("#main_close").addListener('mouseout',function(){
		this.src="img/exit_on.png";
	})
	_f("#main_close").addListener('click',function(){
		_f("#box_close").style.display="block";
		setTimeout(function(){
			_f("#box_close").add('on');
			__Sound.play('d');
		},100);
	})

	_f("#box_close_yes").addListener('mouseover',function(){
		this.src="img/yes_on.png";
		__Sound.play('a');
	})
	_f("#box_close_yes").addListener('mouseout',function(){
		this.src="img/yes.png";
	})
	_f("#box_close_yes").addListener('click',function(){
		__Sound.play('j');
		setTimeout(function(){
			window.parent.doclose();
		},1500)
	})

	_f("#box_close_no").addListener('mouseover',function(){
		this.src="img/no_on.png";
		__Sound.play('a');
	})
	_f("#box_close_no").addListener('mouseout',function(){
		this.src="img/no.png";
	})
	_f("#box_close_no").addListener('click',function(){
		_f("#box_close").remove('on');
		setTimeout(function(){
			_f("#box_close").style.display="none";
		},300)
	})

	_f("#main_filebox").addListener('click',function(){
		_f("#main_fipt").click();
	})
	_f("#trim_options_btn").addListener('click',function(){
		if(_c(this).has('on')){
			_f("#box_trim_options").add("on");
			__Sound.play('g');
		}
	})

	var fill2=function(percent){
		if(percent>100){
			return;
		}
		_f("#main_bar2fill").style.width=(percent/100)*303+"px";
	}
	kicks=0;
	fill2_kick=function(){
		kicks++;
		fill2(KICK_length*kicks);
	}
	_f("#main_go").addListener('click',function(){
		__Sound.play('i');
		this.style.opacity=0;
		setTimeout(function(){
			_f("#main_go").style.display="none";
			_f("#main_bar2fill").style.display="block";
			_f("#main_bar2").style.display="block";
			setTimeout(function(){
				_f("#main_bar2fill").style.opacity=1;
				_f("#main_bar2").style.opacity=1;
			},100)
		},300)
		setTimeout(function(){
			FULL_kick=10;
			var file2=(loadedfile).split(".");
			var orgext=(file2.pop()).toUpperCase();
			if(orgext!="SVG"){
				FULL_kick=FULL_kick+10;
			}
			if(options.trim){
				FULL_kick=FULL_kick+2;
			}
			if(options.ttf){
				FULL_kick++;
			}
			if(options.eot){
				FULL_kick++;
			}
			if(options.woff){
				FULL_kick++;
			}
			if(options.css){
				FULL_kick++;
			}
			if(options.compress){
				FULL_kick=FULL_kick+5;
			}
			KICK_length=100/FULL_kick;
			start()
		},1000)
	})
	loadedfile=0;
	var loadmap=0;
	var handleFilesuploadSelect = function (evt) {
			var files = evt.target.files;
			var font=files[0];
			console.log(font);
			if(loadmap){
				options_trim=font.path;
			}else{
				if(!loadedfile){
					_f("#main_filebox").src="img/file_loaded.png";
					_f("#main_filebox").style.marginLeft="-125px";
					_f("#noticebox").innerHTML='Choose What You Want';
					_f("#main_filebox_name").style.opacity=1;
					_f("#main_choices").style.opacity=1;
					_f("#main_go").add("on");
				}
				_f("#main_filebox_name").innerHTML=font.name;
				loadedfile=font.path;
			}
			_f("#main_fipt").value="";
	}
	_f("#main_fipt").addListener('change',handleFilesuploadSelect);
	var olist=_f('.main_choices');
	options={};
	var change_options=function(){
		__Sound.play('e');
		if(_c(this).has("choices_on")){
			_c(this).remove("choices_on");
			options[this.id]=0;
			if(this==_f("#trim")){
				_f("#trim_options_btn").remove("on");
			}
		}else{
			_c(this).add("choices_on");
			options[this.id]=1;
			if(this==_f("#trim")){
				_f("#trim_options_btn").add("on");
				_f("#box_trim_options").add("on");
				__Sound.play('g');
			}
		}
	}
	for(var i=0;i<olist.length;i++){
		options[olist[i].id]=1;
		__Dom.nodeparser(olist[i]).addListener("click",change_options);
	}
	options.trim=0;
	options_trim='';
	var change_options_trim=function(){
		__Sound.play('f');
		if(this==_f("#box_trim_options_list_"+0)){
			_f("#main_fipt").click();
		}else{
			options_trim=this.getAttribute("data");
		}
		_f("#box_trim_options").remove("on");
	}
	for(var i=0;i<4;i++){
		_f("#box_trim_options_list_"+i).addListener("click",change_options_trim);
	}
	}catch(e){
		ERROR_REP(e);
	}
}
function min_svg(data1,data2,name){
	try{
		var map={};
		var patt = /unicode=\"([\s\S]*?)\"/g;
		var result=0;
		while ((result = patt.exec(data2)) != null)  {
				var yy=(result[1]!=" ")?result[1]:"FUCK";
				map[yy]=1;
		}
		var flist='';
		
		var finfo=data1.match(/([\s\S]*?)<glyph[\s\S]{0,3}glyph-name=\"([\s\S]*?)\"[\s\S]{0,3}unicode/);
		flist='';	
		var patt = /<([\s\S]*?)unicode=\"([\s\S]*?)\"([\s\S]*?)\/>/g;
		var result=0;
		var i=0;
		var j=0;
		while ((result = patt.exec(data1)) != null)  {
			i++;
			var yy=(result[2]!=" ")?result[2]:"FUCK";
			if(map[yy]||map[String.fromCharCode(yy)]){
				flist=flist+result[0]+"\n";
				j++;
			}
		}
		flist=flist+"</font></defs></svg>";
		if(!flist.match(/xml/)){
			flist=finfo[1]+flist;
		}
		console.log("ORG: "+i);
		console.log("NOW: "+j);
		flist=flist.replace(/font-family=\"([/s/S]*?)\"/,'font-family="'+name+'"');
		Ratio=parseInt((j/i)*100);
		return flist;
	}catch(e){
		ERROR_REP(e);
	}
}
////////////////////////load file////////////////////////////////
var fs = require("fs");

function readfile(filepath){
	try{
		console.log("Loading file ... :"+filepath);
		var data=fs.readFileSync(filepath);
		return data.toString();
	}catch(e){
		ERROR_REP(e);
	}
}
function savefile(filepath,data){
	try{
		console.log("Minifying & Saving ...");
		fs.writeFileSync(filepath,data);
		console.log("Minified.");
		return;
	}catch(e){
		ERROR_REP(e);
	}
}
var spawn = require( 'child_process' ).spawn;
var exec = require( 'child_process' ).exec;
function start(){
	try{
		if(options.trim){
			console.log(options_trim);
			var mdata=readfile(options_trim);
			console.log("loaded ...");
			fill2_kick();
		}

		var name='output';
		var file2=(loadedfile).split(".");
		var orgext=(file2.pop()).toUpperCase();
		var file3=file2.join(".")+".svg";
		var coned=function(){
			fs.stat(file3, function (err, stat) {
				if (err) {
					ERROR_REP("Convert Error ! Please Check Your Font File.");
					return 1;
				}
				var fdata=readfile(file3);
				if(fdata){
					if(options.trim){
						if(!mdata){
							ERROR_REP("Map File Is Empty !")
							return;
						}
						savefile('output/'+name+".svg",min_svg(fdata,mdata,name));
					}else{
						savefile('output/'+name+".svg",fdata);
					}
					fName_to_conv='output/'+name+".svg";
					if(options.ttf){
						fList_to_conv.push("ttf");
					}
					if(options.eot){
						fList_to_conv.push("eot");
					}
					if(options.woff){
						fList_to_conv.push("woff");
					}
					startconv();
				}else{
					ERROR_REP("Font File Is Empty !")
				}
			});
		}
		fName_to_conv=0;
		fList_to_conv=[];
		var cleaning=function(){
			if(options.compress){
					console.log("Cleaning ...");
					if(options.ttf){
						exec("del output/"+name+".ttf");
						exec("rm output/"+name+".ttf");
					}
					if(options.eot){
						exec("del output/"+name+".eot");
						exec("del output/"+name+".afm");
						exec("rm output/"+name+".eot");
						exec("rm output/"+name+".afm");
					}
					if(options.css){
						exec("del output/"+name+".css");
						exec("rm output/"+name+".css");
					}
					if(options.svg){
						exec("del output/"+name+".svg");
						exec("rm output/"+name+".svg");
					}
					if(options.woff){
						exec("del output/"+name+".woff");
						exec("rm output/"+name+".woff");
					}
					console.log("Cleaning done.");
			}else{
				if(!options.svg){
					exec("del output/"+name+".svg");
				}
			}
			kicks=FULL_kick-1;
			fill2_kick();
			console.log("All done.");
			process_done();
			return;
		}
		var packing=function(){
			var tt=[ 'a','output/'+name+'.zip'] ;
			if(options.woff){
				tt.push('output/'+name+'.woff');
			}
			if(options.ttf){
				tt.push('output/'+name+'.ttf');
			}
			if(options.vg){
				tt.push('output/'+name+'.svg');
			}
			if(options.eot){
				tt.push('output/'+name+'.eot');
				tt.push('output/'+name+'.afm');
			}
			if(options.css){
				tt.push('output/'+name+'.css');
			}
			packer = spawn( 'win32/7z', tt);
			packer.stdout.on('data', function (data) { 
				console.log("PACKER: "+data);
			});
			packer.on( 'exit', function () { 
				if(!ERR){
					console.log("Packing done.");
					kicks+=4;
					fill2_kick();
					cleaning();
			 	}else{
			 		ERROR_REP("Packing error");
			 		return;
			 	}
			} );
			var ERR='';
			packer.stderr.on('data', function (data) { 
				ERR=ERR+("PACKER: "+data);
			});
		}
		var startconv=function(list){
			if(!fList_to_conv||!fList_to_conv.length){
				console.log("Conv done.");
				if(options.css){
					console.log("Generate CSS ...");
					var opt="@font-face {\n\tfont-family: '"+name+"';\n\t";
					if(options.eot){
						opt=opt+"src: url('"+name+".eot');\n\t";
					}
					opt=opt+"src: ";
					var tt=[];
					if(options.woff){
						tt.push("url('"+name+".woff') format('woff')");
					}
					if(options.ttf){
						tt.push("url('"+name+".ttf') format('truetype')");
					}
					if(options.svg){
						tt.push("url('"+name+".svg#"+name+"') format('svg')");
					}
					if(options.eot){
						tt.push("url('"+name+".eot?#iefix') format('embedded-opentype')");
					}
					var cssDATA=opt+(tt.join(","))+";\n}";
					savefile("output/"+name+".css",cssDATA);
					fill2_kick();
					console.log("CSS done.");
				}
				if(options.compress){
					console.log("Packing ...");
					packing();
				}else{
					cleaning();
				}
				return;
			}
			fill2_kick();
			var nlist=fList_to_conv.shift();
			console.log("Output As "+nlist.toUpperCase()+" ...");
			var confont = spawn( 'win32/fontforge', [ "-script" ,"res/pe/gen"+nlist+".pe",fName_to_conv] );
			confont.on( 'exit',startconv );
		}
		console.log("File is "+orgext);
		if(orgext=="SVG"){
			coned();
			return;
		}
		console.log("Converting To SVG ...");
		var consvg = spawn( 'win32/fontforge', [ "-script" ,"res/pe/gensvg.pe",loadedfile] );
		var kic=setInterval(function(){
			if(kicks>=10){
				clearInterval(kic);
			}
			fill2_kick();
		},3000)
		consvg.on( 'exit',function(){
			kicks=9;
			fill2_kick();
			coned();
		} );
	}catch(e){
		ERROR_REP(e);
	}

}
function openrepo(){
	exec("start https:\/\/github.com\/Sys-Lab\/cfmin_client");
}
function process_done(){
	exec("start output");
	__Sound.play('h');
	setTimeout(reload,5000);
}
function ERROR_REP(e){
	console.log(e);
	_f("#box_alert_data").innerHTML=e;
	_f("#box_alert").add("on");
	//__Sound.play('c');
	setTimeout(reload,5000);
}


