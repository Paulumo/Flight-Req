// document.getElementById('requestForm').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     // validate date and time
//     const dateInput = document.getElementById('date').value;
//     const timeInput = document.getElementById('time').value;

//     const selectedDateTime = new Date(`${dateInput}T${timeInput}`);
//     const now = new Date();

//     if (selectedDateTime <= now) {
//         alert("Please select a date and time in the future.");
//         return;
//     }
    
//     // send request
//     const formData = new FormData(e.target);
//     const formProps = Object.fromEntries(formData);

//     try {
//         const response = await fetch('/submit-request', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify(formProps),
//         });

//         if (response.ok) {
//             alert('Request submitted successfully!');
//             e.target.reset();
//         } else {
//             alert('Failed to submit request. Please try again.');
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         alert('An error occurred. Please try again later.');
//     }
// });

document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // validate date and time
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;

    const selectedDateTime = new Date(`${dateInput}T${timeInput}`);
    const now = new Date();

    if (selectedDateTime <= now) {
        Swal.fire({
            title: 'Invalid Date/Time',
            text: 'Please select a date and time in the future.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
        return;
    }
    
    // send request
    const formData = new FormData(e.target);
    const formProps = Object.fromEntries(formData);

    try {
        const response = await fetch('/submit-request', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formProps),
        });

        if (response.ok) {
            Swal.fire({
                title: 'Success!',
                text: 'Request submitted successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
            e.target.reset();
        } else {
            Swal.fire({
                title: 'Error!',
                text: 'Failed to submit request. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    } catch (error) {
        console.error('Error:', error);
        Swal.fire({
            title: 'Error!',
            text: 'An error occurred. Please try again later.',
            icon: 'error',
            confirmButtonText: 'OK'
        });
    }
});

