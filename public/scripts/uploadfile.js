document.addEventListener('DOMContentLoaded', () => {
    const dropzoneInput = document.getElementById('dropzone-file');
    const dropzoneLabel = document.querySelector('.dropzone');
    const uploadForm = document.getElementById('uploadForm');
    const fileList = document.getElementById('fileList');

    dropzoneLabel.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropzoneLabel.classList.add('dropzone-hover');
    });

    dropzoneLabel.addEventListener('dragleave', () => {
        dropzoneLabel.classList.remove('dropzone-hover');
    });

    dropzoneLabel.addEventListener('drop', (e) => {
        e.preventDefault();
        dropzoneLabel.classList.remove('dropzone-hover');
        const files = e.dataTransfer.files;
        if (files.length) {
            dropzoneInput.files = files;
            console.log('Files dropped:', files);
        }
    });

    uploadForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (!dropzoneInput.files.length) {
            alert('Please select a file to upload.');
            return;
        }

        const formData = new FormData();
        formData.append('file', dropzoneInput.files[0]);

        try {
            const response = await fetch('/main/uploaddocs', {
                method: 'POST',
                body: formData,
            });
            

            const data = await response.json();

            if (response.ok) {
                alert('File uploaded successfully');
                addFileToList(data.file.url);
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Error uploading file.');
        }
    });

    function addFileToList(url) {
        const img = document.createElement('img');
        img.src = url;
        img.alt = 'Uploaded File';
        img.style.width = '200px';
        img.style.margin = '10px';
        fileList.appendChild(img);
    }
});

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/main/files', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch files');
        }

        const data = await response.json();

        const gallery = document.getElementById('file-gallery');

        // Append images to the gallery
        data.files.forEach((file) => {
            const img = document.createElement('img');
            img.src = file.url;
            img.alt = 'Uploaded File';
            img.className = 'file-img'; // Optional class for consistent styling
            gallery.appendChild(img);
        });
    } catch (error) {
        console.error('Error loading files:', error);
    }
});



