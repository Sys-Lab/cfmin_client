SYSLIB.settings.set("release",true);
SYSLIB.settings.set("loglevel",1);
__Sound.add('b',"media/b.ogg");
window.onload=function(){
	setTimeout(function(){
		_f("#loading").style.opacity=1;
		_f("#loading_0").style.opacity=1;
		setTimeout(function(){
			_f("#loading_barfill").style.width="181px";
		},1000);
		setTimeout(function(){
			_f("#loading_0").style.opacity=0;
			_f("#loading_bg").style.opacity=0;
		},4000);
		setTimeout(function(){
			_f("#loading_1").style.opacity=1;
		},4500);
		setTimeout(function(){
			_f("#loading_1").style.opacity=0;
		},7500);
		setTimeout(function(){
			_f("#loading_2").style.opacity=1;
		},8000);
		setTimeout(function(){
			_f("#loading_2").style.opacity=0;
			_f("#main").style.display="block";
		},11000);
		setTimeout(function(){
			_f("#main").style.opacity=1;
			__Sound.play('b');
		},11500);
	},1000);
}
function doclose(){
	window.opener=null;
	window.open('','_self');
	window.close();
}
function doreload(){
	_f("#main").style.opacity=0;
	setTimeout(function(){
		_f("#main").style.opacity=1;
	},1000);
}



