
    document.querySelector('form').addEventListener('submit', async (e) => {
        e.preventDefault();

        let formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };

        try {
            const response = await fetch('/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.status == 201) {
                alert('Message sent successfully!');
            } else {
                alert('Error sending message.');
            }
        } catch (err) {
            console.error(err);
            alert('Error sending message.');
        }
    });

