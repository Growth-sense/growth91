	<title>Users</title>
	<?php $this->load->view('includes/header'); ?>
	<!-- Main section -->
	<div class="right_container">

		<div class="card" style="padding:20px 20px">
			<div class="banner">
				<div class="row">
					<div class="col-lg-8">
						<h2>Users</h2>	
					</div>
					<div class="col-lg-4">
						<!-- <button id="add" class="action_button"><i class='bx bx-plus'></i> Add Category</button> -->
					</div>
				</div>
			</div>

			<table class="list" data-sorting="true" style="margin-top: 17px;">
				<thead>
					<tr>
						<th>Sr No</th>
						<th>Name</th>
						<th>Email</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<?php  
						if(count($users) > 0) {
							$count=1;
							foreach ($users as $key => $value) {
					?>
							<tr>
								<td><?php echo $count; ?></td>
								<td><?php echo $value->name; ?></td>
								<td><?php echo $value->email; ?></td>
								<td>
									<a href="#" title="Edit">
										<i class='bx bx-pencil'></i>
									</a>
									<a href="#" title="Remove">
										<i class='bx bx-trash-alt'></i>
									</a>
								</td>
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
					