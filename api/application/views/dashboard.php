	<title>Dashboard</title>	
	<?php $this->load->view('includes/header'); ?>
	<!-- Main section -->
	<br><br><br><br>
	<div class="right_container">
		<h4>Hi <?php echo $this->session->userdata('admin')->name; ?></h4><br>
		
		<div class="card" style="padding:20px;">
			<div class="row">
				<div class="col-lg-2">
					<div class="content blue" style="max-height:140px;">
						<h6><?php echo $blog_user_count[0]->blog_user_count; ?></h6>
						<!-- <i class='bx bx-confused'></i> -->
						<p>Blog Users</p>
					</div>
				</div>
				<div class="col-lg-2">
					<div class="content green" style="max-height:140px;">
						<h6><?php echo $user_count[0]->user_count; ?></h6>
						<!-- <i class='bx bx-confused'></i> -->
						<p>Users</p>
					</div>
				</div>
				<div class="col-lg-2">
					<div class="content orange" style="max-height:140px;">
						<h6><?php echo $blog_post_count[0]->blog_post_count; ?></h6>
						<!-- <i class='bx bx-library'></i> -->
						<p>Blog Posts</p>
					</div>
				</div>
			</div>
		</div>

	</div>
	<!-- Main section -->			
	<?php $this->load->view('includes/footer'); ?>