- Supports filtering by all reports, high priority, pending, or repaired, as well as searching by ward or landmark.
- Allows the report status to be updated and saved.
- Shows repair progress based on the complaint data.

### Insights

- Summarizes reports by priority, outage type, nearby location, and ward using JavaScript-generated bar charts.

### Helpline

- Provides direct call links for the municipal electrical helpline and dispatcher extensions.
- Lists ward-level electrical office contact information.

### Shared interface

- Responsive layout with a shared visual style across pages.
- Light and dark themes; the selected theme is remembered in the browser.
- Mobile navigation menu.

## Technology

- HTML5
- CSS3 (responsive layout and themes)
- Vanilla JavaScript
- Browser `localStorage` for complaint records and saved interface preferences

No server or database is required for the frontend demo. Data saved in `localStorage` is local to the browser and device used to run the site.

## Run the project

1. Download or clone the project folder.
2. Open the folder in Visual Studio Code or another editor.
3. Open `index.html` in a browser. For a smoother development workflow, use the VS Code Live Server extension and choose **Open with Live Server**.
4. Navigate using the site menu. Submit a sample report, then view it on the Home, Repair Status, and Insights pages.

The project is static and does not need `npm install`, a build step, or a backend server.

## Expected project structure

```text
streetlight-project/
├── index.html
├── report.html
├── dashboard.html
├── insights.html
├── helpline.html
├── css/
│   └── style.css
├── js/
│   ├── data.js
│   ├── home.js
│   ├── report.js
│   ├── dashboard.js
│   └── insights.js
└── assets/
```

Page-specific JavaScript filenames may vary. Each page should include the shared data and style files used by the project.

## Data and limitations

- Complaint records are stored in browser `localStorage`, so they persist across refreshes in the same browser but are not shared across devices or users.
- The initial dashboard can use sample complaints for demonstration; newly submitted complaints are stored locally.
- The report form accepts a photo selection as a frontend input, but the image is not uploaded or stored. Photo storage requires a backend or file storage service.
- Call links use the device's `tel:` handler. Whether a call can be placed depends on the device and its available calling app.
- Ward office contacts, helpline numbers, and dispatcher extensions should be confirmed with the relevant municipal authority before real-world use.

## Suggested demonstration

1. Open Home and note the report counts and any pending high-priority alert.
2. Submit a report for a **Completely Dark** light near a **School**, **Bus Stop**, or **Dark Alleyway** and show the **High** priority result.
3. Open Repair Status and locate the new complaint.
4. Change its status and show the updated dashboard and Home counts.
5. Open Insights and Helpline to show the summaries and call links.

## Team

Developed as a student team project. Team members: Aman Pandey, Koushal Jha, Sawan. Course: B.Teach (CSE) and Institution Lovely Professional University.