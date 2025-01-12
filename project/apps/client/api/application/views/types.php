	<title>Blog Types</title>
	<?php $this->load->view('includes/header'); ?>
	<!-- Main section -->
	<div class="right_container">
		<?php  
			if(!empty($this->session->userdata('msg'))) {
		?>
			<div class="alert_block <?php echo $this->session->userdata('class'); ?>" style="margin:0;"> 
				<p class="msg"><?php echo $this->session->userdata('msg'); ?> </p>
			</div>
		<?php
				$this->session->unset_userdata('msg');
				$this->session->unset_userdata('class');
			}
		?>
		<?php 
			if(!empty($this->session->userdata('msg'))) {
		?>
				<div class="alert alert-<?php echo $this->session->userdata('class'); ?> alert-dismissible fade show" role="alert">
				  <?php echo $this->session->userdata('msg'); ?>
				  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
				    <span aria-hidden="true">×</span>
				  </button>
				</div>
		<?php
				$this->session->unset_userdata('msg');
				$this->session->unset_userdata('class');
			} 
		?> 
		
		<div class="card" style="padding:20px 20px">
			<div class="banner">
				<div class="row">
					<div class="col-lg-8">
						<h2>Blog Types</h2>	
					</div>
				</div>
			</div>

			<table class="list" data-sorting="true" style="margin-top: 17px;">
				<thead>
					<tr>
						<th>Sr No</th>
						<th>Type</th>
					</tr>
				</thead>
				<tbody>
					<?php  
						if(count($types) > 0) {
							$count=1;
							foreach ($types as $key => $type) {
					?>
							<tr>
								<td><?php echo $count; ?></td>
								<td><?php echo $type->type; ?></td>
							</tr>
					<?php
							$count++;
							}
						} else {
					?>
							<tr>
								<td class="text-center" colspan="4">Not available..</td>
							</tr>
					<?php		
						}
					?>
					
				</tbody>
			</table>
		</div>
	</div>
	<!-- Main section -->	

	<?php $this->load->view('includes/footer'); ?>