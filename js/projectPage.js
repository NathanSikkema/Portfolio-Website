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
        // document.getElementById('secondary-language').textContent = project["Secondary_Language"] || "N/A";
        document.getElementById('description').textContent = project["Description"];

        // Hide Secondary Language container if not available
        const secondaryLanguageContainer = document.getElementById('secondary-language-container');
        if (!project["Secondary_Language"] || project["Secondary_Language"].trim() === "N/A") {
            secondaryLanguageContainer.style.display = 'none'; // Hide container
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
