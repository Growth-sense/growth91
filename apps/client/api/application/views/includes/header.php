<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/style.css">
	<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
	<link rel="icon" href="<?php echo base_url(); ?>assets/img/logo2.png" sizes="32x32" />
</head>
<body>
	
	<section class="__main_section">
		<div class="container-fluid">
			<div class="row">
				<div class="col-lg-2 pl-0">
					<div class="sidebar">
						<h1 class="logo pl-3">
							<a href="<?php echo base_url('Dashboard'); ?>">
								<img src="<?php echo base_url(); ?>assets/img/logo2.png" alt="">
							</a>
						</h1>
						<ul style="padding-left: 0px !important;">
							<li class="<?php  echo ($page == "Dashboard") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Dashboard'); ?>"><i class='bx bx-category-alt'></i> Dashboard</a>
							</li>
							<li class="<?php  echo ($page == "BulkUpload") ? "active" : ""; ?>">
								<a href="<?php echo base_url('BulkUpload'); ?>"><i class='bx bx-category-alt'></i> Bulk Upload</a>
							</li>
							<li class="<?php  echo ($page == "Blogs") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Blogs'); ?>"><i class='bx bx-category-alt'></i> Blog Posts</a>
							</li>
							<li class="<?php  echo ($page == "Types") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Types'); ?>"><i class='bx bx-category-alt'></i> Types</a>
							</li>
							<li class="<?php  echo ($page == "Users") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Users'); ?>"><i class='bx bx-category-alt'></i> Users</a>
							</li>
							<li class="<?php  echo ($page == "Category") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Category'); ?>"><i class='bx bx-category-alt'></i> Category</a>
							</li>
							<li class="<?php  echo ($page == "Tags") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Tags'); ?>"><i class='bx bx-category-alt'></i> Tags</a>
							</li>
							<li class="<?php  echo ($page == "Subscriptions") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Subscriptions'); ?>"><i class='bx bx-category-alt'></i> Subscriptions</a>
							</li>
							<li class="<?php  echo ($page == "Contacts") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Contacts'); ?>"><i class='bx bx-category-alt'></i> Contacts</a>
							</li>

							<li class="<?php  echo ($page == "Logout") ? "active" : ""; ?>">
								<a href="<?php echo base_url('Auth/logout'); ?>"><i class='bx bx-category-alt'></i> Logout</a>
							</li>
						</ul>

					</div>
				</div>
				<div class="col-lg-10">