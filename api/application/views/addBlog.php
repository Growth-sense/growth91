	<title>Blogs</title>
	<?php $this->load->view('includes/header'); ?>

	<style>
		::-webkit-input-placeholder { /* Chrome/Opera/Safari */
		  color: #748194;
		}
		::-moz-placeholder { /* Firefox 19+ */
		  color: #748194;
		}
		:-ms-input-placeholder { /* IE 10+ */
		  color: #748194;
		}
		:-moz-placeholder { /* Firefox 18- */
		  color: #748194;
		}
		.container{
		   display:none;
		   position:absolute;
			width: auto;
			height:auto;
			top: calc(50% - 240px);
			left: calc(40% - 160px);
		   border-radius:15px 15px 15px 15px;
		}
		.c1{
		   box-shadow:0 0 10px grey;
		   background-color:white;
		   width:300px;
		   height:500px;
		   display:inline-block;
		   border-radius:15px 15px 15px 15px;
		}

		.c11{
		   background-image:url('https://i.pinimg.com/736x/b8/09/22/b80922f6ea2daaf36a6627378662803b--deck-of-cards-phone-wallpapers.jpg');
		   background-size:300px 400px;
		   background-repeat: no-repeat;
		   background-color:white;
		   width:300px;
		   height:400px;
		   display:inline-block;
		   position:absolute;
		   z-index:4;
		   border-radius:15px 15px 200px 200px;
		}
		#left, #right {
		   color:white;
		   display: inline-block;
		   width:146px;
		   height: 500px;
		   background-color:white;
		   cursor:pointer;
		}
		#left{
		   border-radius:15px 0px 0px 15px;
		}
		#right{
		   border-radius:15px 15px 15px 0px;
		}
		.left_hover{
		   color:#EE9BA3;
		   box-shadow: 5px 0 18px -10px #333;
		   z-index:1;
		   position:absolute;
		}
		.right_hover{
		   box-shadow: -5px 0 15px -10px #333;
		   z-index:1;
		   position:absolute;
		}
		.s1class{
		   color:#748194;
		   position:absolute;
		   bottom:0;
		   left:63%;
		   margin-left: -50%;
		}
		.s1class span,  .s2class span{
		   display:block;
		}
		.su{
		   font-size:20px;
		}
		.s2class{
		   color:#748194;
		   position:absolute;
		   bottom:0;
		   right:63%;
		   margin-right: -50%;
		}
		.mainhead{
		   color:white;
		   font-size:24px;
		   text-align:center;
		   margin-top:50px;
		}
		.mainp{
		   color:white;
		   font-size:13px;
		   text-align:center;
		   margin-top:10px;
		}
		.c2{ width:100%; }
		.username,select{
		    /*font-weight: bold;*/
		    width: 100%;
		    margin: 0 0 22px;
		    padding: 18px 15px;
		    border-radius: 5px;
		    outline: none;
		    border: none;
		    background: #F6F7F9;
		    color: #748194;
		    font-size: 14px;
		}
		.btn{
		 	font-weight: bold;
		    width: 100%;
		    margin: 0 0 20px;
		    height: 45px;
		    padding: 6px 15px;
		    border-radius: 5px;
		    outline: none;
		    border: none;
		    background: #0007ee;
		    color: white;
		    font-size: 14px;
		}
		.signup1{
		   color:#748194;
		   font-size:30px;
		}
		#editor {
			border: 1px solid #c0c0c0;
			min-height: 300px;
		}
		label , span{
			font-size: 16px;
			font-weight: 300;
		}
		.show { display: block !important; }
		.hide { display: none !important; }
		#editor-container{
			max-height:400px;
		}
	</style>	

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.css" />

	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/styles/monokai-sublime.min.css" />

	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/quill.snow.css" />
	
	<!-- Main section -->
	<div class="right_container">
		<div class="row">
			<div class="col-lg-7">
				<div class="c2">
			      	<form class="signup" id="blog-form" method="POST" action="<?php echo base_url('Blogs/insert_post'); ?>"
			      		enctype="multipart/form-data">
			      		<br><br><br><br>
			         	<h2 class="signup1">ADD POST</h2>
			         	<br>
			         	<label for="">Title <span class="text-danger" style="font-size:16px">*</span></label>
								<input name="title" type="text" placeholder="Title*" class="username" required/>

								<div class="">
									<label for="" class="w-100">Short Description <span class="text-danger">*</span></label>
									<textarea name="short_description" required class="username"  cols="30" rows="10"></textarea>
								</div>

								<div class="">
									<label for="" class="w-100">Youtube Link <span class="text-danger">*</span></label>
									<input type="text" name="youtube_link" class="username">
								</div>

								<label for="">Featured Image <span class="text-danger">* </span>
									<span style="font-size:14px">(Image Resolution 680 * 385)</span>
								</label>
								<input name="featured_img" type="file" class="username" required/>
								
								<label for="">Content <span class="text-danger">*</span></label>
									<div id="standalone-container">
									  <div id="toolbar-container">
									    <span class="ql-formats">
									      <select class="ql-font"></select>
									      <select class="ql-size"></select>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-bold"></button>
									      <button class="ql-italic"></button>
									      <button class="ql-underline"></button>
									      <button class="ql-strike"></button>
									    </span>
									    <span class="ql-formats">
									      <select class="ql-color"></select>
									      <select class="ql-background"></select>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-script" value="sub"></button>
									      <button class="ql-script" value="super"></button>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-header" value="1"></button>
									      <button class="ql-header" value="2"></button>
									      <button class="ql-blockquote"></button>
									      <button class="ql-code-block"></button>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-list" value="ordered"></button>
									      <button class="ql-list" value="bullet"></button>
									      <button class="ql-indent" value="-1"></button>
									      <button class="ql-indent" value="+1"></button>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-direction" value="rtl"></button>
									      <select class="ql-align"></select>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-link"></button>
									      <button class="ql-image"></button>
									      <button class="ql-video"></button>
									      <button class="ql-formula"></button>
									    </span>
									    <span class="ql-formats">
									      <button class="ql-clean"></button>
									    </span>
									  </div>
									  <div id="editor-container"></div>
									</div>
									<br>

								<label for="">Middle Image 1 <span style="font-size:14px">(Image Resolution 680 * 385)</span></label>
								<input name="content_image_1" type="file" class="username" />
								<br>

								<label for="">Content 2 <span class="text-danger">*</span></label>
								<textarea name="content2" class="username" id="" cols="30" rows="10"></textarea>
								<br>

					    <label for="" class="w-100">Show Download Button <span class="text-danger">*</span></label>
					    <select name="show_download_btn" id="show_download_btn" required>
					    	<option value="0">No</option>
					    	<option value="1">Yes</option>
					    </select><br>

					    <label for="" class="w-100">Post Types <span class="text-danger">*</span></label>
					    <select name="post_type" class="form-control" required>
					    	<option value="">--Select--</option>
					    	<?php  
					    		foreach ($types as $key => $value) {
					    	?>
					    		<option value="<?php echo $value->id; ?>"><?php echo $value->type; ?></option>
					    	<?php
					    		}
					    	?>
					    </select><br>

					    <div class="link hide" id="download_link">
					    	<label for="" class="w-100">Download link <span class="text-danger">*</span></label>
					    	<input name="download_link" type="text" class="username"   />
					    </div>
					    <div class="">
					    	<label for="" class="w-100">Category <span class="text-danger">*</span></label>
					    	<select name="category_id" id="" required>
					    		<option value="">Select</option>
					    		<?php  
					    			foreach ($categories as $key => $value) {
					    		?>
					    			<option value="<?php echo $value->category_id; ?>"><?php echo $value->category_name; ?></option>
					    		<?php
					    			}
					    		?>
					    	</select>
					    </div>

					    <div class="">
					    	<label for="" class="w-100">Tags <span class="text-danger">*</span></label>
					    	<select name="tags[]" id="" multiple required>
					    		<?php  
					    			foreach ($tags as $key => $tag) {
					    		?>
					    			<option value="<?php echo $tag->tag_id; ?>"><?php echo $tag->tag_name; ?></option>
					    		<?php
					    			}
					    		?>
					    	</select>
					    </div>

					    <label for="">Code <span style="font-size:14px"></span></label>
						<input name="code" type="file" class="username"/>

						<textarea name="content" style="display:none" id="content" class="form-control"></textarea>
							
			         	<button type="submit" class="btn submit-button">Submit</button>
			      	</form>
				</div>
			</div>
		</div>
	</div>
	<!-- Main section -->			
			</div>
			</div>
		</div>
	</section>





    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>

	<script src="<?php echo base_url(); ?>assets/js/quill.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script>

		$('#show_download_btn').change(function() {

			if($(this).val() == '0') {
				$('#download_link').removeClass('show').addClass('hide');
			} else {
				$('#download_link').addClass('show').removeClass('hide');
			}
		});

	  var quill = new Quill('#editor-container', {
	    modules: {
	      formula: true,
	      syntax: true,
	      toolbar: '#toolbar-container'
	    },
	    placeholder: 'Compose an epic...',
	    theme: 'snow'
	  });
	  

	  $('#blog-form').submit(function(e) {
	  	e.preventDefault();
			// one 
    	var html = quill.root.innerHTML;
    	$('#content').val(html);

    	e.currentTarget.submit();
	  	return;
	  });

	</script>

</body>
</html>

	

