document.addEventListener("DOMContentLoaded", async () => {
    // Get URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const projectName = urlParams.get('project')?.replaceAll("_", " "); // Convert back to normal text

    if (!projectName) {
        console.error("No project name found in URL.");
        return;
    }

    try {
        // Fetch the JSON file
        const response = await fetch('./projects.json');
        if (!response.ok) throw new Error("Failed to load project data.");

        const projectsData = await response.json();
        
        // Find the project matching the extracted name
        const project = projectsData.find(p => p["Project_Name"] === projectName);

        if (!project) {
            console.error("Project not found in JSON.");
            return;
        }

        // Populate page elements with project data
        document.getElementById('project-name').textContent = `Project: ${project["Project_Name"]}`;
        document.getElementById('date-completed').textContent = `Completed: ${project["Date_Completed"]}`;
        document.getElementById('git-link').innerHTML = `&nbsp; • <a href="${project["Git_Link"]}" target="_blank">Click Me!!</a>`;
        document.getElementById('primary-language').textContent = project["Language"];
        document.getElementById('secondary-language').textContent = project["Secondary_Language"] || "N/A";
        document.getElementById('description').textContent = project["Description"];


        // Populate Special Features List
        const featuresList = document.getElementById('special-features');
        featuresList.innerHTML = ""; // Clear existing items
        project["Special_Features"].forEach(feature => {
            const li = document.createElement('li');
            li.textContent = feature;
            featuresList.appendChild(li);
        });

        // Populate Image Gallery
        const gallery = document.getElementById('gallery');

        gallery.innerHTML = ""; // Clear existing images
        project["Snap_Shots"].forEach(([imgSrc, imgAlt]) => {
            const colDiv = document.createElement('div');
            colDiv.classList.add('col-md-4');
        
            const imgElement = document.createElement('img');
            imgElement.src = imgSrc;
            imgElement.alt = imgAlt || "Unnamed"; // Default if empty
            imgElement.classList.add('img-fluid', 'rounded');
        
            colDiv.appendChild(imgElement);
            gallery.appendChild(colDiv);
        });
        

    } catch (error) {
        console.error("Error loading project data:", error);
    }
});
