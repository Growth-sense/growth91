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
		.show { display: block; }
		.hide { display: none; }
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
			      	<form class="signup" id="blog-form" method="POST" action="<?php echo base_url('Blogs/update_post'); ?>"
			      		enctype="multipart/form-data">
			      		<br><br><br><br>
			         	<h2 class="signup1">UPDATE POST</h2>
			         	<br>
			         	<label for="">Title <span class="text-danger" style="font-size:16px">*</span></label>
								 <input name="title" type="text" placeholder="Title*" class="username" value="<?php echo $post[0]->title; ?>" required/>
								 <div class="">
										<label for="" class="w-100">Short Description <span class="text-danger">*</span></label>
										<textarea name="short_description" required class="username"  cols="30" rows="10"><?php echo $post[0]->short_description; ?></textarea>
								</div>

								<div class="">
									<label for="" class="w-100">Youtube Link <span class="text-danger">*</span></label>
									<input type="text" name="youtube_link" class="username"
									value="<?php echo $post[0]->youtube_link; ?>">
								</div>

								<label for="" class="w-100">Featured Image <span class="text-danger">*</span><span style="font-size:14px">(Image Resolution 680 * 385)</span></label>
								<?php if(!empty($post[0]->featured_img)) { ?>
								<img src="<?php echo base_url(); ?>uploads/blog/<?php echo $post[0]->blog_id ?>/<?php echo $post[0]->featured_img; ?>" alt="" class="mb-3" style="max-width: 250px;">
								<?php } ?>
								<input name="featured_img" type="file" class="username" />


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
									  <div id="editor-container">
											<?php 
												echo $post[0]->content;
											?>
										</div>
									</div>
								 <br>
									
								 <?php if(!empty($post[0]->content_image_1)) { ?>
								<img src="<?php echo base_url(); ?>uploads/blog/<?php echo $post[0]->blog_id ?>/<?php echo $post[0]->content_image_1; ?>" alt="" class="mb-3" style="max-width: 250px;"><br>
								<?php } ?>

								 <label for="">Middle Image 1 <span style="font-size:14px">(Image Resolution 680 * 385)</span></label>
								<input name="content_image_1" type="file" class="username" />
								<br>

								 <label for="">Content 2 <span class="text-danger">*</span></label>
								<textarea name="content2" class="username" id="" cols="30" rows="10"><?php  echo $post[0]->content2; ?></textarea>
									<br>

									 <label for="" class="w-100">Post Types <span class="text-danger">*</span></label>
							    <select name="post_type" class="form-control" required>
							    	<option value="">--Select--</option>
							    	<?php  
							    		foreach ($types as $key => $value) {
							    			$selected='';
							    			if ($post[0]->post_type == $value->id) {
							    				$selected='selected';
							    			}
							    	?>
							    		<option value="<?php echo $value->id; ?>"
							    			<?php echo $selected; ?>
							    			><?php echo $value->type; ?></option>
							    	<?php
							    		}
							    	?>
							    </select><br>
								

								<label for="" class="w-100">Show Download Button <span class="text-danger">*</span></label>
								<select name="show_download_btn" id="show_download_btn" required>
									<option value="0"
									<?php echo ($post[0]->show_download_btn == '0'|| post[0]->show_download_btn == '') ? 'selected': ''; ?>
									>No</option>
									<option value="1" 	<?php echo ($post[0]->show_download_btn == '1') ? 'selected': ''; ?>>Yes</option>
								</select><br>

								<?php  
									$class="";
									$value="";
									if($post[0]->show_download_btn == '1') {
										$class="show";
										$value=$post[0]->download_link;
									} else {
										$class="hide";
										$value="";
									}
								?>
								<div class="link <?php echo $class; ?>">
									<label for="" class="w-100">Download link <span class="text-danger">*</span></label>
									<input name="download_link" type="text" value="<?php echo $value; ?>" class="username" value="<?php echo $post[0]->download_link; ?>" />
								</div>
							
								<div class="">
									<label for="" class="w-100">Category <span class="text-danger">*</span></label>
									<select name="category_id" id="" required>
										<option value="">Select</option>
										<?php  
											foreach ($categories as $key => $value) {
												$selected = '';
												if($post[0]->category_id == $value->category_id) {
													$selected = 'selected';
												}
										?>
											<option value="<?php echo $value->category_id; ?>" <?php echo $selected; ?>><?php echo $value->category_name; ?></option>
										<?php
											}
										?>
									</select>
								</div>
								<?php  $tags_from_post_table = json_decode($post[0]->tags); ?>
								<div class="">
									<label for="" class="w-100">Tags <span class="text-danger">*</span></label>
									<select name="tags[]" id="" multiple required>
										<?php  
											foreach ($tags as $key => $tag) {
												$selected='';
												if(in_array($tag->tag_id, $tags_from_post_table)) {
													$selected='selected';
												}
										?>
											<option value="<?php echo $tag->tag_id; ?>" <?php echo $selected; ?>><?php echo $tag->tag_name; ?></option>
										<?php
											}
										?>
									</select>
								</div>

								<label for="">Code <span style="font-size:14px"></span></label>
								<input name="code" type="file" class="username"/>

								<input type="hidden" name="blog_id" 
								value="<?php echo $post[0]->blog_id; ?>">

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





	<script>
	    $('#show_download_btn').change(function() {
	    	if($(this).val() == '0') {
	    		$('.link').removeClass('show');
	    		$('.link').addClass('hide');
	    	} else {
	    		$('.link').addClass('show');
	    		$('.link').removeClass('hide');
	    	}
	    });
    </script>

    <script src="https://cdnjs.cloudflare.com/ajax/libs/KaTeX/0.7.1/katex.min.js"></script>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/highlight.js/9.12.0/highlight.min.js"></script>

	<script src="<?php echo base_url(); ?>assets/js/quill.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
	<script>
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
    	var html = quill.root.innerHTML;
    	$('#content').val(html);
			console.log('html',html);
			// return;
			setTimeout(() => {
				e.currentTarget.submit();
			}, 200);
    	
	  	return;
	  });

	</script>

</body>
</html>