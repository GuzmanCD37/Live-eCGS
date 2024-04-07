document.addEventListener("DOMContentLoaded", function() {
    // Check if accountType is stored in localStorage
    if(localStorage.getItem("accountType")) {
        var accountType = localStorage.getItem("accountType");

        // Show div based on accountType
        if (accountType === 'teacher') {
            var adminLiElements = document.querySelectorAll('.admin-li');
            adminLiElements.forEach(function(li) {
                li.style.display = 'none';
            });
        } else if (accountType === 'admin') {
            
        } else if (accountType === 'superadmin') {
          var superadminLi = document.querySelector('.superadmin');
          superadminLi.classList.remove('hidden');
        }
    }
});

    function logoutUser() {
        // Clear specific items from localStorage
        localStorage.removeItem('accountType');
        localStorage.removeItem('teacher_name');
        localStorage.removeItem('teacher_id');
        localStorage.removeItem('adminId');
        
        // Redirect the user to a login page or a page confirming they've logged out
        window.location.href = '/Teacher/index.html'; // Redirect to the login page
    }
    document.addEventListener("DOMContentLoaded", function() {
        // Get the logout link element
        var logoutLink = document.getElementById("logoutLink");

        // Add click event listener to the logout link
        logoutLink.addEventListener("click", function(event) {
            // Prevent default link behavior (i.e., navigating to "#")
            event.preventDefault();

            // Call the logout function
            logoutUser();
        });
    });

