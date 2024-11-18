<title>Blogs</title>
	<?php $this->load->view('includes/header'); ?>
    <style>
        .img {
            max-width: 115px;
            margin: 12px 0;     
        }
    </style>
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
						<h2>Images</h2>	
					</div>
					<div class="col-lg-4">
						<button id="add" class="action_button" data-toggle="modal" data-target="#addModel">
							UPLOAD IMAGE
						</button>
					</div>
				</div>
			</div>

			<table class="list" data-sorting="true" style="margin-top: 17px;">
				<thead>
					<tr>
						<th>Sr No</th>
						<th>Image</th>
						<th>Action</th>
					</tr>
				</thead>
				<tbody>
					<?php  
						if(count($images) > 0) {
							$count=1;
							foreach ($images as $key => $image) {
					?>
							<tr>
								<td><?php echo $count; ?></td>
								<td>
									<img class="img" src="<?php echo base_url().'uploads/posts/'.$image->image; ?>" alt="">
								</td>
								<td>
									<!-- <a href="<?php echo base_url('Blogs/edit') ?>/<?php echo $image->id; ?>" title="Edit">
										<i class='bx bx-pencil'></i>
									</a> -->
									<div class="d-flex">
									<a href="#" title="Copy link">
											<div style="max-width:200px">
												<code>
													<?php echo base_url().'uploads/posts/'.$image->image; ?>
												</code> 
											</div>
										</a>
										<a href="#" 
										title="Remove" onclick="remove(<?php echo $image->id; ?>,'<?php echo $image->image ?>')">
											<i class='bx bx-trash-alt'></i>
										</a> 
									</div>
									
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

    <!-- Modal -->
    <div class="modal fade" id="addModel" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalCenterTitle">Upload Images</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <form action="<?php echo base_url('BulkUpload/upload') ?>" enctype="multipart/form-data"
            method="POST"
            >
                <div class="modal-body">
                    <label for="">Featured Image <span class="text-danger">*</span></label>
                    <input name="images[]" multiple type="file" class="username" required/>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="submit" class="btn btn-primary">Upload</button>
                </div>
            </form>
        </div>
    </div>
    </div>



	<!-- Main section -->			
	<?php $this->load->view('includes/footer'); ?>
	<script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
	<script>
		function remove(id, image_name) {
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
			  		url:'<?php echo base_url('BulkUpload/delete') ?>',
			  		method:'POST',
			  		data: { id:id, filename:image_name  },
			  		success:function(res) {
						console.log('res',res);
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