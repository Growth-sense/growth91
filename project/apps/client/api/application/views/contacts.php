	<title>Contacts</title>
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
						<h2>Contacts </h2>	
					</div>
				</div>
			</div>

			<table class="list" data-sorting="true" style="margin-top: 17px;">
				<thead>
					<tr>
						<th>Sr No</th>
						<th>Name</th>
						<th>Email</th>
						<th>Subject</th>
						<th>Message</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<?php  
						if(count($contacts) > 0) {
							$count=1;
							foreach ($contacts as $key => $value) {
					?>
							<tr>
								<td><?php echo $count; ?></td>
								<td><?php echo $value->name; ?></td>
								<td><?php echo $value->email; ?></td>
								<td><?php echo $value->subject; ?></td>
								<td><?php echo $value->message; ?></td>
							</tr>
					<?php
							$count++;
							}
						} else {
					?>
							<tr>
								<td class="text-center" colspan="6">Not available..</td>
							</tr>
					<?php		
						}
					?>
				</tbody>
			</table>
		</div>
	</div>
	<!-- Main section -->			

	<!-- Modal -->
	<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content" style="border-radius: 0px;">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalCenterTitle">Add Category</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <form method="post" action="<?php echo base_url('Category/add') ?>">
		      <div class="modal-body">
				  <div class="form-group">
				    <label for="exampleInputPassword1">Category Name</label>
				    <input type="text" class="form-control" id="exampleInputPassword1" name="category_name" required>
				  </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" style="border-radius:0" data-dismiss="modal">Close</button>
		        <button type="submit" class="btn btn-primary"  style="border-radius:0" >Save changes</button>
		      </div>
	      </form>
	    </div>
	  </div>
	</div>

	<!-- Edit Modal -->
	<div class="modal fade" id="exampleModalCenter2" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
	  <div class="modal-dialog modal-dialog-centered" role="document">
	    <div class="modal-content" style="border-radius: 0px;">
	      <div class="modal-header">
	        <h5 class="modal-title" id="exampleModalCenterTitle">Edit Category</h5>
	        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
	          <span aria-hidden="true">&times;</span>
	        </button>
	      </div>
	      <form method="post" action="<?php echo base_url('Category/update') ?>">
	      	<input type="hidden" name="category_id" id="category_id">
		      <div class="modal-body">
				  <div class="form-group">
				    <label for="exampleInputPassword1">Category Name</label>
				    <input type="text" class="form-control" id="category_name" name="category_name" required>
				  </div>
		      </div>
		      <div class="modal-footer">
		        <button type="button" class="btn btn-secondary" style="border-radius:0" data-dismiss="modal">Close</button>
		        <button type="submit" class="btn btn-primary"  style="border-radius:0" >Save changes</button>
		      </div>
	      </form>
	    </div>
	  </div>
	</div>

	<?php $this->load->view('includes/footer'); ?>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script>

		function openModel(category_id,category_name) {
			$('#category_id').val(category_id);
			$('#category_name').val(category_name);
		}
		
		function remove(category_id) {
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
			  		url:'<?php echo base_url('Category/delete') ?>',
			  		method:'POST',
			  		data: { category_id: category_id },
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