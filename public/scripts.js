document.getElementById('requestForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    // validate date and time
    const dateInput = document.getElementById('date').value;
    const timeInput = document.getElementById('time').value;

    const selectedDateTime = new Date(`${dateInput}T${timeInput}`);
    const now = new Date();

    if (selectedDateTime <= now) {
        alert("Please select a date and time in the future.");
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
            alert('Request submitted successfully!');
            e.target.reset();
        } else {
            alert('Failed to submit request. Please try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
