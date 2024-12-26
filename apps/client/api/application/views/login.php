<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<title>Login</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
	<link rel="stylesheet" href="<?php echo base_url(); ?>assets/css/style.css">
	<link href='https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css' rel='stylesheet'>
	<link rel="icon" href="<?php echo base_url(); ?>assets/img/fevicon.png" sizes="32x32" />
</head>
<body>
	
	
	<section class="login_sec">
		<div class="container">
			<div class="row">
				<div class="col-lg-6 m-auto">
					<div class="login_block">
						<?php  
							if(!empty($this->session->userdata('msg'))) {
						?>
							<div class="alert_block <?php echo $this->session->userdata('class'); ?>">
								<p class="msg"><?php echo $this->session->userdata('msg'); ?> </p>
							</div>
						<?php
								$this->session->unset_userdata('msg');
								$this->session->unset_userdata('class');
							}
						?>
						<div class="main-logo">
							<center>
								<img src="<?php echo base_url(); ?>assets/img/logo2.png" style="width:162px;" alt="">
							</center>
							<br>
						</div>
						<form action="<?php echo base_url('Auth/checkForLogin'); ?>" method="POST">
							<input type="text" name="username" placeholder="Username" required="">
							<input type="password" name="password" placeholder="Password" required=""> <br>
							<button type="submit">Login</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</section>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
	<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
</body>
</html>