	<title>Blogs</title>
	<?php $this->load->view('includes/header'); ?>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/5.0.1/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/1.11.4/css/dataTables.bootstrap5.min.css">
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

		<div class="card" style="padding:20px 20px">
			<div class="banner">
				<div class="row">
					<div class="col-lg-8">
						<h2>Blog Posts</h2>	
					</div>
					<div class="col-lg-4">
						<button id="add" class="action_button">
							ADD POST
						</button>
					</div>
				</div>
			</div>
		</div>
		<div class="" style="padding:25px;margin-top:30px;" >
			<table id="example" class="" style="width:100%">
				<thead>
					<tr>
						<th>Sr No</th>
						<th>Blog title</th>
						<th>Type</th>
						<th>Views</th>
						<th>Downloads</th>
						<th>Date</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<?php  
						if(count($posts) > 0) {
							$count=1;
							foreach ($posts as $key => $value) {
					?>
							<tr>
								<td><?php echo $count; ?></td>
								<td><?php echo $value->title; ?></td>
								<td><?php echo $value->type ? ucfirst($value->type) : '---'; ?></td>
								<td><?php echo $value->views; ?> </td>
								<td><?php echo $value->downloads; ?> Persons</td>
								<td><?php echo $value->date_created; ?></td>
								<td>
									<a href="<?php echo base_url('Blogs/edit') ?>/<?php echo $value->blog_id; ?>" title="Edit" >
										<i class='bx bx-pencil'></i>
									</a>
									<a href="#" title="Remove" onclick="remove(<?php echo $value->blog_id; ?>)">
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
								<td class="text-center" colspan="7">Not available..</td>
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
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script>
		$('#add').click(function() {
           window.location.assign('<?php echo base_url('Blogs/Add'); ?>');
		});

		function remove(id) {
			Swal.fire({
			  title: 'Are you sure?',
			  text: "You won't be able to delete this!",
			  icon: 'warning',
			  showCancelButton: true,
			  confirmButtonColor: '#3085d6',
			  cancelButtonColor: '#d33',
			  confirmButtonText: 'Yes, delete it!'
			}).then((result) => {
			  if (result.isConfirmed) {
			  	$.ajax({
			  		url:'<?php echo base_url('Blogs/delete_post') ?>',
			  		method:'POST',
			  		data: { blog_id: id },
			  		success:function(res) {
			  			if(res) {
			  				Swal.fire(
						      'Deleted!',
						      'Your file has been deleted.',
						      'success'
						    ).then(()=> {
						    	window.location.reload();
						    })
			  			}
			  		}
			  	})
			    
			  }
			})
		}

		
	</script>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<script src="https://cdn.datatables.net/1.11.4/js/jquery.dataTables.min.js"></script>
	<script src="https://cdn.datatables.net/1.11.4/js/dataTables.bootstrap5.min.js"></script>
	<script>
		// DATATABLE
	  	$(document).ready(function() {
			$('#example').DataTable();
		});
	</script>