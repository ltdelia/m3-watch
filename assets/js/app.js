$('#search').on('click', function(){
	$('.body_content').hide();
	$('.navbar-fixed').html("<nav>"+
							"<div class='nav-wrapper teal lighten-2'>"+
							"<form>"+
							"<div class='row'>"+
							"<div class='input-field col s7 offset-s1'>"+
							"<i class='material-icons prefix'>search</i>"+
							"<input id='icon_prefix' type='text' class='validate'>"+
							"</div>"+
							"<div class='col s2 offset-s2'>"+
							"<a class='waves-effect waves-light btn'>find</a>"+
							"</div>"+
							"</div>"+
							"</form>"+
							"</div>"+
							"</nav>");
});