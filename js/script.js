// Author............ : Nathan Sikkema
// Student Number.... : 000911571
// Program........... : Software Development
// Course............ : Software Development Tools
// Type.............. : JS
// Start Date........ : 2025 Feb 28
// End Date.......... : 
// Duration.......... : 
// Last Modified..... : 
// Validation Date... : 

// Toggle Sidebar in Mobile View (Bootstrap handles the collapse for navbar items)
document.querySelector('.navbar-toggler').addEventListener('click', function() {
    const navbarNav = document.getElementById('navbarNav');
    navbarNav.classList.toggle('collapse');
});
async function loadJSON() {
    try {
        const response = await fetch('./projects.json');
        if (!response.ok) {
            console.error('Error loading JSON:', response.statusText);
            return [];
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching JSON:', error);
        return [];
    }
}

function createprojectElement(title, images, date) {
    const projectElement = document.createElement('div');
    projectElement.classList.add('portfolio-item');;

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('image-container');
    imageContainer.style.display = 'flex';
    imageContainer.style.justifyContent = 'center';
    imageContainer.style.backgroundColor = 'black';
    projectElement.appendChild(imageContainer);

    const coverImage = document.createElement('img');
    console.log(images);
    coverImage.src = images[0].url;

    coverImage.alt = images[0][1];
    coverImage.classList.add('cover-image');

    coverImage.style.width = '300px';
    coverImage.style.height = 'auto';

    imageContainer.appendChild(coverImage);

    
    const titleAndDate = document.createElement('div');
    titleAndDate.classList.add('title-price');
    titleAndDate.innerHTML = `<strong>${title}</strong> - <span>${date}</span>`;
    imageContainer.appendChild(titleAndDate);

    if (images.length > 1) {
        const overlay = document.createElement('div');
        overlay.classList.add('image-overlay');
        overlay.style.opacity = '0.6';
        overlay.innerHTML = `+${images.length - 1}`;
        imageContainer.appendChild(overlay);
        coverImage.style.cursor = 'pointer';
        titleAndDate.style.cursor = 'pointer';


        imageContainer.addEventListener('mouseover', () => {
            overlay.style.opacity = '0.9';
        });

        imageContainer.addEventListener('mouseout', () => {
            overlay.style.opacity = '0.6';
        });
    }
    imageContainer.addEventListener('click', () => {
        // Open a new page with the project details
        const titleFormatted = title.replaceAll(" ", "_");
        window.open(`./projectPage.html?project=${titleFormatted}`, '_blank');
    });
    return projectElement;
}


function processImages(images) {
    return images.map(imageData => {
        let imageUrl, description;

        if (Array.isArray(imageData)) {
            imageUrl = imageData[0];
            description = imageData[1] || getFileNameWithoutExtension(imageUrl);
        } else {
            imageUrl = imageData;
            description = getFileNameWithoutExtension(imageUrl);
        }
        return { url: imageUrl, description: description };
    });
}

function getFileNameWithoutExtension(imageUrl) {
    const fileName = imageUrl.split('/').pop();  
    const nameWithoutExtension = fileName.split('.')[0];  
    return nameWithoutExtension.replace(/_/g, ' ').replace(/\d+$/, '');
}

async function initProjects() {
    const projectsContainer = document.getElementById('projects-container');
    
    const projectsData = await loadJSON();
    projectsData.forEach(project => {
        const projectElement = createprojectElement(project.Project_Name, processImages(project.Snap_Shots), project.Date_Completed);
        projectsContainer.appendChild(projectElement);
    });
}
window.addEventListener('DOMContentLoaded', initProjects);