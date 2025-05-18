const jobs = ["Transport", "Smuggling", "Mining", "Rescue", "Exploration", "Research"]; // Add more job types
const risks = ["Alliance", "Pirates", "Radiation", "Meteorites", "Bandits", "Storms"]; // Add more risk types

export const generatePlanets = (count) => {
    let previousJobs = [];
    const planets = [];

    for (let i = 0; i < count; i++) {
        const planet = generatePlanet(previousJobs);
        planets.push(planet);
        previousJobs = planet.jobs; // Update previous jobs
    }

    return planets;
}

const generatePlanetName = () => {
    const prefixes = ["Zar", "Kra", "Vul", "Nex", "Tyr", "Sol"];
    const suffixes = ["on", "ar", "is", "ia", "os", "um"];

    const prefix = prefixes[Math.floor(Math.random() * prefixes.length)];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];

    return prefix + suffix;
}

const generatePlanet = (previousJobs) => {
    let selectedJobs = [];
    while (selectedJobs.length < 3) {
        const job = jobs[Math.floor(Math.random() * jobs.length)];
        if (!selectedJobs.includes(job) && (selectedJobs.length < 2 || !previousJobs.includes(job))) {
            selectedJobs.push(job);
        }
    }

    return {
        name: generatePlanetName(),
        jobs: selectedJobs,
        risk: `${risks[Math.floor(Math.random() * risks.length)]} (${Math.floor(Math.random() * 50) + 10}%)`,
        fuelCost: Math.floor(Math.random() * 3) + 1,
    };
}
