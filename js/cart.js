$(document).ready(function() {
    // Show the modal when the upload button is clicked
    $("#uploadButton").click(function() {
        $("#uploadModal").modal('show');
    });

    // Handle the form submission
    $("#documentUploadForm").submit(function(event) {
        event.preventDefault();
        // Handle form submission here
        alert("Documents uploaded successfully!");
        $("#uploadModal").modal('hide');
    });

    // Ensure that the modal closes correctly when the close button is clicked
    $('#uploadModal').on('hidden.bs.modal', function () {
        console.log('Modal has been hidden');
    });
});