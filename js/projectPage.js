// Author............ : Nathan Sikkema
// Student Number.... : 000911571
// Program........... : Software Development
// Course............ : Software Development Tools
// Type.............. : JavaScript
// Start Date........ : 2025 Feb 28
// End Date.......... : 2025 Feb 29
// Duration.......... : 2 Days
// Last Modified..... : 2025 Feb 29

// I, Nathan Sikkema 000911571, certify that this work is my own work and that I did not consult external
// resources without due acknowledgement.

// I further certify that I did not provide my solution to any other students, nor will I provide it to future
// students taking this course at a later date.


document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project')?.replaceAll("_", " ");

    if (!projectName) {
        console.error("No project name found in URL.");
        return;
    }

    try {
        const response = await fetch('./projects.json');
        if (!response.ok) throw new Error("Failed to load project data.");
        const projectsData = await response.json();
        const project = projectsData.find(p => p["Project_Name"] === projectName);
        if (!project) {
            console.error("Project not found in JSON.");
            return;
        }
        document.getElementById('project-name').textContent = `Project: ${project["Project_Name"]}`;
        document.getElementById('date-completed').textContent = `Completed: ${project["Date_Completed"]}`;
        document.getElementById('git-link').innerHTML = `&nbsp; • <a href="${project["Git_Link"]}" target="_blank">Click Me!!</a>`;
        document.getElementById('primary-language').textContent = project["Language"];
        document.getElementById('description').textContent = project["Description"];

        const secondaryLanguageContainer = document.getElementById('secondary-language-container');
        if (!project["Secondary_Language"] || project["Secondary_Language"].trim() === "N/A") {
            secondaryLanguageContainer.style.display = 'none';
        } else {
            document.getElementById('secondary-language').textContent = project["Secondary_Language"];
        }

        const featuresList = document.getElementById('special-features');
        featuresList.innerHTML = "";
        project["Special_Features"].forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        const gallery = document.getElementById('gallery');

        gallery.innerHTML = "";
        project["Snap_Shots"].forEach(([imgSrc, imgAlt]) => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4', 'gallery-item');

            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = imgAlt || "Unnamed";
            imgElement.classList.add('img-fluid', 'rounded', 'gallery-image');

            const titleElement = document.createElement('h2');
            titleElement.textContent = imgAlt || "Unnamed";
            titleElement.classList.add('image-title');

            colDiv.appendChild(imgElement);
            colDiv.appendChild(titleElement);
            
            gallery.appendChild(colDiv);
        });

        

    } catch (error) {
        console.error("Error loading project data:", error);
    }
});
